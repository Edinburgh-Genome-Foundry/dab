<!-- src/components/Home.vue -->

<template lang="pug">
div
  h1 Welcome to EMMA-DB !
  .description
    :markdown-it
      EMMA-DB is a web plateform to manage genetic parts for the
      [EMMA assembly standard](http://pubs.acs.org/doi/abs/10.1021/acssynbio.7b00016),
      and design new constructs from these parts. Read our [help page](help) for more.

  h2 Choose an app below
  scenariospanel
</template>

<script>
import scenariospanel from '../ScenariosPanel'
export default {
  data: function () {
    return {
      userSettings: JSON.parse(window.localStorage.getItem('emmaSettings')),
    }
  },
  components: {
    scenariospanel
  }
}
</script>

<style lang='scss' scoped>
h2 {margin-bottom: 60px}
p {
  font-size: 18px;
}

.description p {
  width: 800px;
  margin: 0 auto;
}

</style>
