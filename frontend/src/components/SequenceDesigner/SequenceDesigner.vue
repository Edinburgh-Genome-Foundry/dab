Memos:

- A part is considered in the assembly if it is checklistEnabled and user-enabled.

<template lang="pug">
.designer

  p.center Pick parts to form a simple or combinatorial construct.
  .checklist
    h3 Checklist
    .div
      el-checkbox(v-model='checklist.homologyArms') Homology arms
      el-checkbox(v-model='checklist.recombinationSites') Recombination sites
      el-checkbox(v-model='checklist.replicationOrigin') Origin of replication
      el-checkbox(v-model='checklist.selectionMarker') selectionMarker

    .div
      el-checkbox(v-model='checklist.tuA.checked') Transcription Unit A
      .subchecklist(v-if='checklist.tuA.checked')
          .radio
            el-radio(v-model='checklist.tuA.sistrons', label='mono') Monosistronic
            el-radio(v-model='checklist.tuA.sistrons', label='bi') Bistronic
    .div
      el-checkbox(v-model='checklist.tuB.checked') Transcription Unit B

  .super-mini-schema.center
    h3 Minimap:
    minipartslot(v-for='slotName in slotNames', :zone='slotInfos[slotName].zone', :key='slotName',
                 v-if='computedSlotsData[slotName].checklistEnabled',
                 :disabled='!computedSlotsData[slotName].userEnabled',
                 :size='10', :categories='slotInfos[slotName].categories.filter((c) => computedSlotsData[slotName].categories[c])', :slotName='slotName')
  .partsSlots
    partslot(v-for='slotName in slotNames',
             :slotName='slotName',
             :checklistEnabled='computedSlotsData[slotName].checklistEnabled',
             :userEnabled='computedSlotsData[slotName].userEnabled',
             :categories='computedSlotsData[slotName].categories',
             @select='selectParts')
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
        selectedParts: []
      }
    })
    return {
      checklist: {
        homologyArms: true,
        recombinationSites: false,
        replicationOrigin: true,
        tuA: {
          checked: true,
          sistrons: 'bi'
        },
        selectionMarker: true,
        tuB: {
          checked: true
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
    }
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
.checklist {
  height: 200px;
  .subchecklist {
    margin-left: 2em;
  }
}

.super-mini-schema {
  .mini-part-slot {
    width: 1.8em;
    /deep/.icon {
      // background-size: 100% cover;
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

</style>
