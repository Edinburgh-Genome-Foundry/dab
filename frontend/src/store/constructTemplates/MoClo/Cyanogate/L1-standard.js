var slotNames = ['BACKBONE', 'PROM+5U', 'TSS', 'RBS', 'SP', 'CDS2-STOP', '3U+TER']
var defaultSlots = {}
slotNames.map(function (slotName) {
  defaultSlots[slotName] = {
    userEnabled: true,
    selectedParts: []
  }
})

export const template = {
  name: 'Cyanogate-L1-standard',
  slotNames: slotNames,
  defaultSlots: defaultSlots,
  overhangs: ['GGAG', 'AATG', 'AGGT', 'GCTT', 'CGCT'],
  compatibleOverhangs: [],
  defaultOptions: {
    separateRBS: false
  },
  zoneColors: {
    promoter: '#f6faff',
    cds: '#f4fefa',
    terminator: '#fff5ff'
  },
  slotInfos: {
    'BACKBONE': {
      zone: ['backbone'],
      overhangs: {
        left: 'CGCT',
        right: 'GGAG'
      },
      categories: [
        'backbone',
      ]
    },
    'PROM+5U': {
      zone: ['promoter'],
      overhangs: {
        left: 'GGAG',
        right: 'AATG'
      },
      categories: [
        'promoter',
      ]
    },
    'TSS': {
      zone: ['promoter'],
      overhangs: {
        left: 'GGAG',
        right: 'TAGC'
      },
      categories: [
        'transcription start site',
      ]
    },
    'RBS': {
      zone: ['promoter'],
      overhangs: {
        left: 'TAGC',
        right: 'AATG'
      },
      categories: [
        'RBS'
      ]
    },
    'SP': {
      zone: ['cds'],
      overhangs: {
        left: 'AATG',
        right: 'AGGT'
      },
      categories: [
        'signal peptide',
      ]
    },
    'CDS2-STOP': {
      zone: ['cds'],
      overhangs: {
        left: 'AGGT',
        right: 'GCTT'
      },
      categories: [
        'CDS'
      ]
    },
    '3U+TER': {
      zone: ['terminator'],
      overhangs: {
        left: 'GCTT',
        right: 'CGCT'
      },
      categories: [
        'terminator'
      ]
    }
  },
  slotOptions: {
    'BACKBONE': {
      enabled: o => true,
      locked: true,
      categoriesEnabled: o => ({
        'backbone': true,
      })
    },
    'PROM+5U': {
      enabled: o => (!o.separateRBS),
      locked: true,
      categoriesEnabled: o => ({
        'promoter': true,
      })
    },
    'TSS': {
      enabled: o => (o.separateRBS),
      locked: true,
      categoriesEnabled: o => ({
        'transcription start site': true,
      })
    },
    'RBS': {
      enabled: o => (o.separateRBS),
      locked: true,
      categoriesEnabled: o => ({
        'RBS': true,
      })
    },
    'SP': {
      enabled: o => true,
      locked: false,
      categoriesEnabled: o => ({
        'signal peptide': true,
      })
    },
    'CDS2-STOP': {
      enabled: o => true,
      locked: true,
      categoriesEnabled: o => ({
        'CDS': true
      })
    },
    '3U+TER': {
      enabled: o => true,
      locked: true,
      categoriesEnabled: o => ({
        'terminator': true
      })
    }
  }
}
