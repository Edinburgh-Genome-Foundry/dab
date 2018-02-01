<template lang='pug'>
el-tree(:data='treeData', @node-click='templateTreeClick',
        :render-content='renderContent')
</template>

<script>
export default {
  name: 'template-tree',
  props: {
    singleRoot: {default: true}
  },
  data () {
    var tree = this.$store.state.templatesTree
    return {
      treeData: this.singleRoot ? tree : tree[0].children
    }
  },
  methods: {
    templateTreeClick (node) {
      if (node.templateName) {
        this.$emit('click', node.templateName)
      }
    },
    renderContent (h, { node, data, store }) {
      return h('b', null, [h('span', null, node.label)])
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
