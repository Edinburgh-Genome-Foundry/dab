<template lang='pug'>
  #website
    .container
      navbar
      router-view
    footersection
</template>

<script>
import auth from './auth.js'
import navbar from './components/Navbar'
import footersection from './components/Footer'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      user: auth.user
    }
  },
  components: {
    navbar,
    footersection
  },
  created () {
    var cookieUserId = this.$cookie.get('userId')
    var cookieToken = this.$cookie.get('userId')
    if (cookieUserId && cookieToken) {
      this.update_user({name: cookieUserId.replace(/['"]+/g, '')})
      this.update_auth({
        isLoggedIn: true,
        accessToken: cookieToken.replace(/['"]+/g, ''),
        refreshToken: null,
      })
    } else {
      auth.login({
        username: this.$store.state.settings.ANONYMOUS_USERNAME,
        password: this.$store.state.settings.ANONYMOUS_PASSWORD
      })
    }
  },
  methods: {
    ...mapMutations([
      'update_auth',
      'update_user',
    ])
  }
}
</script>

<style lang='scss'>
@import './assets/css/animate.css';
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
@import url(https://fonts.googleapis.com/css?family=Inconsolata);
@import url(https://fonts.googleapis.com/css?family=Raleway);

#website {
  font-family: 'Raleway', 'Source Sans Pro',  Helvetica, Arial, sans-serif;
  font-size:16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.el-select-dropdown, .el-input__inner {
  font-family: 'Raleway', 'Source Sans Pro',  Helvetica, Arial, sans-serif;
}
html {
  position: relative;
  min-height: 100%;
}

body {
  /* Margin bottom by footer height */
  margin-bottom: 60px;
}

.page, .navbar {
  width:1050px;
  max-width:95%;
  margin: 0px auto;
}

.reduced-width {
  max-width: 800px;
  margin: 0 auto;

  img {
    max-width: 100%;
  }
}

.el-button {
  font-size: 18px;
}

.el-button.center {
  display: block;
  margin: 2em auto;
}

h1, h2 {
  text-align: center;
  margin-bottom:1em;
  font-weight: normal
}

h1 { font-size: 3em; }
h2 { font-size: 2em; }

img.icon {
  display: block;
  margin: 0 auto;
  max-width: 100px;
}

a {
  color: #20a0ff;
}

.center {
  text-align: center;
}


.router-link-active {
    color: "black";
}
</style>
