<!-- src/components/Home.vue -->

<template lang="pug">
div
  h1 Welcome
  h2 Connect with your EMMA-DB identifiers
  scenariospanel
</template>

<script>
import scenariospanel from '../ScenariosPanel'
export default {
  components: {
    scenariospanel
  }
}
</script>

<style scoped>
h2 {margin-bottom: 60px}
p {
  font-size: 18px;
}
</style>
