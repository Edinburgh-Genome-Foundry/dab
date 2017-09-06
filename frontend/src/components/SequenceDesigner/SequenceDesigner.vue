<template lang="pug">
.designer

  .features
    .div
      el-checkbox(v-model='checklist.selectionMarker') Selection marker
      el-checkbox(v-model='checklist.homologyArms') Homology arms
      el-checkbox(v-model='checklist.recombinationSites') Recombination sites
      el-checkbox(v-model='checklist.insulators') Insulators
      el-checkbox(v-model='checklist.replicationOrigin') Replication origin

    hr
    el-checkbox(v-model='checklist.tuA.checked') Transcription Unit A
    el-select(v-if='checklist.tuA.checked' v-model='checklist.tuA.sistrons')
      el-option(label='Monosistronic' value='mono')
      el-option(label='Bisistronic' value='bi')

    el-checkbox(v-if="checklist.tuA.checked && (checklist.tuA.sistrons === 'mono')",
                v-model='checklist.tuA.fusion') Fusion

    span(v-if="checklist.tuA.checked && (checklist.tuA.sistrons === 'bi')")
      el-radio(v-model='checklist.tuA.bisistron_type', label='IRES') IRES
      el-radio(v-model='checklist.tuA.bisistron_type', label='p2A') p2A

    hr
    el-checkbox(v-model='checklist.tuB.checked') Transcription Unit B
    el-select(v-if='checklist.tuB.checked' v-model='checklist.tuB.sistrons')
      el-option(label='Monosistronic' value='mono')
      el-option(label='Bisistronic' value='bi')

    el-checkbox(v-if="checklist.tuB.checked && (checklist.tuB.sistrons === 'mono')",
                v-model='checklist.tuB.fusion') Fusion

    span(v-if="checklist.tuB.checked && (checklist.tuB.sistrons === 'bi')")
      el-radio(v-model='checklist.tuB.bisistron_type', label='IRES') IRES
      el-radio(v-model='checklist.tuB.bisistron_type', label='p2A') p2A

  .parts-slots
    partslot(v-for='slotName in slotNames',
             :key='slotName',
             :slotName='slotName',
             :checklistEnabled='slotsData[slotName].checklistEnabled',
             :userEnabled.sync='slotsData[slotName].userEnabled',
             :selectedParts.sync='slotsData[slotName].selectedParts',
             :checklistLocked='slotsData[slotName].checklistLocked',
             :categories='slotsData[slotName].categories',
             :zone= 'slotsData[slotName].zone'
             @userEnable='userEnable', @userDisable='userDisable')
</template>

<script>
import partslot from './PartSlot'
import emma from './EMMA'
import minipartslot from './MiniPartSlot'
export default {
  props: {
    value: {default: () => ({})}
  },
  data: function () {
    return {
      checklist: {
        homologyArms: true,
        insulators: true,
        recombinationSites: false,
        replicationOrigin: true,
        tuA: {
          checked: true,
          sistrons: 'bi',
          bisistron_type: 'p2A',
          fusion: true
        },
        selectionMarker: true,
        tuB: {
          checked: true,
          sistrons: 'bi',
          bisistron_type: 'p2A',
          fusion: true
        }
      },
      slotNames: emma.slotNames,
      slotInfos: emma.slotInfos,
      slotsData: this.value
    }
  },
  components: {
    partslot,
    minipartslot
  },
  methods: {
    // selectParts: function (slotName, val) {
    //   this.$set(this.slotsData[slotName], 'userEnabled', true)
    // },
    userEnable: function (slotName) {
      this.$set(this.slotsData[slotName], 'userEnabled', true)
    },
    userDisable: function (slotName) {
      this.$set(this.slotsData[slotName], 'userEnabled', false)
    },
    updateChecklistSlotData: function () {
      var checklistData = emma.computeChecklistData(this.checklist)
      var results = {}
      for (var i = 0; i < this.slotNames.length; i++) {
        var key = this.slotNames[i]
        if (checklistData[key]) {
          results[key] = Object.assign({}, this.slotsData[key], checklistData[key])
        }
      }
      this.slotsData = results
    }
  },
  computed: {
  },
  mounted: function () {
    this.updateChecklistSlotData()
  },
  watch: {
    slotsData: {
      deep: true,
      handler: function (newval) {
        this.$emit('input', this.slotsData)
      }
    },
    checklist: {
      deep: true,
      handler: function (newval) {
        this.updateChecklistSlotData()
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
