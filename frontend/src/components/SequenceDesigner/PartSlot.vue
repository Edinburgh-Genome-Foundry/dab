<template lang="pug">
.part-slot(:class='{active}' v-if="checklistEnabled")
  .name {{slotName}}
  .line active: {{active}}
  .line <b>categories:</b>
  .line(v-for='value, label in categories' v-if='value', :key='label') {{label}}

  sdIcon(v-bind:iconSize="iconSize" v-bind:icons='categories')
  .line(v-if="myUserEnabled")
    el-button(v-on:click="changeLock" size='mini') disable
    el-select(v-model='selectedParts[0]' clearable filterable placeholder="choose part")
      el-option(v-for='item in allParts', :key='item.dbId', :value='item.dbName')
  .line(v-else)
    el-button(v-on:click="changeLock" size='mini') enable

</template>

<script>

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
      selectedParts: [''], // will contain the selected parts
      allParts: [],
      myUserEnabled: this.userEnabled,
    }
  },
  computed: {
    active: function () {
      return this.checklistEnabled && (this.ckecklistLocked || this.myUserEnabled)
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
    this.$http.post(
      '//ice.dev.genomefoundry.org/ICE-REST/rest/entries/filterlist',
      {
        filter: JSON.stringify({
          type: 'part',
          position: this.slotName,
        }),
        fields: '{"matchScore","dbDescription","dbName","dbId","type","position"}',
      },
      {emulateJSON: true},
    ).then((response) => {
      console.log(response)
      if (response.status === 200) {
        this.allParts = response.body.data
      }
    })
  },
  methods: {
    changeLock: function (event) {
      this.myUserEnabled = !this.myUserEnabled
    }
  },

  components: {
    sdIcon: require('../widgets/SeqeunceDesignerIcon.vue'),
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
  padding: 10px;
  margin: 10px;
  width: 150px;
  height: 200px;

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
  background-color: #ddd;
}
.part-slot.active {
  background-color: #ccf;
}

</style>
