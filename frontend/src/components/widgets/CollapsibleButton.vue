<template lang='pug'>
.collapsible-button
  h3.button.center(@click='collapsibleVisible = !collapsibleVisible') <icon :name='caret' scale=1.2></icon> {{text}}
  .collapsible(:class="{visible: collapsibleVisible}")
    slot
</template>

<script>
export default {
  name: 'collapsible-button',
  props: {
    text: {default: 'Add text here'},
    visible: {default: false}
  },
  data () {
    return {
      collapsibleVisible: this.visible
    }
  },
  computed: {
    caret () {
      return this.collapsibleVisible ? 'caret-down' : 'caret-right'
    }
  }
}
</script>

<style lang='scss' scoped>
.collapsible-button {
  width: 95%;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  .button {
    cursor: pointer;
    font-size: 1.5em;
    margin-bottom: 0.5em;
    margin-top: 0.5em;

  }
  .fa-icon {
    width: 0.5em;
  }
  .collapsible{
    display: block;
    max-height: 0;
    overflow: hidden;
    transition: height 1s;
    transition: max-height 0.5s ease-out;
    &.visible {
      max-height: 800px;
      transition: max-height 0.5s ease-in;
    }
  }
}
</style>
