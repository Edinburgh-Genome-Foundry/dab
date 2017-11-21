<template lang="pug">
el-row
  el-col(:xs="24", :sm="8", :md="8", :lg="8" v-for='scenario in scenarios',  v-bind:key="scenario.txt")
    .box-card
      router-link(:to='scenario.infos.path')
        img.icon(:src='scenario.infos.icon', alt='')
        .caption
          h3 {{scenario.infos.title}}
          p.thumbnail-description {{scenario.infos.description}}
</template>

<script>
import scenarios from './scenarios/scenarios.js'
export default {
  data: () => ({
    scenarios: scenarios.list
  })
}
</script>

<style lang='scss' scoped>

.el-row {
  width: 80%;
  margin-left: 10%;
  margin-top: 4em;

  a {
    color: black;
    text-decoration: none;
  }
}
.box-card {
  opacity: 0.7;
  width:90%;
  margin: 10px auto 10px;
  text-align: center;
  &:hover {
    opacity: 1;
  }
}
img {
  height: 80px
}
.caption {
  padding: 0px;
  h3 {
    height: 50px;
  }


}

.thumbnail-description {
  font-size: 14px;
}

</style>
