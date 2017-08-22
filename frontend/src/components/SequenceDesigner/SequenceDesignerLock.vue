<template lang="pug">
  div.lock-panel(v-on:click='$emit("click")')
    img.lock-icon(src='/static/icons/expand.svg' v-if='!expand')
    img.lock-icon(src='/static/icons/expanded.svg' v-if='expand')
</template>

<script>
export default {
  props: {
    expand: {default: false}
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

.lock-panel
{
  text-align: center;
  cursor: pointer;
}
.lock-icon
{
  width:75px;
  height:16px;
}

</style>
