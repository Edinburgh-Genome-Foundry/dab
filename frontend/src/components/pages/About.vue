<template lang='pug'>
.about-emma
  h1  About EMMA

  h2 Overhangs

  el-card(header='EMMA overhangs, by position').overhangs-list
    .minischema.center
      .part-and-overhangs(v-for='slotName in emma.slotNames', :key='slotName')
        minipartslot.overhang(:size='13', :categories="['overhang']", :slotName='emma.slotInfos[slotName].overhangs.left')
        minipartslot(:size='13', :categories='[emma.slotInfos[slotName].categories[0]]', :slotName='slotName')
        minipartslot.overhang(:size='13', :categories="['overhang']", :slotName='emma.slotInfos[slotName].overhangs.right')


  el-card.overhangs-list(header='EMMA overhangs, alphabetically')
    .overhang-seq(v-for='seq in emma.overhangs', :key='seq') {{seq}}&nbsp

  el-card(header='EMMA- and Inter-compatible overhangs').overhangs-list
    .overhang-seq(v-for='seq in emma.compatibleOverhangs', :key='seq') {{seq}}&nbsp
</template>

<script>
import emma from '../SequenceDesigner/EMMA.js'
import minipartslot from '../SequenceDesigner/MiniPartSlot'
export default {
  data: function () {
    return {
      emma: emma,
    }
  },
  components: {
    minipartslot
  }
}
</script>
<style lang='scss' >
.about-emma {
  .minischema {
    margin-top: 2em;
    .part-and-overhangs {
      display: inline-block;
      margin-right: 3em;
      margin-bottom: 0;
      margin-top: 0;
    .slot-name {
      color: #999
    }
    .mini-part-slot {
      height: 3em;
      font-family: 'Inconsolata', Courier;
    }
    .overhang .slot-name {
        color: #000;
      }
    }
  }
  .overhangs-list {
    width: 80%;
    margin-left: 10%;
    margin-bottom: 1.5em;
    margin-top: 1.5em;
    .overhang-seq {
      display: inline-block;
      margin-right: 1em;
      font-family: 'Inconsolata';
    }
  }

}

.part-categories {
  width: 80%;
  margin-left: 10%;
  .part-category {
    display: inline;
    font-family: 'Inconsolata', Courier;
  }
  .part-category ~ .part-category:before {
    content: ', '
  }
}

</style>
