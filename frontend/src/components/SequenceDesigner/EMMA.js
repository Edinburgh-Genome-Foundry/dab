export default {
  slotNames: '1 2 3 4 5 6 7 8 8a 8b 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25'.split(' '),
  slotInfos: {
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
  }
}
