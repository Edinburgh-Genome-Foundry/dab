<template lang="pug">
.part-slot(:class='{active}' v-if="checklistEnabled")
  .name {{slotName}}
  //- .line active: {{active}}
  // .line <b>categories:</b>
  // .line(v-for='value, label in categories' v-if='value', :key='label') {{label}}

  el-tooltip.tooltip(v-for='value, category in categories', v-if='value', :key='category',
               effect="light", :content="category", :transition='null',
               :enterable='false', transition='el-fade-in')
    .icon(:class='{active}' v-bind:style="backgroundImageStyle(category)")

  // sdIcon(v-bind:iconSize="iconSize" v-bind:icons='categories')

  .line(v-if="myUserEnabled")
    sdLock(v-on:click="changeLock" v-bind:expand='true')
    .expand-select(v-if='selectVisible')
      el-select(v-model='selectedParts'
        filterable
        multiple
        placeholder="choose part"
        v-on:visible-change="onSelectVisibleChange")
        el-option(
          v-for='item in allParts'
          v-bind:key='item.dbId'
          v-bind:label='item.dbName'
          v-bind:value='item'
          )
      .center
        el-button.expand-button(icon="minus"
        size="mini"
        type="danger"
        v-on:click="selectVisible = !selectVisible")
    .center(v-else)
      .line(v-for='item in selectedParts')
        span {{item.dbName}}
        span.el-icon-delete.delete-button(
          v-on:click="removeItem(item)"
          v-bind:item="item"
        )

      el-button.expand-button(
        icon="plus"
        size="mini"
        type="primary"
        v-on:click="selectVisible = !selectVisible")


  .line(v-else)
    sdLock(v-on:click="changeLock" v-bind:expand='false')
</template>

<script>
let globalSetting = require('../../setting.js')
export default {
  props: {
    slotName: {default: '1'}, // The slot is of the form '1', '2', '8A', '8B', etc.
    checklistEnabled: {default: true}, // If not active, will be smaller, greyer, no inputs
    checklistLocked: {default: false}, // Locked means you can't add or remove a block
    userEnabled: {default: true}, // If not active, will be smaller, greyer, no inputs
    categories: {default: () => ({})} // categories of parts filtered in the dropdown
  },
  data: function () {
    return {
      selectedParts: [], // will contain the selected parts
      allParts: [],
      myUserEnabled: this.userEnabled,
      selectVisible: false,
    }
  },
  computed: {
    active: function () {
      return this.checklistEnabled && (this.ckecklistLocked || this.myUserEnabled)
    },
    selectStyle: function () {
      if (this.selectVisible) return {display: 'inline-block'}
      else return {display: 'none'}
    },

    filteredParts: function () {
      let ret = []
      for (let part in this.allParts) {
        // if (this.categories[part.dbType]) {
        ret.append(part)
        // }
      }
      return ret
    },

    iconSize: function () {
      if (this.checklistEnabled) {
        return 48
      } else {
        return 32
      }
    }
  },
  mounted: function () {
    let iceUrl = globalSetting.ICE_URL
    this.$http.post(
      iceUrl + 'entries/filterlist',
      {
        filter: JSON.stringify({
          type: 'part',
          position: this.slotName,
        }),
        fields: '{"matchScore","dbDescription","dbName","dbId","type","position"}',
      },
      {emulateJSON: true},
    ).then((response) => {
      if (response.status === 200) {
        this.allParts = response.body.data
      }
    })
  },
  methods: {
    changeLock: function (event) {
      this.myUserEnabled = !this.myUserEnabled
    },
    onSelectVisibleChange: function (visible) {
      this.selectVisible = visible
    },
    removeItem: function (item) {
      this.selectedParts.splice(this.selectedParts.indexOf(item), 1)
    },
    backgroundImageStyle: function (category) {
      console.log('cat', category)
      return {
        'background-image': 'url(/static/sbol-icons/' + category.split(' ').join('-') + '.svg)'
      }
    },
  },

  components: {
    sdIcon: require('./SequenceDesignerIcon.vue'),
    sdLock: require('./SequenceDesignerLock.vue'),
  },
}
</script>
<style lang='scss' scoped>
.name {
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}
.part-slot {
  display: inline-block;
  // padding: 10px;
  // margin: 10px;
  margin-bottom: 20px;
  width: 100px;
  // height: 200px;

  vertical-align: text-top;
  .line {
    margin:0;
    font-size: 10px;
    .selectable-part {
      font-size: 10px;
      display:inline-block;
      max-width:80%;
      cursor: pointer;
      &:hover {
          background: rgba(0,0,128,0.25);
        }
    }
    .check-mark {
      display:inline-block;
      font-size:200%;
      color:darkgreen;
      margin-left:5px;
    }
  }
  // background-color: #ddd;
}
.part-slot.active {
  // background-color: #ccf;
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
.icon {
    background-size: auto 150%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    width: 100%;
    height: 30px;
    margin-top: 20px;
    &:not(:first-child) {
      width: 100%;
      margin-left: 0%;
    }
    filter: grayscale(100%);

  }
  .icon.active{
      height: 50px;
      margin-top:0px;
      filter: grayscale(0%);
  }

</style>
