<template lang='pug'>
.toolbar
  .control.options(@click="$emit('toggleOptions')") <icon name='sliders'></icon> Construct options
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
    color: #91c6ff; // #91a0cc;
    cursor: pointer;
    &:hover {
      // font-weight: bold;
      color: #409eff;
    }
    &.options {
      color: white;
      background: #91c6ff;
      padding: 5px;
      border-radius: 3px;
      &:hover {
        // font-weight: bold;
        background: #409eff;// #3f5086;
      }
    }
  }
}
</style>
