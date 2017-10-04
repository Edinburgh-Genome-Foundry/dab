<template lang="pug">
.navbar
  el-menu(:mode="fullWidth > 1020 ? 'horizontal' : 'vertical'" @select="handleSelect")
    .logo(v-if='fullWidth > 1020')
      router-link(to='home')
        img(src='../assets/images/emma-title.svg')
    el-menu-item(index='home') Home
    el-menu-item(index='repo')
      icon(name='external-link')
      a(href='https://emmadb.genomefoundry.org/' target="_blank") Parts Repo
    el-submenu(index='2')
      template(slot='title') Scenarios
      el-menu-item(v-for='scenario in scenarios',  :key="scenario.infos.path" ,:index="scenario.infos.path") {{scenario.infos.navbarTitle}}
    el-submenu(index='3')
      template(slot='title') About
      el-menu-item(index='about-emma') About Emma
      el-menu-item(index='help') Help

    li.el-menu-item-x.login(type="html" v-bind:userId='userId') Logged as <b>{{ userId }}</b>
      a(type="text" size="mini" @click="switchUser" v-bind:loginAction='loginAction' ) ({{ loginAction }})
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
import utils from '../utils.js'
console.log(scenarios.list[0].infos)
export default {
  data: () => ({
    scenarios: scenarios.list,
    fullWidth: 0,
    userId: this.userIdLookup,
    username: '',
    password: '',
    database: '',
    loginMessage: 'Enter user and password',
    showLoginDialog: false,
    loginAction: 'Switch User',
    // databases: globalSettings.DATABASES,
  }),
  methods: {
    handleSelect: function (key, keyPath) {
      this.$router.push(key)
    },
    handleResize: function (event) {
      this.fullWidth = document.documentElement.clientWidth
    },
    tryLogin: function (event) {
      utils.getToken(this)
    },
    userIdLookup: function (event) {
      utils.userIdLookup(this)
    },
    switchUser: function (event) {
      this.$set(this, 'userId', 'visitor')
      if (this.$cookie.get('userId')) {
        (this.$cookie.get('userId') !== '"visitor"') ? utils.tryLogout(this) : this.showLoginDialog = true
      } else {
        this.showLoginDialog = true
      }
    },
  },
  created: function () {
    // !this.$cookie.get('userId') && utils.getToken(this) // new session
    !this.$cookie.get('userId') && this.$router.push('Home')  // go home
    // we have to go home as the loading is parallel and no cookie is present.
    this.$set(this, 'userId', utils.userIdLookup(this)) // reactive
  },
  mounted: function () {
    // (!this.$cookie.get('userId')) && utils.getToken(this) // new session
    this.handleResize()
    console.log('we  check login')
    window.addEventListener('resize', this.handleResize)
  }
}

</script>
<style lang='scss' scoped>

.navbar {
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
      text-decoration: none;
  }
  .fa-icon {
    margin-bottom: -0.25em;
    margin-right: 0.5em;
  }
  .login a {
    margin-left: 1em;
  }
}

</style>
