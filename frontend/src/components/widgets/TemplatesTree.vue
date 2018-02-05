<template lang='pug'>
el-tree.template-tree(:data='treeData', @node-click='templateTreeClick',
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
      console.log(node, data)
      var icon = data.templateName ? 'circle-plus-outline' : 'tickets'

      return h('span', {
        attrs: {
          class: data.templateName ? 'leaf' : 'folder'
        },
      }, [h('i', {attrs: {class: 'el-icon-' + icon}}), h('span', null, ' ' + node.label)])
    }
  }
}
</script>

<style lang='scss' scoped>
.template-tree /deep/ {
  .el-tree-node__content{
    background-color: white !important;
  }
  .el-tree-node__content:hover{
    background-color: #f3f9ff !important;
  }
  .leaf {
    color: #409eff;
    &:hover {
      // background-color: #eeeeff
    }

  }
}
</style>
