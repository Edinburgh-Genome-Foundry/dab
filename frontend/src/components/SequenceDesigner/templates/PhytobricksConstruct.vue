<template lang='pug'>
.construct
  textarea.name(v-model='constructName', placeholder='(Name this construct)' rows=1)
  .construct-hover-only
    toolbar(:construct='construct', @toggleOptions="showOptions = !showOptions")

  .options.animated.flipInX(v-show='showOptions')
    el-checkbox(v-model='options.singlePartPromoterUTR')  Single-part (promoter + UTR)
    el-checkbox(v-model='options.singlePartPromoter' v-if='!options.singlePartPromoterUTR') Single-part promoter
    el-checkbox(v-model='options.singlePartCDS') Single-part CDS
    el-checkbox(v-model='options.singlePartUTRTerminator') Single-part (UTR + terminator)


  .slots
    transition-group(name='parts-list',
                     enter-active-class='animated flipInX',
                     leave-active-class='animated zoomOut absolute-animation',
                     tag='div')
      .part-slot(v-for='slotName in constructTemplate.slotNames', :key='slotName',
                 v-if='optionsEnabled[slotName]', :slotName='slotName',
                 is='part-slot',
                 :categoriesEnabled='categoriesEnabled[slotName]',
                 :zone='constructTemplate.slotInfos[slotName].zone',
                 :construct='construct',
                 :optionsLocked='optionsLocked[slotName]',
                 :userEnabled='construct.userEnabled[slotName]')
</template>
<script>
import Construct from '../Construct'

var slotNames = 'DIST PROX CORE PROM 5UTR NTAG PROM+5UTR CDS1 CDS2 CTAG CDS 3UTR TERM 3UTR+TERM'.split(' ')
var defaultSlots = {}
slotNames.map(function (slotName) {
  defaultSlots[slotName] = {
    userEnabled: true,
    selectedParts: []
  }
})

var template = {
  name: 'Phytobricks',
  slotNames: slotNames,
  defaultSlots: defaultSlots,
  overhangs: [
    'GGAG', 'TGAC', 'TCCC', 'TACT', 'CCAT', 'AATG', 'AGCC', 'TTCG', 'GCTT',
    'GGTA', 'CGCT'
  ],
  compatibleOverhangs: [],
  defaultOptions: {
    singlePartPromoterUTR: true,
    singlePartPromoter: true,
    singlePartCDS: true,
    singlePartUTRTerminator: true
  },
  slotInfos: {
    'DIST': {
      zone: ['promoter'],
      overhangs: {
        left: 'GGAG',
        right: 'TGAC'
      },
      categories: [
        'DNA binding element',
      ]
    },
    'PROX': {
      zone: ['promoter'],
      overhangs: {
        left: 'ATGG',
        right: 'GACT'
      },
      categories: [
        'DNA binding element',
      ]
    },
    'CORE': {
      zone: ['promoter'],
      overhangs: {
        left: 'GACT',
        right: 'GGAC'
      },
      categories: [
        'promoter'
      ]
    },
    'PROM': {
      zone: ['promoter'],
      overhangs: {
        left: 'GGAC',
        right: 'TCCG'
      },
      categories: [
        'promoter',
      ]
    },
    '5UTR': {
      zone: ['promoter'],
      overhangs: {
        left: 'TCCG',
        right: 'CCAG'
      },
      categories: [
        '5-3 UTR'
      ]
    },
    'NTAG': {
      zone: ['cds'],
      overhangs: {
        left: 'CCAG',
        right: 'CAGC'
      },
      categories: [
        'protein tag'
      ]
    },
    'PROM+5UTR': {
      zone: ['promoter'],
      overhangs: {
        left: 'CAGC',
        right: 'AGGC'
      },
      categories: [
        'promoter',
      ]
    },
    'CDS1': {
      zone: ['cds'],
      overhangs: {
        left: 'AGGC',
        right: 'GCGT'
      },
      categories: [
        'CDS'
      ]
    },
    'CDS2': {
      zone: ['cds'],
      overhangs: {
        left: 'AGGC',
        right: 'ATCC'
      },
      categories: [
        'CDS'
      ]
    },
    'CTAG': {
      zone: ['cds'],
      overhangs: {
        left: 'ATCC',
        right: 'GCGT'
      },
      categories: [
        'protein tag'
      ]
    },
    'CDS': {
      zone: ['cds'],
      overhangs: {
        left: 'GCGT',
        right: 'TGCT'
      },
      categories: [
        'CDS'
      ]
    },
    '3UTR': {
      zone: ['terminator'],
      overhangs: {
        left: 'TGCT',
        right: 'GGTA'
      },
      categories: [
        '3-5 UTR'
      ]
    },
    'TERM': {
      zone: ['terminator'],
      overhangs: {
        left: 'GGTA',
        right: 'CGTC'
      },
      categories: [
        'terminator'
      ]
    },
    '3UTR+TERM': {
      zone: ['terminator'],
      overhangs: {
        left: 'CGTC',
        right: 'TCAC'
      },
      categories: [
        'insulator'
      ]
    },
  },
  slotOptions: {
    'DIST': {
      enabled: o => !o.singlePartPromoterUTR && !o.singlePartPromoter,
      locked: o => false,
      categoriesEnabled: o => ({
        'DNA binding element': true,
      })
    },
    'PROX': {
      enabled: o => !o.singlePartPromoterUTR && !o.singlePartPromoter,
      locked: o => false,
      categoriesEnabled: o => ({
        'DNA binding element': true,
      })
    },
    'CORE': {
      enabled: o => !o.singlePartPromoterUTR && !o.singlePartPromoter,
      locked: o => false,
      categoriesEnabled: o => ({
        'promoter': true,
      })
    },
    'PROM': {
      enabled: o => !o.singlePartPromoterUTR && o.singlePartPromoter,
      locked: true,
      categoriesEnabled: o => ({
        'promoter': true
      })
    },
    '5UTR': {
      enabled: o => !o.singlePartPromoterUTR,
      locked: true,
      categoriesEnabled: o => ({
        '5-3 UTR': true,
      })
    },
    'NTAG': {
      enabled: o => !o.singlePartPromoterUTR,
      locked: false,
      categoriesEnabled: o => ({
        'protein tag': true
      })
    },
    'PROM+5UTR': {
      enabled: o => o.singlePartPromoterUTR,
      locked: true,
      categoriesEnabled: o => ({
        'promoter': true,
      })
    },
    'CDS1': {
      enabled: o => !o.singlePartCDS,
      locked: true,
      categoriesEnabled: o => ({
        'CDS': true
      })
    },
    'CDS2': {
      enabled: o => !o.singlePartCDS,
      locked: true,
      categoriesEnabled: o => ({
        'CDS': true
      })
    },
    'CTAG': {
      enabled: o => !o.singlePartCDS,
      locked: true,
      categoriesEnabled: o => ({
        'protein tag': true
      })
    },
    'CDS': {
      enabled: o => o.singlePartCDS,
      locked: true,
      categoriesEnabled: o => ({
        'CDS': true
      })
    },
    '3UTR': {
      enabled: o => !o.singlePartUTRTerminator,
      locked: false,
      categoriesEnabled: o => ({
        '3-5 UTR': true
      })
    },
    'TERM': {
      enabled: o => !o.singlePartUTRTerminator,
      locked: true,
      categoriesEnabled: o => ({
        'terminator': true
      })
    },
    '3UTR+TERM': {
      enabled: o => o.singlePartUTRTerminator,
      locked: true,
      categoriesEnabled: o => ({
        'terminator': true
      })
    }
  }
}

export default {
  name: 'PythobricksConstruct',
  extends: Construct,
  constructTemplate: template,
  beforeCreate () {
    this.constructTemplate = template
  }
}
</script>
