<template lang="pug">
div
  el-menu(:mode="fullWidth > 610 ? 'horizontal' : 'vertical'" @select="handleSelect")
    .logo(v-if='fullWidth > 610')
      router-link(to='home')
        img(src='../assets/images/emma-title.svg')
    el-menu-item(index='home') Home
    el-submenu(index='2')
      template(slot='title') Scenarios
      el-menu-item(v-for='scenario in scenarios', :index="scenario.infos.path") {{scenario.infos.navbarTitle}}
    el-menu-item(index='about') About
    li.el-menu-item-x(type="text") Welcome, {{userSettings.username}}
      a(type="text" size="mini" style="color:#20a0ff; marginLeft:20px" @click="tryLogout") Logout
    //- div.el-menu-item-x(type="text" v-else ) Welcome, Visitor
    //-   a(type="text" size="mini" style="color:#20a0ff; marginLeft:20px" @click='showLoginDialog = true') Login

  el-dialog(v-bind:visible.sync='showLoginDialog' size='tiny')
    p
      span username
      el-input(v-model='username')
    p
      span password
      el-input(v-model='password' type='password')
    p(v-if='loginMessage') {{loginMessage}}
    div.center
      el-button(type='primary' @click='tryLogin') submit
</template>

<script>
import scenarios from './scenarios/scenarios.js'
import globalSettings from '../setting.js'
export default {
  data: () => ({
    scenarios: scenarios.list,
    fullWidth: 0,
    userSettings: JSON.parse(window.localStorage.getItem('emmaSettings')),
    showLoginDialog: false,
    username: '',
    password: '',
    loginMessage: '',
  }),

  computed: {
    // isLogin: function () {
    //   return this.userSettings && this.userSettings.token
    // },
    currentToken: function () {
      if (this.username && this.userSettings.token) {
        return this.userSettings.token
      } else {
        return this.userSettings.visitorToken
      }
    }
  },
  methods: {
    handleSelect: function (key, keyPath) {
      this.$router.push(key)
    },
    handleResize: function (event) {
      this.fullWidth = document.documentElement.clientWidth
    },
    tryLogin: function (event) {
      this.$http.post(
        globalSettings.AUTH_URL,
        {},
        {
          headers: {
            Authorization: 'Basic ' + btoa(this.username + ':' + this.password)
          },
          emulateJSON: true,
        },
      ).then((result) => {
        console.log(result)
        if (result.status === 200) {
          if (!this.userSettings) this.userSettings = {}
          this.$set(this.userSettings, 'username', this.username)
          this.userSettings.token = result.body.data.token
          this.userSettings.lastLogin = new Date()
          window.localStorage.setItem('emmaSettings', JSON.stringify(this.userSettings))
          var parentUrl = location.hostname.split('.').slice(1).join('.')
          document.cookie = 'sessionId="' + this.userSettings.token + '"; domain=' + parentUrl
          document.cookie = 'userId="' + this.userSettings.username + '"; domain=' + parentUrl
          this.password = ''
          this.loginMessage = ''
          this.showLoginDialog = false
          console.log('logged in')
        } else {
          this.passwrod = ''
          this.loginMessage = 'bad password' + result.status
        }
      },
      (result) => {
        this.passwrod = ''
        this.loginMessage = 'bad password'
      }
      )
    },
    tryLogout: function (event) {
      this.userSettings.username = ''
      this.userSettings.token = ''
      window.localStorage.setItem('emmaSettings', JSON.stringify(this.userSettings))
      var url = location.hostname.split('.').slice(1).join('.')
      document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + url
      document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + url
      var parentUrl = location.hostname.split('.').slice(1).join('.')
      document.cookie = 'sessionId="' + this.userSettings.visitorToken +
      '"; domain=' + parentUrl
      document.cookie = 'userId="visitor"; domain=' + parentUrl
    },
    getVisitorToken: function () {
      this.$http.post(
        globalSettings.AUTH_URL,
        {},
        {
          headers: {
            Authorization: 'Basic ' + btoa(globalSettings.ANONYMOUS_USERNAME + ':' + globalSettings.ANONYMOUS_PASSWORD)
          },
          emulateJSON: true,
        },
      ).then((result) => {
        if (result.status === 200) {
          if (!this.userSettings) this.userSettings = {}
          this.userSettings.visitorToken = result.body.data.token
          window.localStorage.setItem('emmaSettings', JSON.stringify(this.userSettings))
          var parentUrl = location.hostname.split('.').slice(1).join('.')
          document.cookie = 'sessionId="' + this.userSettings.visitorToken +
          '"; domain=' + parentUrl
          document.cookie = 'userId="visitor"; domain=' + parentUrl
        } else {
          this.loginMessage = 'unable get visitor token' + result.status
        }
      })
    },
  },
  created: function () {
    this.getVisitorToken()
    // verify if login information is expired
    if (this.userSettings && this.userSettings.lastLogin) {
      let lastLoginPast = (new Date()) - new Date(this.userSettings.lastLogin)
      if (lastLoginPast > 604800000) {
        this.userSettings.token = undefined
        window.localStorage.setItem('emmaSettings', JSON.stringify(this.userSettings))
      } else {
        this.$http.post(
          globalSettings.AUTH_URL + '/verify',
          {
            token: this.userSettings.token,
          },
          {
            emulateJSON: true,
          },
        ).then((result) => {
          console.log('token verified')
        }, (result) => {
          this.userSettings.token = undefined
          window.localStorage.setItem('emmaSettings', JSON.stringify(this.userSettings))
        })
      }
    }
  },
  mounted: function () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }
}

</script>

<style lang='scss' scoped>
.el-menu, .el-submenu {
  background-color: white;
  max-width: 90%;
}

.el-menu {
  border-bottom: 2px solid #dddddd;
}

.logo {
  // display: inline-block;
  float: left;
  margin-left: 20px;
  margin-right: 20px;
  height:40px;
}

.logo img {
  height:140%;
}
.el-menu-item-x {
    font-size: 14px;
    color: #48576a;
    padding: 0 20px;
    float: left;
    height: 60px;
    line-height: 60px;
    margin: 0;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    border-bottom: 5px solid transparent;
}
</style>
