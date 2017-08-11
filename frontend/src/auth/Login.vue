<!-- src/components/Login.vue -->

<template lang='pug'>
  div
    h1 EMMA Designer
    .login-form
      p Welcome ! Please Connect with your EMMA-DB identifier and password

      p Username:
      el-input(placeholder="username" v-model="form.username")

      p Password:
      el-input(placeholder="password" v-model="form.password" type='password')
</template>

<script>
  export default {
    data: function () {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    }
  }
</script>

<style lang="scss">
.login-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
