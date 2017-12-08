<template lang='pug'>
.construct-form
  el-checkbox(v-model='options.singlePartPromoterUTR')  Single-part (promoter + UTR)
  el-checkbox(v-model='options.singlePartPromoter' v-if='!options.singlePartPromoterUTR') Single-part promoter
  el-checkbox(v-model='options.singlePartCDS') Single-part CDS
  el-checkbox(v-model='options.singlePartUTRTerminator') Single-part (UTR + terminator)
</template>
<script>
export default {
  name: 'PhytobricksForm',
  extends: require('./ConstructForm')
}
</script>
