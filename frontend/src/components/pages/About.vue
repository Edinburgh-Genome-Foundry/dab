<template lang='pug'>
.about-emma
  h1  How to Use EMMA

  h2 Design contructs

  p.
    The designer allows to design a new construct using EMMA's 25 slot template, along with a set of
    on/off options like selection markers, homology arms,the transcription units
    to be used,  etc to suit your EMMA design needs.
  .example
          img(src='../../assets/images/Designer_template.png')
  p.
    You can delete all the slots except start/stops, to further customize the
    template, and example of a simple construct would be:
  .example
          img(src='../../assets/images/designer_template_reduced.png')
  p.
    To create a design, just click on each slot, you will get a popup window and select the part
    that you want to put there from emmadb's library.
  .example
          img(src='../../assets/images/show_selected.png')
  p.
    From this part selection, you can click on "ICE Page" (if you want to stay
    on EMMA designer right click open in new window) to view the part on
    ICE, genbank to download the genbank file and + to select the part.
  p Once selected the name of the part will be displayed in the template.
  p.
    As soon as you have selected at least one part for each slot, you will be able
    to click on the bottom "Get design sequence(s)" and you will get a zip file
    with all the constructs that your selection will generate.

  p.
    If you have your own EMMA compatuble parts, you can create those in the
    associated ICE website. This is only possible if you have an account for emmadb.
    All parts in ICE should be of the type "part"
  p 1. Click on “Create Entry” and select the type of entry that you are going to create:
  .example
        img(src='../../assets/images/create_part.png')

  p 2. Fill the required fields with the data, including Sequence file:
  p.
    3. Add two fields: Emma Module with slot number and Category, if in doubt, use CDS
    You can also browse the
  p 4. Click submit, and you will go back to the entry main page
  p.
    Go back to designer and refresh: you will see your part.
    Note that by default all created parts are private: you have to share them in
    ICE with the users you want to see them or with everyone to make them public.
  p.
    You can save and upload the schema to work on at a later date.






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
