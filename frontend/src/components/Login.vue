<template lang="pug">
.login
  el-dialog(v-bind:visible.sync='showDialog' width="400px")
    h3.center Log in
    el-form
      el-form-item(label="Username")
        el-input(v-model='credentials.username')
      el-form-item(label="Password")
        el-input(v-model='credentials.password' type='password')
      div.center.submit
        el-button(type='primary' @click='submit') submit
      .spinner(v-if='loggingIn')
        img.spinner(src='../assets/images/loading_plasmid.svg')
      el-alert(v-if='error.length', :title='error', type='error', show-icon)
</template>

<script>
import utils from '../utils.js'
import auth from '../auth'
export default {
  props: {
    value: {default: false}
  },
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      loggingIn: false,
      error: '',
      showDialog: this.value
    }
  },
  watch: {
    showDialog (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.showDialog = val
    }
  },
  methods: {
    handleSelect: function (key, keyPath) {
      this.$router.push(key)
    },
    handleResize: function (event) {
      this.fullWidth = document.documentElement.clientWidth
    },
    submit () {
      this.loggingIn = true
      this.error = ''
      auth.login(this.credentials).then((response) => {
        console.log(response)
        this.loggingIn = false
        if (response.status !== 200) {
          this.error = 'Authentication error. ' + utils.getError(response)
        } else {
          this.showDialog = false
        }
      })
    },
    logout () {
      auth.logout()
    },
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
.submit {
  margin-bottom: 1em;
}
.spinner {
  height: 100px;
  text-align: center;
}

</style>
