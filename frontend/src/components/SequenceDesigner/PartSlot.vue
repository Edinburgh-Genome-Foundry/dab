<template lang="pug">
.part-slot(:class='[{inactive: !active}, zone]' v-show="checklistEnabled")

  .slot-name {{slotName}}

  transition(name='part-pop1' enter-active-class='animated flipInY')
    .active-display(v-if='active')
      .controls
        i.el-icon-delete(@click="$emit('userDisable', slotName)" v-if='!checklistLocked')
        i.animated.infinite.tada.el-icon-edit(@click="dialogVisible = true" v-if='selectedParts.length === 0')
        i.tada.el-icon-edit(@click="dialogVisible = true" v-else)
      .part-label(v-if='selectedParts.length > 0' @click="dialogVisible = true")
        span {{selectedParts[0].dbName}}
        br
        span.and-others(v-if='andOthers.length > 0') {{andOthers}}
      .icons
        el-tooltip.tooltip(v-for="value, category in categories", v-if='value', :key='category',
                     effect="light", :content="category", :transition='null',
                     :enterable='false', transition='el-fade-in')
          .icon(v-bind:style="backgroundImageStyle(category)", @click="dialogVisible = true")
      el-icon.center.delete(icon='delete', v-if='checklistEnabled && !checklistLocked',
                       size='small', @click="$emit('userDisable', slotName)")

  transition(name='part-pop2' enter-active-class='animated rubberBand')
    .inactive-display(v-if='!active')
      .controls
        i.el-icon-plus(@click="$emit('userEnable', slotName)")
      .icons
        .icon.active(v-bind:style="backgroundImageStyle('empty')")
        el-tooltip.tooltip(v-for="value, category in categories", v-if='value', :key='category',
                     effect="light", :content="category", :transition='null',
                     :enterable='false', transition='el-fade-in')
          .icon.inactive(v-bind:style="backgroundImageStyle(category)")

  el-dialog.part-selector(title="Select parts", :visible.sync="dialogVisible", size='large')
    .show-selected
      el-button.center(icon='arrow-right' @click='function () {showSelected = !showSelected}' v-if='!showSelected' size='small') Show selected ({{selectedParts.length}})
      el-button.center(icon='arrow-down' @click='function () {showSelected = !showSelected}' v-if='showSelected' size='small') Hide selected ({{selectedParts.length}})

      .parts(v-if='showSelected')
        partcard(v-for='part in selectedParts', :key='part.dbName', :selected='true', :part='part',
                 @deselectPart='deselectPart')
    el-input.search-box(v-model='search', placeholder='Enter a search term' v-if='categoryFilteredParts.length > 4')
    .parts
      partcard(v-for='part in searchFilteredParts', :key='part.dbName', :selected='partIsSelected(part)', :part='part',
              @selectPart='selectPart', @deselectPart='deselectPart')
        //- .part_header(slot='header')
        //-   span(v-if='partIsSelected(part)')
        //-     i.select-part.el-icon-delete(@click='deselectPart(part)')
        //-     p.part-name {{part.dbName}} (selected)
        //-   span(v-else)
        //-     i.select-part.el-icon-plus(@click='selectPart(part)')
        //-     p.part-name {{part.dbName}}
        //-
        //-   a.database-link(:href="'https://ice.dev.genomefoundry.org/ICE-REST/rest/entries/genbank/' + part.dbId") <i class="el-icon-document"></i> genbank
        //-   a.database-link(:href="'https://ice.dev.genomefoundry.org/entry/' + part.dbId") <i class="el-icon-share"></i> ICE page
        //- p(v-if='part.dbDescription') <b>Description:</b> {{part.dbDescription}}
</template>

<script>
let globalSetting = require('../../setting.js')
import partcard from './PartCard'
export default {
  props: {
    slotName: {default: '1'}, // The slot is of the form '1', '2', '8A', '8B', etc.
    checklistEnabled: {default: true}, // If not active, will be smaller, greyer, no inputs
    checklistLocked: {default: false}, // Locked means you can't add or remove a block
    userEnabled: {default: true}, // If not active, will be smaller, greyer, no inputs
    categories: {default: () => ({})}, // categories of parts filtered in the dropdown
    zone: {default: 'nozone'},
    selectedParts: {default: () => ([])}
  },
  data: function () {
    return {
      allParts: [],
      selectVisible: false,
      dialogVisible: false,
      search: '',
      showSelected: false
    }
  },
  components: {
    partcard
  },
  computed: {
    active: function () {
      return this.checklistEnabled && (this.ckecklistLocked || this.userEnabled)
    },
    selectStyle: function () {
      if (this.selectVisible) return {display: 'inline-block'}
      else return {display: 'none'}
    },
    categoryFilteredParts: function () {
      var self = this
      return this.allParts.filter(function (part) {
        return self.categories[part.dbType]
      })
    },
    searchFilteredParts: function () {
      if (this.search === '') {
        return this.categoryFilteredParts
      }
      var self = this
      return self.categoryFilteredParts.filter(function (part) {
        return [part.dbName, part.dbDescription].some(function (txt) {
          return txt.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
        })
      })
    },
    andOthers: function () {
      var others = this.selectedParts.length - 1
      if (others > 0) {
        return ' and ' + others + ' other' + ((others > 1) ? 's' : '')
      } else {
        return ''
      }
    }
  },
  mounted: function () {
    let iceUrl = globalSetting.ICE_URL
    this.$http.post(
      iceUrl + 'entries/filterlist',
      {
        filter: JSON.stringify({
          type: 'N/A',
          position: this.slotName,
        }),
        fields: '{"matchScore","dbDescription","dbName","dbId","type","position"}',
        sessionIdForm: this.$cookie.get('sessionId'),
        userIdForm: this.$cookie.get('userId'),
      },
      {emulateJSON: true},
      {credentials: false},
    ).then((response) => {
      if (response.status === 200) {
        this.allParts = response.body.data
      }
    })
  },
  methods: {
    changeLock: function (event) {
      this.$emit('update:userEnabled', !this.userEnabled)
    },
    onSelectVisibleChange: function (visible) {
      this.selectVisible = visible
    },
    removeItem: function (item) {
      this.selectedParts.splice(this.selectedParts.indexOf(item), 1)
    },
    backgroundImageStyle: function (category) {
      return {
        'background-image': 'url(/static/sbol-icons/' + category.split(' ').join('-') + '.svg)'
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

$linecolor: #ccc;
$linestyle: 2px dashed;
$colors: (
    tuA: #f6faff,
    tuB: #f4fefa,
    selection-marker: #fff5ff
);
@each $zone in tuA, tuB, selection-marker {
  .#{$zone} + .#{$zone} {
    border-right: 0;
    border-left: 0;
  }

  .#{$zone} {
    border-right: #{$linestyle} #{$linecolor};
    border-left: #{$linestyle} #{$linecolor};

    .icons {
      background-color: map-get($colors, $zone);
    }
  }
  .none + .#{$zone}, .selection-marker + .#{$zone}  { border-right: 0;}
  .#{$zone} + .none { border-left: #{$linestyle} #{$linecolor}};
}


.part-slot {
  &.inactive {
    max-width:2em;
    min-width: 1em;
    .slot-name {
      opacity: 0
    }
    .controls i {
      position: relative;
      display: inline-block;
      color: #bbb;
      top: 5.3em;
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
  }
  .controls {
    text-align: center;
    i {
      font-size: 0.8em;
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
        height: 0.8em;
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


</style>
