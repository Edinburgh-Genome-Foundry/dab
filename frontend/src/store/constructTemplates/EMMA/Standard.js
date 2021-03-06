var slotNames = 'backbone 1 2 3 4 5 6 7 8 8a 8b 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25'.split(' ')
var defaultSlots = {}
slotNames.map(function (slotName) {
  defaultSlots[slotName] = {
    userEnabled: true,
    selectedParts: []
  }
})

export const template = {
  name: 'EMMA-Standard',
  slotNames: slotNames,
  defaultSlots: defaultSlots,
  overhangs: [
    'ACGA', 'ACTG', 'AGCG', 'AGGC', 'ATCC', 'ATGG', 'CACG', 'CAGC', 'CCAG',
    'CCCT', 'CGAA', 'CGGT', 'CGTC', 'CTAC', 'GACT', 'GCAA', 'GCGT', 'GCTC',
    'GGAC', 'GGTA', 'GTGC', 'GTTG', 'TAGG', 'TCAC', 'TCCG', 'TGCT', 'TGGA'],
  compatibleOverhangs: [
    'AACC', 'AACG', 'AAGC', 'AAGG', 'ACAC', 'ACAG', 'ACCA', 'ACTC', 'AGAC',
    'AGAG', 'AGGA', 'AGGT', 'AGTG', 'ATCG', 'ATGC', 'CAAG', 'GAAC', 'GAAG',
    'GATG', 'TACG', 'TAGC', 'TCAG', 'TCTC', 'TCTG', 'TGAC', 'TGAG', 'TGTC',
    'TGTG', 'TTCC', 'TTGG'
  ],
  defaultOptions: {
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
  zoneColors: {
    tuA: '#f6faff',
    tuB: '#f4fefa',
    'selection-marker': '#fff5ff'
  },
  slotInfos: {
    'backbone': {
      zone: ['none'],
      overhangs: {
        left: 'ACGA',
        right: 'ATGG'
      },
      categories: [
        'backbone'
      ]
    },
    '1': {
      zone: ['none'],
      overhangs: {
        left: 'TAGG',
        right: 'ATGG'
      },
      categories: [
        '5-3 homology arm',
        '5-3 ITR',
        '5-3 LTR',
        'recombinase recognition sequence'
      ]
    },
    '2': {
      zone: ['none'],
      overhangs: {
        left: 'ATGG',
        right: 'GACT'
      },
      categories: [
        'insulator',
        'recombinase recognition sequence'
      ]
    },
    '3': {
      zone: ['tuA'],
      overhangs: {
        left: 'GACT',
        right: 'GGAC'
      },
      categories: [
        'promoter'
      ]
    },
    '4': {
      zone: ['tuA'],
      overhangs: {
        left: 'GGAC',
        right: 'TCCG'
      },
      categories: [
        'RNA stability sequence',
        'DNA binding element',
      ]
    },
    '5': {
      zone: ['tuA'],
      overhangs: {
        left: 'TCCG',
        right: 'CCAG'
      },
      categories: [
        '5-3 UTR'
      ]
    },
    '6': {
      zone: ['tuA'],
      overhangs: {
        left: 'CCAG',
        right: 'CAGC'
      },
      categories: [
        'kozak-ATG',
        'protein tag'
      ]
    },
    '7': {
      zone: ['tuA'],
      overhangs: {
        left: 'CAGC',
        right: 'AGGC'
      },
      categories: [
        'CDS',
      ]
    },
    '8': {
      zone: ['tuA'],
      overhangs: {
        left: 'AGGC',
        right: 'GCGT'
      },
      categories: [
        'p2A',
        'peptide linker'
      ]
    },
    '8a': {
      zone: ['tuA'],
      overhangs: {
        left: 'AGGC',
        right: 'ATCC'
      },
      categories: [
        'protein tag'
      ]
    },
    '8b': {
      zone: ['tuA'],
      overhangs: {
        left: 'ATCC',
        right: 'GCGT'
      },
      categories: [
        'IRES'
      ]
    },
    '9': {
      zone: ['tuA'],
      overhangs: {
        left: 'GCGT',
        right: 'TGCT'
      },
      categories: [
        'CDS'
      ]
    },
    '10': {
      zone: ['tuA'],
      overhangs: {
        left: 'TGCT',
        right: 'GGTA'
      },
      categories: [
        '5-3 UTR',
        '5-3 LTR'
      ]
    },
    '11': {
      zone: ['tuA'],
      overhangs: {
        left: 'GGTA',
        right: 'CGTC'
      },
      categories: [
        'terminator'
      ]
    },
    '12': {
      zone: ['none'],
      overhangs: {
        left: 'CGTC',
        right: 'TCAC'
      },
      categories: [
        'insulator'
      ]
    },
    '13': {
      zone: ['none'],
      overhangs: {
        left: 'TCAC',
        right: 'CTAC'
      },
      categories: [
        'recombinase recognition sequence'
      ]
    },
    '14': {
      zone: ['selection-marker'],
      overhangs: {
        left: 'CTAC',
        right: 'GCAA'
      },
      categories: [
        'promoter'
      ]
    },
    '15': {
      zone: ['selection-marker'],
      overhangs: {
        left: 'GCAA',
        right: 'CCCT'
      },
      categories: [
        'CDS'
      ]
    },
    '16': {
      zone: ['selection-marker'],
      overhangs: {
        left: 'CCCT',
        right: 'GCTC'
      },
      categories: [
        'terminator'
      ]
    },
    '17': {
      zone: ['none'],
      overhangs: {
        left: 'GCTC',
        right: 'CGGT'
      },
      categories: [
        'recombinase recognition sequence'
      ]
    },
    '18': {
      zone: ['tuB'],
      overhangs: {
        left: 'CGGT',
        right: 'GTGC'
      },
      categories: [
        'promoter'
      ]
    },
    '19': {
      zone: ['tuB'],
      overhangs: {
        left: 'GTGC',
        right: 'AGCG'
      },
      categories: [
        'CDS'
      ]
    },
    '20': {
      zone: ['tuB'],
      overhangs: {
        left: 'AGCG',
        right: 'TGGA'
      },
      categories: [
        'p2A',
        'peptide linker',
        'IRES',
        'protein tag',
      ]
    },
    '21': {
      zone: ['tuB'],
      overhangs: {
        left: 'TGGA',
        right: 'GTTG'
      },
      categories: [
        'CDS'
      ]
    },
    '22': {
      zone: ['tuB'],
      overhangs: {
        left: 'GTTG',
        right: 'CGAA'
      },
      categories: [
        'terminator'
      ]
    },
    '23': {
      zone: ['none'],
      overhangs: {
        left: 'CGAA',
        right: 'CACG'
      },
      categories: [
        'insulator'
      ]
    },
    '24': {
      zone: ['none'],
      overhangs: {
        left: 'CACG',
        right: 'ACTG'
      },
      categories: [
        '5-3 homology arm',
        'recombinase recognition sequence'
      ]
    },
    '25': {
      zone: ['none'],
      overhangs: {
        left: 'ACTG',
        right: 'ACGA'
      },
      categories: [
        'origin of replication'
      ]
    }
  },
  slotOptions: {
    'backbone': {
      enabled: o => true,
      locked: o => true,
      categoriesEnabled: o => ({'backbone': true})
    },
    '1': {
      enabled: o => true,
      locked: o => o.homologyArms,
      categoriesEnabled: o => ({
        'homology arm': o.homologyArms,
        'ITR': !o.homologyArms,
        'LTR': !o.homologyArms,
        'recombinase recognition sequence': (!o.homologyArms && o.recombinationSites)
      })
    },
    '2': {
      enabled: o => o.recombinationSites || o.insulators,
      locked: false,
      categoriesEnabled: o => ({
        'insulator': o.insulators,
        'recombinase recognition sequence': o.recombinationSites
      })
    },
    '3': {
      enabled: o => o.tuA.checked,
      locked: true,
      categoriesEnabled: o => ({
        'promoter': true
      })
    },
    '4': {
      enabled: o => o.tuA.checked,
      locked: false,
      categoriesEnabled: o => ({
        'RNA stability sequence': true,
        'DNA binding element': true,
      })
    },
    '5': {
      enabled: o => o.tuA.checked,
      locked: false,
      categoriesEnabled: o => ({
        '5-3 UTR': true
      })
    },
    '6': {
      enabled: o => o.tuA.checked,
      locked: true,
      categoriesEnabled: o => ({
        'kozak-ATG': true,
        'protein tag': true,
      })
    },
    '7': {
      enabled: o => o.tuA.checked,
      locked: true,
      categoriesEnabled: o => ({
        'CDS': true
      })
    },
    '8': {
      enabled: o => o.tuA.checked &&
        (((o.tuA.sistrons === 'mono') && (o.tuA.fusion)) ||
        ((o.tuA.sistrons === 'bi') && (o.tuA.bisistron_type === 'p2A'))),
      locked: true,
      categoriesEnabled: o => ({
        'p2A': (o.tuA.sistrons === 'bi') && (o.tuA.bisistron_type === 'p2A'),
        'peptide linker': (o.tuA.sistrons === 'mono') && (o.tuA.fusion)
      })
    },
    '8a': {
      enabled: o => o.tuA.checked &&
        (((o.tuA.sistrons === 'mono') && (!o.tuA.fusion)) ||
        ((o.tuA.sistrons === 'bi') && (o.tuA.bisistron_type === 'IRES'))),

      locked: true,
      categoriesEnabled: o => ({
        'protein tag': true
      })
    },
    '8b': {
      enabled: o => o.tuA.checked &&
                        (o.tuA.sistrons === 'bi') &&
                        (o.tuA.bisistron_type === 'IRES'),
      locked: true,
      categoriesEnabled: o => ({
        'IRES': true
      })
    },
    '9': {
      enabled: o => o.tuA.checked && !((o.tuA.sistrons === 'mono') && (!o.tuA.fusion)),
      locked: true,
      categoriesEnabled: o => ({
        'CDS': true
      })
    },
    '10': {
      enabled: o => o.tuA.checked,
      locked: false,
      categoriesEnabled: o => ({
        'UTR': true,
        'LTR': true
      })
    },
    '11': {
      enabled: o => o.tuA.checked,
      locked: true,
      categoriesEnabled: o => ({
        'terminator': true
      })
    },
    '12': {
      enabled: o => o.insulators,
      locked: false,
      categoriesEnabled: o => ({
        'insulator': true
      })
    },
    '13': {
      enabled: o => o.recombinationSites,
      locked: false,
      categoriesEnabled: o => ({
        'recombinase recognition sequence': true
      })
    },
    '14': {
      enabled: o => o.selectionMarker,
      locked: true,
      categoriesEnabled: o => ({
        'promoter': true
      })
    },
    '15': {
      enabled: o => o.selectionMarker,
      locked: true,
      categoriesEnabled: o => ({
        'CDS': true
      })
    },
    '16': {
      enabled: o => o.selectionMarker,
      locked: true,
      categoriesEnabled: o => ({
        'terminator': true
      })
    },
    '17': {
      enabled: o => o.recombinationSites,
      locked: false,
      categoriesEnabled: o => ({
        'recombinase recognition sequence': o.recombinationSites
      })
    },
    '18': {
      enabled: o => o.tuB.checked,
      locked: true,
      categoriesEnabled: o => ({
        'promoter': true
      })
    },
    '19': {
      enabled: o => o.tuB.checked,
      locked: true,
      categoriesEnabled: o => ({
        'CDS': true
      })
    },
    '20': {
      enabled: o => o.tuB.checked,
      locked: o => !((o.tuB.sistrons === 'mono') && (!o.tuB.fusion)),
      categoriesEnabled: o => ({
        'p2A': (o.tuB.sistrons === 'bi') && (o.tuB.bisistron_type === 'p2A'),
        'IRES': (o.tuB.sistrons === 'bi') && (o.tuB.bisistron_type === 'IRES'),
        'protein tag': (o.tuB.sistrons === 'mono') && (!o.tuB.fusion),
        'peptide linker': (o.tuB.sistrons === 'mono') && (o.tuB.fusion)
      })
    },
    '21': {
      enabled: o => o.tuB.checked && !((o.tuB.sistrons === 'mono') && (!o.tuB.fusion)),
      locked: true,
      categoriesEnabled: o => ({
        'CDS': true
      })
    },
    '22': {
      enabled: o => o.tuB.checked,
      locked: true,
      categoriesEnabled: o => ({
        'terminator': true
      })
    },
    '23': {
      enabled: o => o.insulators,
      locked: false,
      categoriesEnabled: o => ({
        'insulator': o.insulators
      })
    },
    '24': {
      enabled: o => (o.homologyArms || o.recombinationSites),
      locked: true,
      categoriesEnabled: o => ({
        'homology arm': o.homologyArms,
        'recombinase recognition sequence': o.recombinationSites
      })
    },
    '25': {
      enabled: o => o.replicationOrigin,
      locked: false,
      categoriesEnabled: o => ({
        'origin of replication': true
      })
    }
  }
}
