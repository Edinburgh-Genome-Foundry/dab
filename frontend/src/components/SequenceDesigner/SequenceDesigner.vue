<template lang="pug">
.designer

  .features
    //- h3 Features
    //- .super-mini-schema.center
    //-   minipartslot(v-for='slotName in slotNames', :zone='slotInfos[slotName].zone', :key='slotName',
    //-                v-if='computedSlotsData[slotName].checklistEnabled',
    //-                :disabled='!computedSlotsData[slotName].userEnabled', :size='10',
    //-                :categories='slotInfos[slotName].categories.filter((c) => computedSlotsData[slotName].categories[c])',
    //-                :slotName='slotName')
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
             :checklistEnabled='computedSlotsData[slotName].checklistEnabled',
             :userEnabled='computedSlotsData[slotName].userEnabled',
             :checklistLocked='computedSlotsData[slotName].checklistLocked',
             :categories='computedSlotsData[slotName].categories',
             :zone= 'computedSlotsData[slotName].zone'
             @userEnable='userEnable', @userDisable='userDisable',  @select='selectParts')
</template>

<script>
import partslot from './PartSlot'
import emma from './EMMA'
import minipartslot from './MiniPartSlot'
export default {
  data: function () {
    var slotsData = {}
    emma.slotNames.map(function (slotName) {
      slotsData[slotName] = {
        userEnabled: true,
        selectedParts: [],
        zone: emma.slotInfos[slotName].zone[0]
      }
    })
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
      slotsData: slotsData
    }
  },
  components: {
    partslot,
    minipartslot
  },
  methods: {
    selectParts: function (evt) {
    },
    userEnable: function (slotName) {
      this.$set(this.slotsData[slotName], 'userEnabled', true)
    },
    userDisable: function (slotName) {
      this.$set(this.slotsData[slotName], 'userEnabled', false)
    },

  },
  computed: {
    computedSlotsData: function () {
      var checklistData = emma.computeChecklistData(this.checklist)

      var results = {}
      for (var i = 0; i < this.slotNames.length; i++) {
        var key = this.slotNames[i]

        if (checklistData[key]) {
          results[key] = Object.assign(checklistData[key], this.slotsData[key])
        }
      }
      return results
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
