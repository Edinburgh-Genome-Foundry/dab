<template lang='pug'>
.toolbar
  .control(@click="deleteConstruct({construct: construct})") <icon name='trash-o'></icon> Delete
  .control(@click="duplicateConstruct({construct: construct})") <icon name='files-o'></icon> Duplicate
  .control(@click="moveConstructUp({construct: construct})") <icon name='arrow-up'></icon> Move up
  .control(@click="moveConstructDown({construct: construct})") <icon name='arrow-down'></icon> Move down
  .control(@click="$emit('toggleOptions')") <icon name='sliders'></icon> {{construct.templateName}} Options
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
    color: #91a0cc;
    cursor: pointer;
    &:hover {
      // font-weight: bold;
      color: #000;
    }
  }
}
</style>
