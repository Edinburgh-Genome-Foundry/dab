<template lang="pug">
.search-the-database
  h1 Explore the database
  .schema
    .minislot(v-for='slot in slots', :class="'zone-' + slot.zone")
      .icon(v-for='category in slot.categories', :style="backgroundImageStyle(category)")
      //- .category-txt(v-for='category in slot.categories') {{category}}
</template>

<script>
import learnmore from '../../components/widgets/LearnMore'

var infos = {
  title: 'Search the database',
  navbarTitle: 'Search the database',
  path: 'search-the-database',
  description: '',
  icon: require('assets/images/search.svg')
}

export default {
  data: function () {
    return {
      slots: {
        '1': {
          zone: ['none'],
          categories: [
            '5-3 homology arm',
            '5-3 ITR',
            '5-3 LTR',
            'recombinase recognition sequence'
          ]
        },
        '2': {
          zone: ['none'],
          categories: [
            'insulator',
            'recombinase recognition sequence'
          ]
        },
        '3': {
          zone: ['tuA'],
          categories: [
            'promoter'
          ]
        },
        '4': {
          zone: ['tuA'],
          categories: [
            'RNA stability sequence',
            'DNA binding element',
          ]
        },
        '5': {
          zone: ['tuA'],
          categories: [
            '5-3 UTR'
          ]
        },
        '6': {
          zone: ['tuA'],
          categories: [
            'kozak-ATG',
            'protein tag'
          ]
        },
        '7': {
          zone: ['tuA'],
          categories: [
            'CDS',
          ]
        },
        '8': {
          zone: ['tuA'],
          categories: [
            'p2A',
            'peptide linker'
          ]
        },
        '8a': {
          zone: ['tuA'],
          categories: [
            'protein tag'
          ]
        },
        '8b': {
          zone: ['tuA'],
          categories: [
            'IRES'
          ]
        },
        '9': {
          zone: ['tuA'],
          categories: [
            'CDS'
          ]
        },
        '10': {
          zone: ['tuA'],
          categories: [
            '5-3 UTR',
            '5-3 LTR'
          ]
        },
        '11': {
          zone: ['tuA'],
          categories: [
            'terminator'
          ]
        },
        '12': {
          categories: [
            'insulator'
          ]
        },
        '13': {
          categories: [
            'recombinase recognition site'
          ]
        },
        '14': {
          zone: ['selection-marker'],
          categories: [
            'promoter'
          ]
        },
        '15': {
          zone: ['selection-marker'],
          categories: [
            'CDS'
          ]
        },
        '16': {
          zone: ['selection-marker'],
          categories: [
            'terminator'
          ]
        },
        '17': {
          zone: ['none'],
          categories: [
            'recombinase recognition site'
          ]
        },
        '18': {
          zone: ['tuB'],
          categories: [
            'promoter'
          ]
        },
        '19': {
          zone: ['tuB'],
          categories: [
            'CDS'
          ]
        },
        '20': {
          zone: ['tuB'],
          categories: [
            'p2A',
            'peptide linker',
            'IRES',
            'protein tag',
          ]
        },
        '21': {
          categories: [
            'CDS'
          ]
        },
        '22': {
          zone: ['tuB'],
          categories: [
            'terminator'
          ]
        },
        '23': {
          zone: ['none'],
          categories: [
            'insulator'
          ]
        },
        '24': {
          zone: ['none'],
          categories: [
            '5-3 homology arm',
            'recombinase recognition sequence'
          ]
        },
        '25': {
          zone: ['none'],
          categories: [
            'origin of replication'
          ]
        }
      }
    }
  },
  components: {
    learnmore,
  },
  infos: infos,
  methods: {
    backgroundImageStyle: function (category) {
      return {'background-image': 'url(/static/sbol-icons/' + category + '.svg)'}
    },
    handleSuccess: function (evt) {
      console.log(evt)
    },
    validateForm: function () {
      var errors = []
      if (this.form.possibleEnzymes.length < 2) {
        errors.push('Provide at least two different restriction enzymes.')
      }
      if (this.form.files.possibleEnzymes === 0) {
        errors.push('Provide at least one construct file')
      }
      return errors
    }
  }
}
</script>

<style lang='scss' scoped>
.search-the-database {
  .minislot {
    display: inline-block;
    border: 2px solid black;
    height: 120px;
    width: 55px;
    vertical-align: top;
    .icon {
      background-size: auto 80%;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }
  }
}
h4.formlabel {
  text-align: center;
  text-transform: uppercase;
  margin-top: 40px
}

.form {
  margin: 50px auto;
  max-width: 500px;
}

.title-img {
  height:80px;
  margin-top: -20px;
  margin-bottom: 20px;

}

.el-checkbox {
  font-weight: normal;
}


.el-select {
  width: 100%
}

.el-input-number.inline {
  margin-bottom: -9px;
  margin-left: 10px;
  width: 130px;
}

p.loadData {
  font-size: 0.8em;
  margin-bottom: 0;
  cursor: pointer;
}

.bands-range {
  .el-slider {
    display: inline-block;
    width: 150px;
    margin-bottom: -12px;
    margin-left: 10px;
  }
}


</style>
