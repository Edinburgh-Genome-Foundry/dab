var slotNames = 'BACKBONE PRO PRO+5Uf PRO+5U 5Uf 5U 5U+NT1 NT1 CDS1 CDS1ns NT2 SP CDS2ns CDS2 CT 3U TER 3U+TER'.split(' ')
var defaultSlots = {}
slotNames.map(function (slotName) {
  defaultSlots[slotName] = {
    userEnabled: true,
    selectedParts: []
  }
})

export const template = {
  name: 'Phytobricks-L1',
  slotNames: slotNames,
  defaultSlots: defaultSlots,
  overhangs: [
    'AATG', 'AGGT', 'ATCC', 'CCAT', 'CGTC', 'GCTT', 'GGAG', 'GGTA', 'TACT',
    'TGCT', 'TTCG'
  ],
  compatibleOverhangs: [],
  defaultOptions: {
    singlePartPromoterUTR: true,
    singlePartUtrNT1: true,
    nterminal: false,
    cterminal: false,
    signalPeptide: true,
    singlePartUTRTerminator: true
  },
  zoneColors: {
    promoter: '#f6faff',
    cds: '#f4fefa',
    terminator: '#fff5ff'
  },
  slotInfos: {
    'PRO': {
      'zone': [
        'promoter'
      ],
      'overhangs': {
        'left': 'GGAG',
        'right': 'TACT'
      },
      'categories': [
        'promoter'
      ]
    },
    'PRO+5Uf': {
      'zone': [
        'promoter'
      ],
      'overhangs': {
        'left': 'GGAG',
        'right': 'CCAT'
      },
      'categories': [
        'promoter'
      ]
    },
    'PRO+5U': {
      'zone': [
        'promoter'
      ],
      'overhangs': {
        'left': 'GGAG',
        'right': 'AATG'
      },
      'categories': [
        'promoter'
      ]
    },
    '5Uf': {
      'zone': [
        'promoter'
      ],
      'overhangs': {
        'left': 'TACT',
        'right': 'CCAT'
      },
      'categories': [
        '5-3 UTR'
      ]
    },
    '5U': {
      'zone': [
        'promoter'
      ],
      'overhangs': {
        'left': 'TACT',
        'right': 'AATG'
      },
      'categories': [
        '5-3 UTR'
      ]
    },
    '5U+NT1': {
      'zone': [
        'promoter'
      ],
      'overhangs': {
        'left': 'TACT',
        'right': 'AATG'
      },
      'categories': [
        '5-3 UTR'
      ]
    },
    'NT1': {
      'zone': [
        'promoter'
      ],
      'overhangs': {
        'left': 'CCAT',
        'right': 'AATG'
      },
      'categories': [
        'protein tag'
      ]
    },
    'CDS1': {
      'zone': [
        'cds'
      ],
      'overhangs': {
        'left': 'AATG',
        'right': 'TTCG'
      },
      'categories': [
        'CDS'
      ]
    },
    'CDS1ns': {
      'zone': [
        'cds'
      ],
      'overhangs': {
        'left': 'AATG',
        'right': 'TTCG'
      },
      'categories': [
        'CDSns'
      ]
    },
    'NT2': {
      'zone': [
        'cds'
      ],
      'overhangs': {
        'left': 'AATG',
        'right': 'AGGT'
      },
      'categories': [
        'protein tag'
      ]
    },
    'SP': {
      'zone': [
        'cds'
      ],
      'overhangs': {
        'left': 'AATG',
        'right': 'AGGT'
      },
      'categories': [
        'signal peptide'
      ]
    },
    'CDS2ns': {
      'zone': [
        'cds'
      ],
      'overhangs': {
        'left': 'AGGT',
        'right': 'TTCG'
      },
      'categories': [
        'CDSns'
      ]
    },
    'CDS2': {
      'zone': [
        'cds'
      ],
      'overhangs': {
        'left': 'AGGT',
        'right': 'TTCG'
      },
      'categories': [
        'CDS'
      ]
    },
    'CT': {
      'zone': [
        'cds'
      ],
      'overhangs': {
        'left': 'TTCG',
        'right': 'GCTT'
      },
      'categories': [
        'protein tag'
      ]
    },
    '3U': {
      'zone': [
        'terminator'
      ],
      'overhangs': {
        'left': 'GCTT',
        'right': 'GGTA'
      },
      'categories': [
        '3-5 UTR'
      ]
    },
    'TER': {
      'zone': [
        'terminator'
      ],
      'overhangs': {
        'left': 'TGCT',
        'right': 'GGTA'
      },
      'categories': [
        'terminator'
      ]
    },
    '3U+TER': {
      'zone': [
        'terminator'
      ],
      'overhangs': {
        'left': 'GGTA',
        'right': 'CGCT'
      },
      'categories': [
        'terminator'
      ]
    },
    'BACKBONE': {
      'zone': [
        'backbone'
      ],
      'overhangs': {
        'left': 'CGTC',
        'right': 'GGAG'
      },
      'categories': [
        'backbone'
      ]
    }
  },
  slotOptions: {
    'PRO': {
      enabled: o => !o.singlePartPromoterUTR,
      locked: o => true,
      categoriesEnabled: o => ({
        'promoter': true,
      })
    },
    'PRO+5Uf': {
      enabled: o => o.singlePartPromoterUTR && o.nterminal,
      locked: o => true,
      categoriesEnabled: o => ({
        'promoter': true,
      })
    },
    'PRO+5U': {
      enabled: o => o.singlePartPromoterUTR && (!o.signalPeptide || !o.nterminal),
      locked: o => true,
      categoriesEnabled: o => ({
        'promoter': true,
      })
    },
    '5Uf': {
      enabled: o => !o.singlePartPromoterUTR && !o.singlePartUtrNT1 && o.nterminal,
      locked: true,
      categoriesEnabled: o => ({
        '5-3 UTR': true
      })
    },
    '5U': {
      enabled: o => !o.singlePartPromoterUTR && !(o.nterminal && !o.singlePartUtrNT1) && (!o.nterminal || !o.signalPeptide),
      locked: true,
      categoriesEnabled: o => ({
        '5-3 UTR': true,
      })
    },
    '5U+NT1': {
      enabled: o => !o.singlePartPromoterUTR && o.nterminal && o.singlePartUtrNT1,
      locked: true,
      categoriesEnabled: o => ({
        '5-3 UTR': true,
      })
    },
    'NT1': {
      enabled: o => o.nterminal && !o.singlePartUtrNT1 && o.signalPeptide,
      locked: true,
      categoriesEnabled: o => ({
        'protein tag': true
      })
    },
    'NT2': {
      enabled: o => !o.signalPeptide && o.nterminal && !o.singlePartUtrNT1,
      locked: true,
      categoriesEnabled: o => ({
        'protein tag': true,
      })
    },
    'SP': {
      enabled: o => o.signalPeptide,
      locked: true,
      categoriesEnabled: o => ({
        'signal peptide': true
      })
    },
    'CDS1': {
      enabled: o => !o.cterminal && !o.signalPeptide && !(!o.signalPeptide && o.nterminal && !o.singlePartUtrNT1),
      locked: true,
      categoriesEnabled: o => ({
        'CDS': true
      })
    },
    'CDS1ns': {
      enabled: o => o.cterminal && !o.signalPeptide && !(!o.signalPeptide && o.nterminal && !o.singlePartUtrNT1),
      locked: true,
      categoriesEnabled: o => ({
        'CDSns': true
      })
    },
    'CDS2': {
      enabled: o => !o.cterminal && ((!o.signalPeptide && o.nterminal && !o.singlePartUtrNT1) || o.signalPeptide),
      locked: true,
      categoriesEnabled: o => ({
        'CDS': true
      })
    },
    'CDS2ns': {
      enabled: o => o.cterminal && ((!o.signalPeptide && o.nterminal && !o.singlePartUtrNT1) || o.signalPeptide),
      locked: true,
      categoriesEnabled: o => ({
        'CDSns': true
      })
    },
    'CT': {
      enabled: o => o.cterminal,
      locked: true,
      categoriesEnabled: o => ({
        'protein tag': true
      })
    },
    '3U': {
      enabled: o => !o.singlePartUTRTerminator,
      locked: false,
      categoriesEnabled: o => ({
        '3-5 UTR': true
      })
    },
    'TER': {
      enabled: o => !o.singlePartUTRTerminator,
      locked: true,
      categoriesEnabled: o => ({
        'terminator': true
      })
    },
    '3U+TER': {
      enabled: o => o.singlePartUTRTerminator,
      locked: true,
      categoriesEnabled: o => ({
        'terminator': true
      })
    },
    'BACKBONE': {
      enabled: o => true,
      locked: true,
      categoriesEnabled: o => ({
        'backbone': true
      })
    }
  }
}
