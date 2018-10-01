<script>
export default {
  props: {
    value: {default: () => ({})}
  },
  data () {
    return {
      options: this.value
    }
  },
  watch: {
    options: {
      deep: true,
      handler (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.construct-form {
  font-family: Comfortaa;
  width: 85%;
  max-width: 55em;
  margin: 1em 1em 1em;
  .radio {
    display: inline;
    padding: 20px;
  }
  .el-checkbox, .el-select {
    margin-right: 1em;
    margin-left: 0;
  }
}
</style>
