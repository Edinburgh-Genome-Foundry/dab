<template lang="pug">
el-card.part-card(:class="{selected: selected}")
  .part_header(slot='header')
    span(v-if='selected')
      i.select-part.el-icon-delete(@click="$emit('deselectPart',part)")
      p.part-name {{part.dbName}} (selected)
    span(v-else)
      i.select-part.el-icon-plus(@click="$emit('selectPart',part)")
      p.part-name {{part.dbName}}

    a.database-link(:href="'https://emmadb.genomefoundry.org/ICE-REST/rest/entries/genbank/' + part.dbId") <i class="el-icon-document"></i> genbank
    a.database-link(:href="'https://emmadb.genomefoundry.org/entry/' + part.dbId") <i class="el-icon-share"></i> ICE page
  p(v-if='part.dbDescription') <b>Description:</b> {{part.dbDescription}}
</template>

<script>
export default {
  props: {
    part: {default: () => ({})},
    selected: {default: false}
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

<style lang='scss' scoped>

/deep/.part-card {
  width: 80%;
  margin-left: 10%;
  margin-bottom: 2em;
  &.selected {
    .el-card__header {
      background-color: #8052e0;
    }
  }
  .el-card__header {
    padding: 10px;
    font-weight: bold;
    color: white;
    background-color: #52a2e0;

    p.part-name {
      display: inline-block;
      margin-right: 2em;
      margin:0;
      // width: 200px;
    }
    a.database-link {
      font-size: 0.85em;
      color: white;
      text-decoration: none;
      font-weight: normal;
      text-align: right;
      margin-left: 15px;
      float: right;
    }
  }
  .el-card__body {
    padding-top: 5px;
    padding-bottom: 5px;
    p {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }
  }
  .select-part {
    margin-right: 1em;
    cursor: pointer;
    font-size: 0.8em;
  }
}

.icon-panel
{
  text-align: center;
  cursor: pointer;
}

.emma-icon
{
  width: 32px;
  height: 32px;
}

</style>
