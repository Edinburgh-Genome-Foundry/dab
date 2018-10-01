<template lang="pug">
.part-slot(:class="[{inactive: !active}, 'zone-' + zoneIndex]")

  .slot-name {{slotName}}

  // User-inactivated part
  transition(name='part-pop1' enter-active-class='animated flipInY')
    .active-display(v-if='active')
      .controls.construct-hover-only
        span(@click="toggleUserEnabled(false)", v-if='!optionsLocked')
          icon(name='trash-o')
        span(@click="dialogVisible = true")
          icon.animated.infinite.tada(name='pencil' v-if='selectedParts.length === 0')
          icon(name='pencil' v-else)
      .part-label(v-if='selectedParts.length > 0' @click="dialogVisible = true")
        span {{selectedParts[0].name}}
        br
        el-tooltip.tooltip(v-if='andOthers.length > 0',
                           :content="partsTooltip", effect="light", :transition='null',
                           :enterable='false', transition='el-fade-in')
          .and-others {{andOthers}}
      .icons(:style="{'background-color': color}")
        el-tooltip.tooltip(v-for="value, category in categoriesEnabled", v-if='value', :key='category',
                     effect="light", :content="category", :transition='null',
                     :enterable='false', transition='el-fade-in')
          .icon(:style="backgroundImageStyle(category)", @click="dialogVisible = true")
      el-icon.center.delete(icon='delete', v-if='!optionsLocked',
                       size='small', @click="$emit('userDisable', slotName)")
  // Active part
  transition(name='part-pop2' enter-active-class='animated rubberBand')
    .inactive-display(v-if='!active' @click="toggleUserEnabled(true)")
      .controls.construct-hover-only
        icon(name='plus')
      .icons(:style="{'background-color': color}")
        .icon.active(v-bind:style="backgroundImageStyle('none')")
        el-tooltip.tooltip(v-for="value, category in categoriesEnabled", v-if='value', :key='category',
                     effect="light", :content="category", :transition='null',
                     :enterable='false', transition='el-fade-in')
          .icon.inactive(:style="backgroundImageStyle(category)").construct-hover-only

  // Part entry selection
  el-dialog.part-selector(:visible.sync="dialogVisible", width='95%')
    part-selection-menu(v-model='selectedParts', :position='fullSlotName')
    //- .show-selected
    //-   el-button.center(icon='arrow-right' @click='function () {showSelected = !showSelected}' v-if='!showSelected' size='small') Show selected ({{selectedParts.length}})
    //-   el-button.center(icon='arrow-down' @click='function () {showSelected = !showSelected}' v-if='showSelected' size='small') Hide selected ({{selectedParts.length}})

    //-   .parts(v-if='showSelected')
    //-     partcard(v-for='part in selectedParts', :key='part.dbName', :selected='true', :part='part',
    //-              @deselectPart='deselectPart')
    //- el-input.search-box(v-model='search', placeholder='Enter a search term' v-if='categoryFilteredParts.length > 4')
    //- .parts
    //-   partcard(v-for='part in searchFilteredParts', :key='part.dbName', :selected='partIsSelected(part)', :part='part',
    //-           @selectPart='selectPart', @deselectPart='deselectPart')
</template>

<script>
import partcard from './PartCard'
import { mapMutations } from 'vuex'
import PartSelectionMenu from './PartSelectionMenu'

export default {
  props: {
    slotName: {default: '1'}, // The slot is of the form '1', '2', '8A', '8B', etc.
    optionsLocked: {default: false}, // Locked means you can't add or remove a block
    userEnabled: {default: true}, // If not active, will be smaller, greyer, no inputs
    categoriesEnabled: {default: () => ({})}, // categories of parts filtered in the dropdown
    zoneIndex: {default: 'none'},
    color: {default: 'none'},
    construct: {default: null},
    noConnection: {default: false}
  },
  data: function () {
    console.log('CONSTRUCT', this.construct, this.$store.state)
    var fullSlotName = this.$store.state.constructTemplates[this.construct.templateName].name + '__' + this.slotName
    console.log(fullSlotName)
    return {
      allParts: [],
      selectVisible: false,
      dialogVisible: false,
      search: '',
      fullSlotName,
      showSelected: false
    }
  },
  components: {
    partcard,
    'part-selection-menu': PartSelectionMenu
  },
  computed: {
    selectedParts: {
      get () {
        return this.construct.selectedParts[this.slotName]
      },
      set (value) {
        this.updateSelectedParts({
          construct: this.construct,
          slotName: this.slotName,
          selectedParts: value
        })
        console.log('DOING SOME')
      }
    },
    active: function () {
      return (this.optionsLocked || this.userEnabled)
    },
    andOthers: function () {
      var others = this.selectedParts.length - 1
      if (others > 0) {
        return ' and ' + others + ' other' + ((others > 1) ? 's' : '')
      } else {
        return ''
      }
    },
    partsTooltip () {
      return this.selectedParts.map(part => part.name).join(' , ')
    }
  },
  mounted: function () {
  },
  methods: {
    ...mapMutations([
      'updateUserEnabled',
      'updateSelectedParts',

    ]),
    toggleUserEnabled (bool) {
      this.updateUserEnabled({
        construct: this.construct,
        slotName: this.slotName,
        bool: bool
      })
    },
    backgroundImageStyle: function (category) {
      return {
        'background-image': `url(/static/sbol-icons/${category.split(' ').join('-')}.svg)`
      }
    },
    selectPart: function (part) {
      if (!this.partIsSelected(part)) {
        this.selectedParts.push(part)
      }
    },
    deselectPart: function (part) {
      var index = this.selectedParts.indexOf(part)
      this.selectedParts.splice(index, 1)
    },
    partIsSelected: function (part) {
      return this.selectedParts.some(function (p) { return p === part })
    }
  }
}
</script>
<style lang='scss' scoped>

.part-slot {
  &.inactive {
    max-width:2em;
    min-width: 1.5em;
    .slot-name {
      opacity: 0
    }
    .controls .fa-icon {
      position: relative;
      display: inline-block;
      color: #bbb;
      top: 5em;
      cursor: pointer;
      z-index: 1000;
    }

  }
  .slot-name {
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
    color: #ddd;
    height: 10px;
    padding-left: 1em;
    padding-right: 1em;
  }
  .controls {
    text-align: center;
    .fa-icon {
      font-size: 0.9em;
      height: 1em;
      margin-left: 0.2em;
      color: #888;
      cursor: pointer;
    }
    margin-bottom: 1em;
  }
  .part-label {
    position: relative;
    top: -0.6em;
    font-size: 0.8em;
    text-align: center;
    height: 0;
    padding-left: 1em;
    padding-right: 1em;
    cursor: pointer;
    .and-others {
      color: #888;
    }

  }
  height:10em;
  display: inline-block;
  margin-bottom: 2em;
  margin-top: 1em;
  min-width: 5em;
  max-width: 10em;

  vertical-align: text-top;

  .icons {
    position: relative;
    height: 4em;
    width: 100%;
    top: 2.1em;
    cursor: pointer;
    .icon {
        background-size: auto 130%;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        width: 100%;
        height: 2.8em;
        margin-bottom: -0.7em;
        &:not(:first-child) {
          width: 70%;
          margin-left: 15%;
        }
      &.inactive{
        height: 1.2em;
        margin-bottom: -0.3em;
        margin-top:0px;
        filter: grayscale(100%);
      }
    }
  }
  .part-selector {
    .parts {
      max-height: 40em;
      overflow-y: auto;
    }
    .search-box {
      width: 80%;
      margin: 0 10% 2em;
    }
    .show-selected {

      margin-top: -4em;
      margin-bottom: 4em;

      /deep/.el-button {
        font-size: 0.7em;
        border: none;
        font-size: 1.2em;
      }
    }
  }



}

.expand-select
{
  width:200px;
  position:relative;
  left: 50%;
  margin-left:-100px;
}
.center
{
  text-align: center;
}
.expand-button
{
  border-radius: 50%;
}
.delete-button
{
  cursor: pointer;
  margin-left:5px;
  margin-right:5px;
  &:hover {
    color:red;
  }
}

$linecolor: #ccc;
$linestyle: 2px dashed;

$linecolor: #ccc;
$linestyle: 2px dashed;

@each $zone in zone-0, zone-1, zone-2, zone-3, zone-4, zone-5 {

  :not(.#{$zone}) + .#{$zone} {
    border-left: #{$linestyle} #{$linecolor};
  }
  .#{$zone} + :not(.#{$zone}) {
    border-left: #{$linestyle} #{$linecolor};
  }
}
</style>
