<template lang="pug">

el-container.parts-selection-menu
  el-aside(style='width: 400px;')
    .side-menu-container(style="width: 400px;")
      el-menu
        .div(style='padding: 4px')
          el-input(prefix-icon='el-icon-search' v-model='searchQuery')
      
        el-submenu(index='2a')
          template(slot='title')
            i.el-icon-location-outline
            span Location
          el-form
            el-form-item
              .div(v-for='i, possiblePosition in selectedPartPositions', :key='possiblePosition')
                el-checkbox(v-model='selectedPartPositions[possiblePosition]')
                span(style='margin-right: 1em; margin-left: 1em;') {{ possiblePosition.split('__')[0] }}
                span(style="color: #a0a0f0; font-weight: bold") {{ possiblePosition.split('__')[1] }}
                br

        el-submenu(index='3a')
          template(slot='title')
            i.el-icon-share
            span Parts sources
          el-form
            el-form-item
              el-checkbox(v-model='partSources.user')
              icon.checkbox-icon(name='user')
              span Your parts
              br
              el-checkbox(v-model='partSources.community')
              icon.checkbox-icon(name='users')
              span Shared parts
              br
              el-checkbox(v-model='partSources.standard')
              icon.checkbox-icon(name='certificate')
              span Standard parts

        el-submenu(index='4a')
          template(slot='title')
            i.el-icon-tickets
            span Parts categories
          el-form
            el-form-item
              //- el-checkbox(v-model='partSources.user')
              //- icon.checkbox-icon(name='user')
              //- span Your parts
              //- br
              //- el-checkbox(v-model='partSources.community')
              //- icon.checkbox-icon(name='users')
              //- span Shared parts
              //- br
              //- el-checkbox(v-model='partSources.standard')
              //- icon.checkbox-icon(name='certificate')
              //- span Standard parts
          
  el-main(style='width: 100%;')
    el-tabs(v-model="activeTab")
      el-tab-pane(name='available')
        span(slot='label') #[i.el-icon-search] Available parts
        el-table(:data="filteredParts" style="width: 100%", height="60vh" v-loading="dataLoading")
          el-table-column(type="expand")
            template(slot-scope="props")
              p Description: {{ props.row.shortDescription }}
              p
                el-button(@click='downloadGenbank(scope.row.id, scope.row.name)',
                          icon="el-icon-tickets" circle)
                span Record
          el-table-column(label="Type" width=100)
            template(slot-scope="scope")
              minipart-slot(:categories="[scope.row.category]" v-if='scope.row.category')
          el-table-column(prop="name" label="Name")
          
          el-table-column(label="Creator")
            template(slot-scope="scope")
              span(style='color: #a0a0f0;')
                icon.checkbox-icon(name='certificate' v-if="scope.row.owner === 'Standard Parts'")
                icon.checkbox-icon(name='user' v-else)
              span(style="margin-left: 5px") {{ scope.row.owner }}
              
          el-table-column(label="" width=100)
            template(slot-scope="scope")
              el-button(v-if='selectedParts.some(p => p.id === scope.row.id)'
                @click='unselectPart(scope.row.id)'
                icon="el-icon-check" circle)
              el-button(v-else @click='selectPart(scope.row)'
                        icon="el-icon-plus" circle)
      
      el-tab-pane(name='selected')
        span(slot='label') #[i.el-icon-check] Selected parts
        el-table(:data="selectedParts" style="width: 100%")
          el-table-column(type="expand")
            template(slot-scope="props")
              p Description: {{ props.row.shortDescription }}
              p
                el-button(@click='downloadGenbank(scope.row.id, scope.row.name)',
                          icon="el-icon-tickets" circle)
                span Record
          el-table-column(label="Type" width=100)
            template(slot-scope="scope")
              minipart-slot(:categories="[scope.row.category]" v-if='scope.row.category')
          el-table-column(prop="name" label="Name")
          
          el-table-column(label="Creator")
            template(slot-scope="scope")
              span(style='color: #a0a0f0;')
                icon.checkbox-icon(name='certificate' v-if="scope.row.owner === 'Standard Parts'")
                icon.checkbox-icon(name='user' v-else)
              span(style="margin-left: 5px") {{ scope.row.owner }}
          el-table-column(label="" width=100)
            template(slot-scope="scope")
              el-button(icon="el-icon-delete" circle
                        @click='unselectPart(scope.row.id)')
    //- part-card(v-for="part in filteredParts", :key='part.id', :part='part')
    //- p {{filteredParts}}
</template>

<script>
import tools from '../../tools'
import PartCard from './PartCard'
import MiniPartSlot from './MiniPartSlot'
export default {
  props: {
    value: {default: () => ([])},
    templateName: {default: 'Cyanogate-L1-knockin'},
    position: {default: 'Cyanogate-L1-knockin__DOWN'}
  },
  data: function () {
    var possiblePartPositions = [this.position]
    var self = this
    var selectedPartPositions = {}
    var loadedParts = {}
    possiblePartPositions.map(function (p) {
      selectedPartPositions[p] = (p === self.position)
      loadedParts[p] = false
    })
    return {
      selectedParts: this.value,
      activeTab: this.value.length ? 'selected' : 'available',
      searchQuery: '',
      dataLoading: false,
      partSources: {
        user: true,
        community: true,
        standard: true
      },
      selectedPartPositions,
      loadedParts,
      selectedCategories: {}
    }
  },
  methods: {

    async getAllParts () {
      this.dataLoading = true
      for (var partPosition of Object.keys(this.selectedPartPositions)) {
        if (!this.loadedParts[partPosition]) {
          var positionParts = await this.getPartsAtPosition(partPosition)
          for (var part of positionParts) {
            part.category = this.getPartCategory(part)
          }
          this.$set(this.loadedParts, partPosition, positionParts)
        }
      }
      this.dataLoading = false
    },
    async getPartsAtPosition (partPosition) {
      return this.$iceClient.findPartsWithParameterValue('position', 'POSITION_' + partPosition)
    },
    getPartCategory (part) {
      for (var p of part.parameters) {
        if ((p.name === 'category') && p.value.startsWith('CATEGORY_')) {
          return p.value.substring(9, p.value.length)
        }
      }
      return null
    },
    async downloadGenbank (partId, partName) {
      var sequence = await this.$iceClient.getSequence(partId, 'genbank')
      this.$download(sequence, partName + '.gb', 'application/biosequence.genbank')
    },
    unselectPart (partId) {
      this.selectedParts = this.selectedParts.filter(p => !(p.id === partId))
    },
    selectPart (part) {
      console.log(part)
      this.selectedParts = [...this.selectedParts, part]
    }
  },
  computed: {
    filteredParts () {
      var self = this
      var allLoadedParts = []
      for (var [position, parts] of Object.entries(this.loadedParts)) {
        if (this.selectedPartPositions[position]) {
          allLoadedParts.push(...parts)
        }
      }
      allLoadedParts = tools.uniquify(allLoadedParts, e => e.id)
      console.log(allLoadedParts)
      return allLoadedParts.filter(function (e) {
        if (e.category && (self.selectedCategories[e.category])) {
          return false
        }
        if (e['owner'] === 'Standard Parts') {
          if (!self.partSources.standard) {
            return false
          }
        } else if (e['ownerId'] === self.$store.state.user.id) {
          if (!self.partSources.user) {
            return false
          }
        } else if (!self.partSources.community) {
          return false
        }
        return true
      })
    },

  },
  watch: {
    selectedPartPositions: {
      deep: true,
      handler (val) {
        this.getAllParts()
      }
    },
    selectedParts: {
      deep: true,
      handler (val) {
        this.$emit('input', val)
      }
    }
  },
  mounted () {
    this.getAllParts()
  },
  components: {
    'part-card': PartCard,
    'minipart-slot': MiniPartSlot
  }
}
</script>

<style lang='scss' scoped>
.parts-selection-menu {
  .checkbox-icon {
    display: inline-block;
    margin-right: 1em;
    margin-left: 1em;
    margin-bottom: -0.2em;
    
  }
}
/deep/.part-card {
  width: 80%;
  margin-left: 10%;
  margin-bottom: 2em;
  &.selected {
    .el-card__header {
      background-color: #8052e0;
    }
  }
  .checkbox-icon {

  }
}

.icon-panel
{
  text-align: center;
  cursor: pointer;
}

.emma-icon
{
  width: 32px;
  height: 32px;
}

</style>
