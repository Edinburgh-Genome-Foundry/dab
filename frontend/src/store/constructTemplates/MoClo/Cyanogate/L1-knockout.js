var slotNames = ['BACKBONE', 'UP', 'sacB', 'ABR', 'DOWN']
var defaultSlots = {}
slotNames.map(function (slotName) {
  defaultSlots[slotName] = {
    userEnabled: true,
    selectedParts: []
  }
})

export const template = {
  name: 'Cyanogate-L1-knockout',
  slotNames: slotNames,
  defaultSlots: defaultSlots,
  overhangs: ['GGAG', 'AATG', 'AGGT', 'GCTT', 'CGCT'],
  compatibleOverhangs: [],
  defaultOptions: {},
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
        '5-3 homology arm',
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
        '3-5 homology arm'
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
      enabled: o => true,
      locked: true,
      categoriesEnabled: o => ({
        '5-3 homology arm': true,
      })
    },
    'ABR': {
      enabled: o => true,
      locked: false,
      categoriesEnabled: o => ({
        'expression cassette': true,
      })
    },
    'sacB': {
      enabled: o => true,
      locked: false,
      categoriesEnabled: o => ({
        'expression cassette': true,
      })
    },
    'DOWN': {
      enabled: o => true,
      locked: true,
      categoriesEnabled: o => ({
        '3-5 homology arm': true
      })
    }
  }
}
