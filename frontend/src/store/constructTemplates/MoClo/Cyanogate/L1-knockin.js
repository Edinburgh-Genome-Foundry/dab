var slotNames = ['BACKBONE', 'UP', 'CASSETTE', 'sacB', 'ABR', 'DOWN']
var defaultSlots = {}
slotNames.map(function (slotName) {
  defaultSlots[slotName] = {
    userEnabled: true,
    selectedParts: []
  }
})

export const template = {
  name: 'Cyanogate-L1-knockin',
  slotNames: slotNames,
  defaultSlots: defaultSlots,
  overhangs: ['GGAG', 'AATG', 'AGGT', 'GCTT', 'CGCT'],
  compatibleOverhangs: [],
  defaultOptions: {
    mode: 'up flank'
  },
  zoneColors: {},
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
    'UP': {
      zone: [],
      overhangs: {
        left: 'GGAG',
        right: 'AATG'
      },
      categories: [
        'homology arm',
      ]
    },
    'CASSETTE': {
      zone: [],
      overhangs: {
        left: 'GGAG',
        right: 'AGCT'
      },
      categories: [
        'expression cassette',
      ]
    },
    'sacB': {
      zone: [],
      overhangs: {
        left: 'AATG',
        right: 'AGGT'
      },
      categories: [
        'expression cassette'
      ]
    },
    'ABR': {
      zone: [],
      overhangs: {
        left: 'AGGT',
        right: 'GCTT'
      },
      categories: [
        'expression cassette',
      ]
    },
    'DOWN': {
      zone: [],
      overhangs: {
        left: 'GCTT',
        right: 'CGCT'
      },
      categories: [
        'homology arm'
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
    'UP': {
      enabled: o => (o.mode === 'up flank'),
      locked: true,
      categoriesEnabled: o => ({
        'homology arm': true,
      })
    },
    'CASSETTE': {
      enabled: o => (o.mode === 'expression'),
      locked: true,
      categoriesEnabled: o => ({
        'expression cassette': true,
      })
    },
    'ABR': {
      enabled: o => (o.mode === 'selection'),
      locked: true,
      categoriesEnabled: o => ({
        'expression cassette': true,
      })
    },
    'sacB': {
      enabled: o => (o.mode === 'selection'),
      locked: false,
      categoriesEnabled: o => ({
        'expression cassette': true,
      })
    },
    'DOWN': {
      enabled: o => (o.mode === 'down flank'),
      locked: true,
      categoriesEnabled: o => ({
        'homology arm': true
      })
    }
  }
}
