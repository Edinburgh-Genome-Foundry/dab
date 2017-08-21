<template lang="pug">
div.icon-panel
  .row
    img.emma-icon(v-for='(val, icon) in icons' v-if="val" v-bind:style="{width: width+'px', height: height+'px'}" v-bind:src="'/static/icons/'+ icon + '.svg'")
  .row
    .expand-icon

</template>

<script>
export default {
  props: {
    type: {default: 'ires'},
    width: {defualt: 32},
    height: {defualt: 32},
    icons: {defult: ['ires']},
  },
  data: function () {
    return {
    }
  },
  methods: {

  },
  watch: {

  }
}
</script>

<style scoped>

.icon-panel
{
  text-align: center;
}

.emma-icon
{
  width: 32px;
  height: 32px;
}

</style>
