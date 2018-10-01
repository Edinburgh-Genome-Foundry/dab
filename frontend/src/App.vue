<template lang='pug'>
  #website
    .container
      navbar
      router-view
    footersection
</template>

<script>
import navbar from './components/Navbar'
import footersection from './components/Footer'
export default {
  data () {
  },
  components: {
    navbar,
    footersection
  },
  async created () {
    await this.$iceClient.setApiToken(
      'visitor.dab.genomefoundry.org',
      'Yp530IQZeyIZ4+hdrTTwM31IhacEB44Uv0RPWBq+O2k='
    )
    this.$store.state.user = {
      name: 'visitor',
      email: 'unknown'
    }
  },
  methods: {}
}
</script>

<style lang='scss'>
@import './assets/css/animate.css';
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
@import url(https://fonts.googleapis.com/css?family=Inconsolata);
@import url(https://fonts.googleapis.com/css?family=Raleway);
@import url(https://fonts.googleapis.com/css?family=Comfortaa);

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

h1.title {
  width:1050px;
  max-width:95%;
  margin: 0 auto 1em;
  padding: 0.5em;
  font-size: 2em;
  border-bottom: 2px solid #dddddd;
}

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

.app-title {
  color: #0c7694;
  font-size: 3em;
  font-weight: 1000;
  width:100%;
  height: 2em;
  margin-top: 2em;
  margin-bottom: 1em;
  
  font-family: Comfortaa;
  text-align: center;
  position: relative;
  display: block;
  .absolute {
    position: absolute;
    left: 50%;
    
    .relative1, .relative2 {
      left: -50%;
      position: relative;
      color: #0f9ac0;
    }
    .relative1 {
      transform: rotate(1.2deg);
      color: hsla(193, 50%, 41%, 0.2);
    }
  }
}

.el-tooltip__popper {
  font-family: Comfortaa !important;
}

.side-menu-container {
  
  width: 300px;
  overflow-y: auto;
  
  /deep/ .el-submenu__title {
    background: #f0fcff;
  }
  /deep/ .el-submenu > .el-menu {
    margin: 20px;
  }
  /deep/ .el-form-item__label:before {
    display: none;
  }
}
</style>
