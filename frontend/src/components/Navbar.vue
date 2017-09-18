<template lang="pug">
div
  el-menu(:mode="fullWidth > 610 ? 'horizontal' : 'vertical'" @select="handleSelect")
    .logo(v-if='fullWidth > 610')
      router-link(to='home')
        img(src='../assets/images/emma-title.svg')
    el-menu-item(index='home') Home
    el-submenu(index='2')
      template(slot='title') Scenarios
      el-menu-item(v-for='scenario in scenarios',  v-bind:key="scenario.infos.path" ,:index="scenario.infos.path") {{scenario.infos.navbarTitle}}
    el-menu-item(index='about') About
    li.el-menu-item-x(type="html" v-bind:userId='userId') Welcome,  {{ userId }}
      a(type="text" size="mini" @click="switchUser" v-bind:loginAction='loginAction' ) {{ loginAction }}
  el-dialog(v-bind:visible.sync='showLoginDialog' size='tiny')
    p
      span username
      el-input(v-model='username' value="visitor")
    p
      span password
      el-input(v-model='password' type='password') visitor
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
    userSettings: this.isLogin,
    showLoginDialog: false,
    username: '',
    password: '',
    loginMessage: 'Enter user and password',
    loginAction: 'Switch User',
    userId: this.userIdLookup,
  }),
  computed: {
    isLogin: function () {
      console.log('we  check login')
      return this.$cookie.get('userId') && this.$cookie.get('sessionId')
    },
  },
  methods: {
    handleSelect: function (key, keyPath) {
      this.$router.push(key)
    },
    handleResize: function (event) {
      this.fullWidth = document.documentElement.clientWidth
    },
    userIdLookup: function () {
      console.log('userId function')
      if (this.$cookie.get('userId')) {
        this.userId = this.$cookie.get('userId').replace(/"/g, '')
      } else {
        this.userId = 'visitor'
      }
      return this.userId
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
        if (result.status === 200) {
          if (!this.userSettings) this.userSettings = {}
          this.$set(this.userSettings, 'username', this.username)
          this.userSettings.token = result.body.data.token
          this.userSettings.lastLogin = new Date()
          var parentUrl = location.hostname.split('.').slice(1).join('.')
          document.cookie = 'sessionId="' + this.userSettings.token + '"; domain=' + parentUrl
          document.cookie = 'userId="' + this.userSettings.username + '"; domain=' + parentUrl
          this.showLoginDialog = false
          this.$set(this, 'userId', this.username)
          this.$set(this, 'loginAction', 'Switch to visitor')
        } else {
          this.loginMessage = 'bad password' + result.status
        }
      },
      (result) => {
        this.passwrod = ''
        this.loginMessage = 'bad password'
      }
      )
    },
    switchUser: function (event) {
      this.$set(this, 'userId', 'visitor')
      if (this.$cookie.get('userId')) {
        if (this.$cookie.get('userId') !== '"visitor"') {
          this.tryLogout()
        } else {
          console.log('show login')
          this.showLoginDialog = true
        }
      } else {
        this.showLoginDialog = true
      }
    },
    tryLogout: function (event) {
      var url = location.hostname.split('.').slice(1).join('.')
      document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + url
      document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + url
      this.getVisitorToken()
    },
    verifyCookie: function (event) {
      this.$http.post(
        globalSettings.AUTH_URL + '/verify',
        {
          token: this.$cookie.get('sessionId'),
        },
        {
          emulateJSON: true,
        },
      ).then((result) => {
        this.$set(this, 'userId', this.userIdLookup())
      }, (result) => {
        console.log('token verified ko')
      })
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
          this.$set(this.userSettings, 'visitorToken', result.body.data.token)
          var parentUrl = location.hostname.split('.').slice(1).join('.')
          document.cookie = 'sessionId="' + this.userSettings.visitorToken + '"; domain=' + parentUrl
          document.cookie = 'userId="visitor"; domain=' + parentUrl
          this.$set(this, 'loginAction', 'Switch User')
        } else {
          this.loginMessage = 'unable get visitor token' + result.status
        }
      })
    },
  },
  created: function () {
    // verify if login information is expired
    if (this.$cookie.get('userId')) { // && this.verifyCookie()) {
      console.log('We have a session')
    } else {
      this.getVisitorToken()
    }
    this.$set(this, 'userId', this.userIdLookup()) // reactive
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
a {
    color: #20a0ff;
    margin-left: 20px;
}
</style>
