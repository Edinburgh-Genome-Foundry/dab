<template lang="pug">
.mini-part-slot(:class="[{disabled: disabled}, 'zone-' + zoneIndex]",
                :style="{'font-size': size + 'px'}")
  .slot-name {{slotName}}
  .icons
    el-tooltip(v-for='category, i in categories', :key='category',
               effect="light", :content="category", :transition='null',
               :enterable='false', transition='el-fade-in')
      .icon(:style="[backgroundImageStyle(category), i === 0 ? {'background-color': color} : {}]",
            :key='category', @click="$emit('click', slotName, category)")
</template>

<script>

export default {
  props: {
    slotName: {default: '1'}, // The slot is of the form '1', '2', '8A', '8B', etc.
    size: {default: 15},
    color: {default: 'none'},
    zoneIndex: {default: 'none'}, // If not active, will be smaller, greyer, no inputs
    categories: {default: () => ([])}, // Locked means you can't add or remove a block
    disabled: {default: false},
    selected: {default: false}
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
  // height: 10em;
  // width: 2.85em;
  vertical-align: top;
  margin-bottom: 2em;
  .slot-name {
    font-size: 0.85em;
    font-weight: bold;
    text-align: center;
    padding-left: 1.2em;
    padding-right: 1.2em;



  }
  .icons {
    margin-top: 1em;
    position: relative;
    top: 0em;

  }
  .icon {
    background-size: auto 125%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    width: 100%;
    height: 2.5em;
    margin-top: -0.28em;
    &:not(:first-child) {
      width: 60%;
      margin-left: 20%;
    }
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
