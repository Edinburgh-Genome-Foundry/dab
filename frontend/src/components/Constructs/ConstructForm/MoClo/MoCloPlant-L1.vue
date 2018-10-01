<template lang='pug'>
el-form.construct-form
  el-checkbox(v-model='options.singlePartPromoterUTR')  Single-part (promoter + UTR)
  br
  .div(v-if='!options.singlePartPromoterUTR && options.nterminal')
    el-checkbox(v-model='options.singlePartUtrNT1') Single-part (UTR + NT1)
    br
  el-checkbox(v-model='options.nterminal') N-terminal tag
  br
  el-checkbox(v-model='options.signalPeptide') Signal Peptide
  br
  el-checkbox(v-model='options.cterminal') C-terminal tag
  br
  el-checkbox(v-model='options.singlePartUTRTerminator') Single-part (UTR + terminator)
</template>
<script>
export default {
  name: 'MoClo-Phytobricks-Form',
  extends: require('./../ConstructForm').default
}
</script>
