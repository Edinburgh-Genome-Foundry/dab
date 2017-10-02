<template lang='pug'>
.about-emma
  h1 About EMMA

  p This page gathers technical informations on the EMMA assembly standard.

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

  el-card(header='Valid part categories on this website').overhangs-list
    p(name='categories' id='categories').
      5-3 homology arm, 5-3 ITR, 5-3 LT,R recombinase recognition sequence,
      insulator, promoter, RNA stability sequence, DNA binding element, 5-3 UTR,
      kozak-ATG, protein tag, CDS, p2A, peptide, linker, terminator, IRES,
      origin of replication
</template>

<script>
import emma from '../SequenceDesigner/EMMA.js'
import minipartslot from '../SequenceDesigner/MiniPartSlot'
export default {
  data: function () {
    // var partCategories = []
    // Object.values(emma.slotInfos).forEach(function (part) {
    //   console.log(part)
    //   part.categories.forEach(function (category) {
    //     console.log(category)
    //     if (partCategories.indexOf(category) < 0) {
    //       partCategories.push(category)
    //     }
    //   })
    // })

    return {
      emma: emma,
      // partCategories: partCategories
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
  .example img {
      width:90%;
      display: block;
      margin: auto;
      box-shadow: 2px 2px 2px 2px #ddd;
  }
  .examplesmall img {
      width:40%;
      display: block;
      margin: auto;
  }
  .exampletiny img {
      width:20%;
      display: block;
      margin: auto;
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
