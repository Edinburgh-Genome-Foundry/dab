<template lang='pug'>
el-form.construct-form
  el-checkbox(v-model='options.singlePartPromoterUTR')  Single-part (promoter + UTR)
  <br/>
  .div(v-if='!options.singlePartPromoterUTR')
    el-checkbox(v-model='options.singlePartPromoter') Single-part promoter
    <br/>
  el-checkbox(v-model='options.singlePartCDS') Single-part CDS
  <br/>
  el-checkbox(v-model='options.singlePartUTRTerminator') Single-part (UTR + terminator)
</template>
<script>
export default {
  name: 'MoClo-Phytobricks-Form',
  extends: require('./../ConstructForm').default
}
</script>
