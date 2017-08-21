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
var slotNames = '1 2 3 4 5 6 7 8 8a 8b 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25'.split(' ')
export default {
  data: function () {
    var slotsData = {}
    slotNames.map(function (slotName) {
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
      slotNames: slotNames,
      slotsData: slotsData
    }
  },
  components: {
    partslot
  },
  methods: {
    selectParts: function (evt) {
      console.log(evt)
    }
  },
  computed: {
    computedSlotsData: function () {
      console.log('theeeere')
      var check = this.checklist
      var checklistData = {
        '1': {
          checklistEnabled: true,
          checklistLocked: check.homologyArms,
          categories: {
            '5-3 homology arm': check.homologyArms,
            '5-3 ITR': !check.homologyArms,
            '5-3 LTR': !check.homologyArms,
            'recombinase recognition sequence': (!check.homologyArms && check.recombinationSites)
          }
        },
        '2': {
          checklistEnabled: true,
          checklistLocked: false,
          categories: {
            'insulator': true,
            'recombinase recognition sequence': check.recombinationSites
          }
        },
        '3': {
          checklistEnabled: check.tuA.checked,
          checklistLocked: true,
          categories: {
            'promoter': true
          }
        },
        '4': {
          checklistEnabled: check.tuA.checked,
          checklistLocked: false,
          categories: {
            'RNA stability sequence': true,
            'DNA binding element': true,
          }
        },
        '5': {
          checklistEnabled: check.tuA.checked,
          checklistLocked: true,
          categories: {
            '5-3 UTR': true
          }
        },
        '6': {
          checklistEnabled: check.tuA.checked,
          checklistLocked: true,
          categories: {
            'kozak-ATG': true,
            'protein tag': true,
          }
        },
        '7': {
          checklistEnabled: check.tuA.checked,
          checklistLocked: true,
          categories: {
            'CDS': true
          }
        },
        '8': {
          checklistEnabled: check.tuA.checked,
          checklistLocked: true,
          categories: {
            'p2A': true,
            'peptide linker': true
          }
        },
        '8a': {
          checklistEnabled: check.tuA.checked,
          checklistLocked: true,
          categories: {
            'protein tag': true
          }
        },
        '8b': {
          checklistEnabled: check.tuA.checked,
          checklistLocked: true,
          categories: {
            'IRES': true
          }
        },
        '9': {
          checklistEnabled: check.tuA.checked,
          checklistLocked: true,
          categories: {
            'CDS': true
          }
        },
        '10': {
          checklistEnabled: check.tuA.checked,
          checklistLocked: true,
          categories: {
            '5-3 UTR': true,
            '5-3 LTR': true
          }
        },
        '11': {
          checklistEnabled: check.tuA.checked,
          checklistLocked: true,
          categories: {
            'terminator': true
          }
        },
        '12': {
          checklistEnabled: true,
          checklistLocked: false,
          categories: {
            'insulator': true
          }
        },
        '13': {
          checklistEnabled: check.recombinationSites,
          checklistLocked: false,
          categories: {
            'recombinase recognition site': check.recombinationSites
          }
        },
        '14': {
          checklistEnabled: check.selectionMarker,
          checklistLocked: true,
          categories: {
            'promoter': true
          }
        },
        '15': {
          checklistEnabled: check.selectionMarker,
          checklistLocked: true,
          categories: {
            'CDS': true
          }
        },
        '16': {
          checklistEnabled: check.selectionMarker,
          checklistLocked: true,
          categories: {
            'terminator': true
          }
        },
        '17': {
          checklistEnabled: check.recombinationSites,
          checklistLocked: false,
          categories: {
            'recombinase recognition site': check.recombinationSites
          }
        },
        '18': {
          checklistEnabled: check.tuB.checked,
          checklistLocked: true,
          categories: {
            'promoter': true
          }
        },
        '19': {
          checklistEnabled: check.tuB.checked,
          checklistLocked: true,
          categories: {
            'CDS': true
          }
        },
        '20': {
          checklistEnabled: check.tuB.checked,
          checklistLocked: true,
          categories: {
            'p2A': true,
            'peptide linker': true,
            'IRES': true,
            'protein tag': true
          }
        },
        '21': {
          checklistEnabled: check.tuB.checked,
          checklistLocked: true,
          categories: {
            'CDS': true
          }
        },
        '22': {
          checklistEnabled: check.tuB.checked,
          checklistLocked: true,
          categories: {
            'terminator': true
          }
        },
        '23': {
          checklistEnabled: true,
          checklistLocked: false,
          categories: {
            'insulator': true
          }
        },
        '24': {
          checklistEnabled: (check.homologyArms || check.recombinationSites),
          checklistLocked: true,
          categories: {
            '5-3 homology arm': check.homologyArms,
            'recombinase recognition sequence': check.recombinationSites
          }
        },
        '25': {
          checklistEnabled: check.replicationOrigin,
          checklistLocked: false,
          categories: {
            'origin of replication': true
          }
        }
      }
      console.log(checklistData)
      var results = {}
      for (var i = 0; i < slotNames.length; i++) {
        var key = slotNames[i]
        console.log(key)
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

</style>
