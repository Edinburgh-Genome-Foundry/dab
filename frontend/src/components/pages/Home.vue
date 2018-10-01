<!-- src/components/Home.vue -->

<template lang="pug">
.page
  center
    img.title(src='/static/dab_title.svg')
    animated-construct
    el-row.app-icons
      el-col(:span='8')
        router-link(to='design_assemblies')
          i.el-icon-edit-outline
          p Design
    
      el-col(:span='8')
        router-link(to='manage_parts')
          i.el-icon-menu
          p Manage parts
      
      el-col(:span='8')
        router-link(to='about')
          i.el-icon-location-outline
          p About
</template>

<script>
import AnimatedConstruct from '../widgets/AnimatedConstruct'
export default {
  data: function () {
    return {
      userSettings: JSON.parse(window.localStorage.getItem('emmaSettings')),
    }
  },
  components: {
    'animated-construct': AnimatedConstruct
  }
}
</script>

<style lang='scss' scoped>
h2 {margin-bottom: 60px}
p {
  font-size: 18px;
}

.title {
  max-width: 400px;
  margin-top: 5em;
  // margin-bottom: 2em;
  width: 90%;
}

.description p {
  max-width: 800px;
  width: 90%;
  margin: 0 auto;
}

.app-icons {
  width: 90%;
  max-width: 400px;
  margin-top: 2em;
  font-family: Comfortaa;
  i {
    font-size: 4em;
  }
  a {
    color: #42b7d6;
    text-decoration: none;
    &:hover {
      color: #2e839b;
    }
  }
}

</style>
