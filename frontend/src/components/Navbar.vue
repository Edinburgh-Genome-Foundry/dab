<template lang="pug">
.navbar
  el-menu(:mode="fullWidth > 1020 ? 'horizontal' : 'vertical'" @select="handleSelect")
    el-menu-item(index="home")
      center
        .logo
          img(src='/static/logo.svg')
    el-menu-item(index="design_assemblies")
      i.el-icon-edit-outline
      span Design assemblies
    el-menu-item(index="manage_parts")
      i.el-icon-menu
      span Manage parts
    el-menu-item(index="about")
      i.el-icon-location-outline
      span About

    div.el-menu-item-x.login Logged as <b>{{ userName }}</b>
      a(v-if="userName == 'visitor'" @click='showLoginDialog = true') (change)
      a(v-else @click='logout') Log out
  login(v-model='showLoginDialog')
</template>

<script>
import Login from './Login'
export default {
  data: () => ({
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
    async logout () {
      await this.$iceClient.setApiToken(
        'visitor.dab.genomefoundry.org',
        'Yp530IQZeyIZ4+hdrTTwM31IhacEB44Uv0RPWBq+O2k='
      )
      this.$store.state.user = {
        name: 'visitor',
        email: 'unknown'
      }
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
  }

  .el-menu {
    border-bottom: 2px solid #dddddd;
    margin: 0 auto;
    
  }

  .logo {
    // display: inline-block;
    margin-left: 20px;
    margin-right: 20px;
    height:30px;
    img {
      height:99%;
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
    // margin-bottom: -0.05em;
    margin-right: 0.5em;
  }
  .login {
    a {
      margin-left: 1em;
    }
  }
}

</style>
