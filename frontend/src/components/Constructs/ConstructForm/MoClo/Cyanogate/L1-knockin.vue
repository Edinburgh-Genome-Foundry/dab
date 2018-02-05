<template lang='pug'>
.construct-form
  el-select(v-model='options.mode')
    el-option(label='Up flank' value='up flank')
    el-option(label='Down flank' value='down flank')
    el-option(label='Expression cassette' value='expression')
    el-option(label='Selection marker(s)' value='selection')
</template>
<script>
export default {
  name: 'MoClo-Cyanogate-L1-knockin-Form',
  extends: require('../../ConstructForm').default
}
</script>
