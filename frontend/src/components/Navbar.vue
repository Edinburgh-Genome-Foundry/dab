<template lang="pug">
.navbar
  el-menu(:mode="fullWidth > 1020 ? 'horizontal' : 'vertical'" @select="handleSelect")
    .logo(v-if='fullWidth > 1020')
      router-link(to='home')
        img(src='../assets/images/emma-title.svg')
    el-menu-item(index='home') Home
    a.el-menu-item(index='repo' href='https://emmadb.genomefoundry.org/')
      icon(name='external-link')
      span Parts Repo
    el-submenu(index='2')
      template(slot='title') Scenarios
      el-menu-item(v-for='scenario in scenarios',
                   :key="scenario.infos.path",
                   :index="scenario.infos.path") {{scenario.infos.navbarTitle}}
    el-submenu(index='3')
      template(slot='title') About
      el-menu-item(index='about-emma') About Emma
      el-menu-item(index='help') Help

    div.el-menu-item-x.login Logged as <b>{{ userName }}</b>
      a(v-if='userName == settings.ANONYMOUS_USERNAME' @click='showLoginDialog = true') Switch account
      a(v-else @click='logout') Log out
  login(v-model='showLoginDialog')
</template>

<script>
import scenarios from './scenarios/scenarios.js'
import Login from './Login'
import Auth from '../auth'
export default {
  data: () => ({
    scenarios: scenarios.list,
    fullWidth: 0,
    showLoginDialog: false
  }),
  components: {
    login: Login
  },
  methods: {
    handleSelect: function (key, keyPath) {
      this.$router.push(key)
    },
    handleResize: function (event) {
      this.fullWidth = document.documentElement.clientWidth
    },
    logout () {
      Auth.logout()
    }
  },
  computed: {
    auth () {
      return this.$store.state.auth
    },
    userName () {
      return this.$store.state.user.name
    },
    settings () {
      return this.$store.state.settings
    }
  },
  mounted: function () {
    this.handleResize()
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
    height:50px;
    img {
      height:180%;
    }
    a:active, a:focus {
      outline: none;
    }
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
