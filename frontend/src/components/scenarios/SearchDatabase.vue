<template lang="pug">
.search-the-database

  h1 Explore the database

  h3 Select a position:
  .minischema
    minipartslot(v-for='slotName in slotNames', :zone='slots[slotName].zone', :key='slotName',
                 :size='16',
                 :categories='slots[slotName].categories', :slotName='slotName', @click='selectCategory')


  .parts-viewer(v-if='selectedSlotCategory')

    h3.
       Available <i class='selected-category-txt'>{{selectedSlotCategory.category}}</i>
       parts at position {{selectedSlotCategory.slot}}:
    .loading-icon(v-if='loading')
      img(src='/static/loading_plasmid.svg')

    el-input.search-box(v-model='search', placeholder='Enter a search term' v-if='foundParts.length > 4')
    .cards(v-if='foundParts.length')

      el-card.part-card(v-for='part in selectedParts', :key='part.dbName')
        .part_header(slot='header')
          p.part-name {{part.dbName}}
          a.database-link(:href="'https://ice.dev.genomefoundry.org/ICE-REST/rest/entries/genbank/' + part.dbId") <i class="el-icon-document"></i> genbank
          a.database-link(:href="'https://ice.dev.genomefoundry.org/entry/' + part.dbId") <i class="el-icon-share"></i> view in database

        p(v-if='part.dbDescription') <b>Description:</b> {{part.dbDescription}}
    el-alert(v-if='queryError', type='error', title='', show-icon) {{queryError.body.error}}
</template>

<script>
import learnmore from '../../components/widgets/LearnMore'
import minipartslot from '../SequenceDesigner/MiniPartSlot'
import emma from '../SequenceDesigner/EMMA'

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
      slots: emma.slotInfos,
      slotNames: emma.slotNames,
      selectedSlotCategory: null,
      foundParts: [],
      loading: false,
      queryError: null,
      search: ''
    }
  },
  components: {
    learnmore,
    minipartslot
  },
  infos: infos,
  methods: {
    selectCategory: function (slot, category) {
      this.selectedSlotCategory = {'slot': slot, 'category': category}
      this.loading = true
      this.search = ''
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
  },
  computed: {
    selectedParts: function () {
      if (this.search === '') {
        return this.foundParts
      }
      var self = this
      return self.foundParts.filter(function (part) {
        return [part.dbName, part.dbDescription].some(function (txt) {
          return txt.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.search-the-database {
  .parts-viewer {
    .loading-icon {
      margin-top: 2em;
      margin-left: auto;
      text-align: center;
      img {
        width: 6em;
        height: 6em;
        opacity: 0.8;
      }

    }
    .selected-category-txt {
      color: #1a5b90
    }
  }
}

</style>

<style lang='scss'>
.parts-viewer {
  .search-box {
    width: 80%;
    margin-left: 10%;
    margin-bottom: 2em;
  }
  .cards {
    max-height: 40em;
    overflow-y: auto;
  }
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
