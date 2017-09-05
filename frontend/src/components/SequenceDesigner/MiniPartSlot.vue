<template lang="pug">
.mini-part-slot(:class="['zone-' + zone, {disabled: disabled}]",
                :style="{'font-size': size + 'px'}")
  .slot-name {{slotName}}
  .icons
    el-tooltip(v-for='category in categories', :key='category',
               effect="light", :content="category", :transition='null',
               :enterable='false', transition='el-fade-in')
      .icon(:style="backgroundImageStyle(category)",
            :key='category', @click="$emit('click', slotName, category)")
</template>

<script>

export default {
  props: {
    slotName: {default: '1'}, // The slot is of the form '1', '2', '8A', '8B', etc.
    size: {default: 15},
    zone: {default: 'none'}, // If not active, will be smaller, greyer, no inputs
    categories: {default: () => ([])}, // Locked means you can't add or remove a block
    disabled: {default: false}
  },
  methods: {
    backgroundImageStyle: function (category) {
      return {
        'background-image': 'url(/static/sbol-icons/' + category.split(' ').join('-') + '.svg)'
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.mini-part-slot {
  display: inline-block;
  height: 10em;
  width: 2.85em;
  vertical-align: top;
  margin-bottom: 2em;
  &.zone-tuA {
    background-color: #f8f9fe;
  }
  &.zone-tuB { background-color: #fff7f7}
  &.zone-selection-marker { background-color: #fef8fe}
  .slot-name {
    font-weight: bold;
    text-align: center;

  }
  .icons {
    margin-top: 1em;
    position: relative;
    top: 0em;

  }
  .icon {
    background-size: auto 150%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    width: 100%;
    height: 2em;
    margin-top: -0.28em;
    &:not(:first-child) {
      width: 60%;
      margin-left: 20%;
    }
  }
}
</style>
