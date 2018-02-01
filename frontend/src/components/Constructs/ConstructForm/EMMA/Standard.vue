<template lang='pug'>
.construct-form
  el-checkbox(v-model='options.selectionMarker') Selection marker
  el-checkbox(v-model='options.homologyArms') Homology arms
  el-checkbox(v-model='options.recombinationSites') Recombination sites
  el-checkbox(v-model='options.insulators') Insulators
  el-checkbox(v-model='options.replicationOrigin') Replication origin

  hr
  el-checkbox(v-model='options.tuA.checked') Transcription Unit A
  el-select(v-if='options.tuA.checked' v-model='options.tuA.sistrons')
    el-option(label='Monosistronic' value='mono')
    el-option(label='Bisistronic' value='bi')

  el-checkbox(v-if="options.tuA.checked && (options.tuA.sistrons === 'mono')",
              v-model='options.tuA.fusion') Fusion

  span(v-if="options.tuA.checked && (options.tuA.sistrons === 'bi')")
    el-radio(v-model='options.tuA.bisistron_type', label='IRES') IRES
    el-radio(v-model='options.tuA.bisistron_type', label='p2A') p2A

  hr
  el-checkbox(v-model='options.tuB.checked') Transcription Unit B
  el-select(v-if='options.tuB.checked' v-model='options.tuB.sistrons')
    el-option(label='Monosistronic' value='mono')
    el-option(label='Bisistronic' value='bi')

  el-checkbox(v-if="options.tuB.checked && (options.tuB.sistrons === 'mono')",
              v-model='options.tuB.fusion') Fusion

  span(v-if="options.tuB.checked && (options.tuB.sistrons === 'bi')")
    el-radio(v-model='options.tuB.bisistron_type', label='IRES') IRES
    el-radio(v-model='options.tuB.bisistron_type', label='p2A') p2A
</template>
<script>
export default {
  name: 'EMMA-Standard-Form',
  extends: require('./../ConstructForm').default
}
</script>
