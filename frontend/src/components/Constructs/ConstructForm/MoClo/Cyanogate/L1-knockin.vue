<template lang='pug'>
.construct-form
  el-radio(v-model='options.mode' label='up flank') Up flank
  br
  el-radio(v-model='options.mode' label='down flank') Down flank
  br
  el-radio(v-model='options.mode' label='expression') Expression cassette
  br
  el-radio(v-model='options.mode' label='selection') Selection marker(s)
</template>
<script>
export default {
  name: 'MoClo-Cyanogate-L1-knockin-Form',
  extends: require('../../ConstructForm').default
}
</script>
