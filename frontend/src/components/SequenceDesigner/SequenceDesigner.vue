<template lang="pug">
.designer
  .file-operations
    el-button(icon='document' size='mini' @click='downloadSchema').file-link Download schema
    el-button.file-link(icon='upload2' size='mini' @click='showDialog=true') Upload schema
    el-dialog.part-selector(title="Upload a schema", :visible.sync="showDialog", size='small')
      files-uploader(v-model='jsonSchemaFile', :showSelected='false', :multiple='false')
  .features
    .div
      el-checkbox(v-model='design.checklist.selectionMarker') Selection marker
      el-checkbox(v-model='design.checklist.homologyArms') Homology arms
      el-checkbox(v-model='design.checklist.recombinationSites') Recombination sites
      el-checkbox(v-model='design.checklist.insulators') Insulators
      el-checkbox(v-model='design.checklist.replicationOrigin') Replication origin

    hr
    el-checkbox(v-model='design.checklist.tuA.checked') Transcription Unit A
    el-select(v-if='design.checklist.tuA.checked' v-model='design.checklist.tuA.sistrons')
      el-option(label='Monosistronic' value='mono')
      el-option(label='Bisistronic' value='bi')

    el-checkbox(v-if="design.checklist.tuA.checked && (design.checklist.tuA.sistrons === 'mono')",
                v-model='design.checklist.tuA.fusion') Fusion

    span(v-if="design.checklist.tuA.checked && (design.checklist.tuA.sistrons === 'bi')")
      el-radio(v-model='design.checklist.tuA.bisistron_type', label='IRES') IRES
      el-radio(v-model='design.checklist.tuA.bisistron_type', label='p2A') p2A

    hr
    el-checkbox(v-model='design.checklist.tuB.checked') Transcription Unit B
    el-select(v-if='design.checklist.tuB.checked' v-model='design.checklist.tuB.sistrons')
      el-option(label='Monosistronic' value='mono')
      el-option(label='Bisistronic' value='bi')

    el-checkbox(v-if="design.checklist.tuB.checked && (design.checklist.tuB.sistrons === 'mono')",
                v-model='design.checklist.tuB.fusion') Fusion

    span(v-if="design.checklist.tuB.checked && (design.checklist.tuB.sistrons === 'bi')")
      el-radio(v-model='design.checklist.tuB.bisistron_type', label='IRES') IRES
      el-radio(v-model='design.checklist.tuB.bisistron_type', label='p2A') p2A

  .parts-slots
    partslot(v-for='slotName in slotNames',
             :key='slotName',
             :slotName='slotName',
             :checklistEnabled='design.slotsData[slotName].checklistEnabled',
             :userEnabled.sync='design.slotsData[slotName].userEnabled',
             :selectedParts.sync='design.slotsData[slotName].selectedParts',
             :checklistLocked='design.slotsData[slotName].checklistLocked',
             :categories='design.slotsData[slotName].categories',
             :zone= 'design.slotsData[slotName].zone',
             @userEnable='userEnable', @userDisable='userDisable')
</template>

<script>
import partslot from './PartSlot'
import emma from './EMMA'
import minipartslot from './MiniPartSlot'
import download from 'downloadjs'

export default {
  props: {
    value: {default: () => ({})}
  },
  data: function () {
    return {
      design: this.value,
      slotNames: emma.slotNames,
      slotInfos: emma.slotInfos,
      showDialog: false,
      jsonSchemaFile: {
        name: '',
        content: ''
      }
    }
  },
  components: {
    partslot,
    minipartslot
  },
  methods: {
    userEnable: function (slotName) {
      this.$set(this.design.slotsData[slotName], 'userEnabled', true)
    },
    userDisable: function (slotName) {
      this.$set(this.design.slotsData[slotName], 'userEnabled', false)
    },
    updateChecklistSlotData: function () {
      var checklistData = emma.computeChecklistData(this.design.checklist)
      var results = {}
      for (var i = 0; i < this.slotNames.length; i++) {
        var key = this.slotNames[i]
        if (checklistData[key]) {
          results[key] = Object.assign({}, this.design.slotsData[key], checklistData[key])
        }
      }
      this.design.slotsData = results
    },
    downloadSchema: function () {
      download(JSON.stringify(this.design, null, ' '), 'design.json')
    },
    uploadSchema: function (evt) {
      console.log(evt)
    }
  },
  computed: {
  },
  mounted: function () {
    this.updateChecklistSlotData()
  },
  watch: {
    design: {
      deep: true,
      handler: function (newval) {
        this.$emit('input', newval)
      }
    },
    'design.checklist': {
      deep: true,
      handler: function (newval) {
        this.updateChecklistSlotData()
      }
    },
    'jsonSchemaFile.content': {
      deep: true,
      handler: function (newval) {
        if (newval) {
          var json = JSON.parse(atob(newval.split(',')[1]))
          this.design = json
        }
      }
    }
  }
}

</script>
<style lang='scss' scoped>

hr {
    border: 0;
    height: 0.5px;
    background: #bbb;
}

.file-operations {
  text-align: center;
  .file-link {
    display: inline;
    font-size: 0.8em;
    border: none;
    margin-right: 1em;
  }
  margin-bottom: 2.5em;
}
.features {
  width: 85%;
  max-width: 55em;
  margin: 0 auto;
  .radio {
    display: inline;
    padding: 20px;
  }
  .el-checkbox, .el-select {
    margin-right: 1em;
    margin-left: 0;
  }
}

.super-mini-schema {
  .mini-part-slot {
    width: 1.8em;
    /deep/.icon {
      background-repeat: no-repeat;
      background-position: 50% 50%;
      width: 100%;
      height: 2.1em;
      margin-top: -0.28em;
      &:not(:first-child) {
        width: 90%;
        margin-left: 5%;
      }
    }
  }
}

.parts-slots {
  display: block;
  margin-top: 2em;
}

</style>
