<template lang="pug">
.search-the-database

  h1 Explore the database

  .schema
    .minislot(v-for='slotName in slotNames', :class="'zone-' + slots[slotName].zone", :key='slotName')
      .slot-name {{slotName}}
      .icons
        el-tooltip(v-for='category in slots[slotName].categories', :key='category',
                   effect="light", :content="category", :transition='null',
                   :enterable='false', transition='el-fade-in')
          .icon(:style="backgroundImageStyle(category)",
                :key='category', @click='selectCategory(slotName, category)')

  .parts-viewer(v-if='selectedSlotCategory')
    h3.
       Available <i class='selected-category-txt'>{{selectedSlotCategory.category}}</i>
       parts at position {{selectedSlotCategory.slot}}:

    .loading-icon(v-if='loading' v-loading="loading")

    el-card.part-card(v-for='part in foundParts')
      .part_header(slot='header')
        p.part-name {{part.dbName}}
        a.database-link(:href="'https://ice.dev.genomefoundry.org/entry/' + part.dbId") <i class="el-icon-share"></i> view in database

      p(v-if='part.dbDescription') <b>Description:</b> {{part.dbDescription}}
    el-alert(v-if='queryError', type='error' show-icon) {{queryError.body.error}}
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
      slotNames: '1 2 3 4 5 6 7 8 8a 8b 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25'.split(' '),
      selectedSlotCategory: null,
      foundParts: [],
      loading: false,
      queryError: null,
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
          zone: ['none'],
          categories: [
            'insulator'
          ]
        },
        '13': {
          zone: ['none'],
          categories: [
            'recombinase recognition sequence'
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
            'recombinase recognition sequence'
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
          zone: ['tuB'],
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
    selectCategory: function (slot, category) {
      this.selectedSlotCategory = {'slot': slot, 'category': category}
      this.loading = true
      this.queryError = null
      this.foundParts = []
      this.$http.post(
        '//ice.dev.genomefoundry.org/ICE-REST/rest/entries/filterlist',
        {
          filter: JSON.stringify({
            type: category,
            position: slot,
          }),
          fields: '{"matchScore","dbDescription","dbName","dbId","type","position"}',
        },
        {emulateJSON: true},
      ).then(function (response) {
        this.loading = false
        console.log(response)
        if (response.status === 200) {
          this.foundParts = response.body.data
        }
      }).catch(function (response) {
        this.queryError = response
        this.loading = false
      })
    },
    backgroundImageStyle: function (category) {
      return {
        'background-image': 'url(/static/sbol-icons/' + category.split(' ').join('-') + '.svg)'
      }
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
    // border: 1px solid black;
    height: 120px;
    width: 60px;
    vertical-align: top;
    margin-bottom: 2em;
    &.zone-tuA { background-color: #f8f9fe}
    &.zone-tuB { background-color: #fff7f7}
    &.zone-selection-marker { background-color: #fef8fe}
    .slot-name {
      font-weight: bold;
      text-align: center;
      margin-bottom: 1em;
    }
    .el-popover {
      .icon {
        background-size: auto 150%;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        width: 100%;
        height:30px;
        margin-top: -8px;
        &:not(:first-child) {
          width: 60%;
          margin-left: 20%;
        }
      }
    }
    .icon {
      background-size: auto 150%;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      width: 100%;
      height:30px;
      margin-top: -8px;
      &:not(:first-child) {
        width: 60%;
        margin-left: 20%;
      }
    }
  }
  .parts-viewer {
    .loading-icon {
      margin-top: 2em;
    }
    .selected-category-txt {
      color: #1a5b90
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

<style lang='scss'>
.parts-viewer {
  .part-card {
    width: 80%;
    margin-left: 10%;
    margin-bottom: 2em;
    .el-card__header {
      padding: 10px;
      font-weight: bold;
      color: white;
      background-color: #52a2e0;
      p.part-name {
        display: inline-block;
        margin-right: 2em;
        margin:0;
        // width: 200px;
      }
      a.database-link {
        color: white;
        text-decoration: none;
        font-weight: normal;
        text-align: right;
        // margin-top: 5px;
        float: right;
      }
    }
    .el-card__body {
      padding-top: 5px;
      padding-bottom: 5px;
      p {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }
    }
  }
}

</style>
