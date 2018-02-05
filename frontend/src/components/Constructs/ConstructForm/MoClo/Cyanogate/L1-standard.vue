<template lang='pug'>
.construct-form
  el-checkbox(v-model='options.separateRBS') Separate RBS
</template>
<script>
export default {
  name: 'MoClo-Cyanogate-L1-standard',
  extends: require('../../ConstructForm').default
}
</script>
