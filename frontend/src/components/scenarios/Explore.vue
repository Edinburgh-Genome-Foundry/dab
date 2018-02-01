<template lang="pug">
.page

  h1 Explore the repository

  h3 Select an assembly standard

  templates-tree(:singleRoot='false' @click='function (name) {templateName = name}')

  //- el-select(v-model='templateName' placeholder="Select a standard")
  //-     el-option(v-for='o, name in $store.state.constructTemplates', :label='name', :value='name', :key='name')

  el-tabs.main-menu(v-if='templateName')
    el-tab-pane
      span(slot='label') Parts
      h2.center <b>{{currentTemplate.name}}</b><br /> parts in the repository
      h3 Select a position on the schema:
      .minischema
        minipartslot(v-for='slotName in slotNames', :key='slotName',
                     :size='16',
                     :color='currentTemplate.zoneColors[slots[slotName].zone]',
                     :zoneIndex='Object.keys(currentTemplate.zoneColors).indexOf(slots[slotName].zone[0])',
                     :categories='slots[slotName].categories', :slotName='slotName', @click='selectCategory')

    el-tab-pane
      span(slot='label') Overhangs
      h2.center <b>{{currentTemplate.name}}</b><br /> overhangs information
      el-card(:header="templateName + ' overhangs'").overhangs-list
        .overhangs-schema.center
          .part-and-overhangs(v-for='slotName in currentTemplate.slotNames', :key='slotName')
            minipartslot.overhang(:size='13', :categories="['overhang']", :slotName='currentTemplate.slotInfos[slotName].overhangs.left')
            minipartslot(:size='13', :categories='[currentTemplate.slotInfos[slotName].categories[0]]', :slotName='slotName')
            minipartslot.overhang(:size='13', :categories="['overhang']", :slotName='currentTemplate.slotInfos[slotName].overhangs.right')


      el-card.overhangs-list(:header="templateName + ': alphabetical overhangs list'")
        .overhang-seq(v-for='seq in currentTemplate.overhangs', :key='seq') {{seq}}&nbsp

      el-card(header='Overhangs compatible with this standard:').overhangs-list
        .overhang-seq(v-for='seq in currentTemplate.compatibleOverhangs', :key='seq') {{seq}}&nbsp
      el-tab-pane
        span(slot='label') Infos


  //- h3 Select a position:
  //- .minischema
  //-   minipartslot(v-for='slotName in slotNames', :key='slotName',
  //-                :size='16',
  //-                :color='currentTemplate.zoneColors[slots[slotName].zone]',
  //-                :zoneIndex='Object.keys(currentTemplate.zoneColors).indexOf(slots[slotName].zone[0])',
  //-                :categories='slots[slotName].categories', :slotName='slotName', @click='selectCategory')


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
          a.database-link(:href="'https://emmadb.genomefoundry.org/ICE-REST/rest/entries/genbank/' + part.dbId") <i class="el-icon-document"></i> genbank
          a.database-link(:href="'https://emmadb.genomefoundry.org/entry/' + part.dbId") <i class="el-icon-share"></i> ICE page

        p(v-if='part.dbDescription') <b>Description:</b> {{part.dbDescription}}
    el-alert(v-if='queryError', type='error', title='', show-icon) {{queryError.body.error}}
</template>

<script>
import learnmore from '../../components/widgets/LearnMore'
import minipartslot from '../Parts/MiniPartSlot'

var infos = {
  title: 'Explore the database',
  navbarTitle: 'Explore the database',
  path: 'explore',
  description: '',
  icon: require('assets/images/explore.svg')
}

export default {
  data: function () {
    return {
      templateName: null,
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
      console.log(this.$store.state.settings.ICE_REPO_API_URL + 'entries/filterlist', 'BLAAAAAAA')
      this.$http.post(
        this.$store.state.settings.ICE_REPO_API_URL + 'entries/filterlist',
        {
          filter: JSON.stringify({
            type: category,
            position: slot,
          }),
          fields: '{"matchScore","dbDescription","dbName","dbId","type","position"}',
          sessionIdForm: this.$cookie.get('sessionId'),
          userIdForm: this.$cookie.get('userId'),
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
    },
    selectTemplate (name) {
      this.templateName = name
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
    },
    currentTemplate () {
      return this.$store.state.constructTemplates[this.templateName]
    },
    slots () {
      return this.currentTemplate.slotInfos
    },
    slotNames () {
      return this.currentTemplate.slotNames
    }
  },
}
</script>

<style lang='scss' scoped>
.page {
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
        margin-left: 15px;
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

.overhangs-schema {
  margin-top: 2em;
  .part-and-overhangs {
    display: inline-block;
    margin-right: 3em;
    margin-bottom: 0;
    margin-top: 0;
  .slot-name {
    color: #999
  }
  .mini-part-slot {
    height: 3em;
    font-family: 'Inconsolata', Courier;
  }
  .overhang .slot-name {
      color: #000;
    }
  }
}
.overhangs-list {
  width: 80%;
  margin-left: 10%;
  margin-bottom: 1.5em;
  margin-top: 1.5em;
  .overhang-seq {
    display: inline-block;
    margin-right: 1em;
    font-family: 'Inconsolata';
  }
}

.main-menu {
  margin-top: 3em;
}
</style>
