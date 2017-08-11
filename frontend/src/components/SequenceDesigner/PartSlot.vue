<template lang="pug">
.part-slot(:class='{active}')
  .name {{slotName}}
  .line active: {{active}}
  .line <b>categories:</b>
  .line(v-for='value, label in categories' v-if='value', :key='label') {{label}}
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
      selectedParts: [] // will contain the selected parts
    }
  },
  computed: {
    active: function () {
      return this.checklistEnabled && (this.ckecklistLocked || this.userEnabled)
    }
  }
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
  width: 100px;
  height: 100px;

  vertical-align: text-top;
  .line {
    margin:0;
    font-size: 10px;
  }
  background-color: #ddd;
}
.part-slot.active {
  background-color: #ccf;
}
</style>
