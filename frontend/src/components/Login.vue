<template lang="pug">
.login
  el-dialog(v-bind:visible.sync='showDialog' width="400px")
    h3.center Log in
    el-form
      el-form-item(label="Email or username")
        el-input(v-model='credentials.email')
      el-form-item(label="Password")
        el-input(v-model='credentials.password' type='password')
      div.center.submit
        el-button(type='primary' @click='submit') submit
      .spinner(v-if='loggingIn')
        img.spinner(src='../assets/images/loading_plasmid.svg')
      el-alert(v-if='error.length', :title='error', type='error', show-icon)
</template>

<script>
export default {
  props: {
    value: {default: false}
  },
  data () {
    return {
      credentials: {
        email: '',
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
    async submit () {
      this.loggingIn = true
      this.error = ''
      try {
        var response = await this.$iceClient.getNewSessionId(this.credentials)
      } catch (error) {
        this.error = 'Authentication failed'
        this.loggingIn = false
        return
      }
      console.log(response)
      this.$store.state.user = {
        email: response['email'],
        name: response.firstName + ' ' + response.lastName,
        id: response['id'],
        institution: response.institution
      }
      this.loggingIn = false
      this.showDialog = false
    },
  },
  computed: {
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
