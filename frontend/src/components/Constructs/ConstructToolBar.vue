<template lang='pug'>
.toolbar
  .control.options(v-if='Object.keys(construct.options).length' @click="$emit('toggleOptions')") <icon name='sliders'></icon> Construct options
  .control(@click="deleteConstruct({construct: construct})") <icon name='trash-o'></icon> Delete
  .control(@click="duplicateConstruct({construct: construct})") <icon name='files-o'></icon> Duplicate
  .control(@click="moveConstructUp({construct: construct})") <icon name='arrow-up'></icon> Move up
  .control(@click="moveConstructDown({construct: construct})") <icon name='arrow-down'></icon> Move down
</template>

<script>

import { mapMutations } from 'vuex'
export default {
  props: {
    construct: null
  },
  methods: {
    ...mapMutations([
      'deleteConstruct',
      'duplicateConstruct',
      'moveConstructUp',
      'moveConstructDown',
    ]),
  }
}
</script>
<style lang='scss' scoped>
.toolbar {
  margin-top: 0.3em;
  margin-bottom: 0.3em;
  .control {
    display: inline-block;
    margin-right: 1.5em;
    // width: 6.5em;
    color: #5b9de3; // #91a0cc;
    cursor: pointer;
    &:hover {
      // font-weight: bold;
      color: #4276ac;
    }
    &.options {
      color: white;
      background: #5b9de3;
      padding: 5px;
      border-radius: 3px;
      &:hover {
        // font-weight: bold;
        background: #4276ac;// #3f5086;
      }
    }
  }
}
</style>
