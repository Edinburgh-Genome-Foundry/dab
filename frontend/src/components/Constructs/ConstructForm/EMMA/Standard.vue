<template lang='pug'>
el-form.construct-form(style='width: 300px')
  el-checkbox(v-model='options.selectionMarker') Selection marker
  <br/>
  el-checkbox(v-model='options.homologyArms') Homology arms
  <br/>
  el-checkbox(v-model='options.recombinationSites') Recombination sites
  <br/>
  el-checkbox(v-model='options.insulators') Insulators
  <br/>
  el-checkbox(v-model='options.replicationOrigin') Replication origin
  <br/>
  el-checkbox(v-model='options.tuA.checked') Transcription Unit A
  <br/>
  .div(v-if='options.tuA.checked' style='margin-left: 10px;')
    el-radio(v-model='options.tuA.sistrons' label='mono') Monosistronic
    el-radio(v-model='options.tuA.sistrons' label='bi') Bisistronic
    <br/>
    el-checkbox(v-model='options.tuA.fusion'
                v-if="options.tuA.sistrons === 'mono'") Fusion
    span(v-else)
      el-radio(v-model='options.tuA.bisistron_type', label='IRES') IRES
      el-radio(v-model='options.tuA.bisistron_type', label='p2A') p2A
    <br/>

  el-checkbox(v-model='options.tuB.checked') Transcription Unit B
  <br/>
  .div(v-if='options.tuB.checked' style='margin-left: 10px;')
    el-radio(v-model='options.tuB.sistrons' label='mono') Monosistronic
    el-radio(v-model='options.tuB.sistrons' label='bi') Bisistronic

    el-checkbox(v-model='options.tuB.fusion'
                v-if="options.tuB.sistrons === 'mono'") Fusion
    span(v-else)
      el-radio(v-model='options.tuB.bisistron_type', label='IRES') IRES
      el-radio(v-model='options.tuB.bisistron_type', label='p2A') p2A
</template>
<script>
export default {
  name: 'EMMA-Standard-Form',
  extends: require('./../ConstructForm').default
}
</script>
