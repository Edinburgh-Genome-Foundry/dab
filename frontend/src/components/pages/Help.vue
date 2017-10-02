<template lang='pug'>
.about-emma


  h1  EMMA-DB HELP

  .reduced-width
    :markdown-it
      Note: if the information you are looking for is not here,
      [leave us a message](mailto:egf-software@ed.ac.uk).


  h2 Overview

  .reduced-width
    :markdown-it
      EMMA-DB is composed of:

      - A [parts repository](https://emmadb.genomefoundry.org) which you can
        use to store and manage your genetic parts, and browse parts from other
        labs.
      - A design application (this website) featuring several modules:
        - The [parts explorer](search-the-database) enables to find parts based
          on category and position in the EMMA template
        - The [designer](design-constructs) enables to define EMMA assemblies,
          and simulate the cloning.
        - The [parts domestication app](domesticate-parts) enables to create new
          EMMA compatible parts (with correct overhangs, no BsmBI sites, codon optimization etc.)

  h2 How to load your own Genetic parts

  .reduced-width
    :markdown-it
      To use your own parts in EMMA DB, first request a user account
      from the [Edinburgh Genome Foundry](mailto:egf-software@ed.ac.uk).

      Once you have a user account log in to the [parts repository](https://emmadb.genomefoundry.org).
      Click on ``Create Entry/Part`` to access the form below. Make sure to provide the sequence
      (preferentially as a Genbank), and two additional fields ``EMMA Module``
      (indicating the EMMA position of the part) and ``Category``
      (see [here](#/about-emma#categories) for a list of accepted categories).

      Your part will now be available in the relevant EMMA-DB design apps.

      ![Part submission form](static/imgs/ice_part_screenshot.png)

  h2 How to use the designer

  .reduced-width
    :markdown-it
      The designer has two main parts: a checklist which is used to filter out
      some slots of the EMMA template, and a schema of the assembly. Click
      on the different positions of the assembly to select parts.

      ![Designer screenshot](static/imgs/designer_screenshot.png)
  //-
  //- .example
  //-         img(src='../../assets/images/Designer_template.png')
  //- p.
  //-   You can delete all the slots except start/stops, to further customize the
  //-   template, and example of a simple construct would be:
  //- .example
  //-         img(src='../../assets/images/designer_template_reduced.png')
  //- p.
  //-   To create a design, just click on each slot, you will get a popup window and select the part
  //-   that you want to put there from emmadb's library.
  //- .example
  //-         img(src='../../assets/images/show_selected.png')
  //- p.
  //-   From this part selection, you can click on "ICE Page" (if you want to stay
  //-   on EMMA designer right click open in new window) to view the part on
  //-   ICE, genbank to download the genbank file and + to select the part.
  //- p Once selected the name of the part will be displayed in the template.
  //- p.
  //-   As soon as you have selected at least one part for each slot, you will be able
  //-   to click on the bottom "Get design sequence(s)" and you will get a zip file
  //-   with all the constructs that your selection will generate.
  //-
  //- p.
  //-   If you have your own EMMA compatuble parts, you can create those in the
  //-   associated ICE website. This is only possible if you have an account for emmadb.
  //-   All parts in ICE should be of the type "part"
  //- p 1. Click on “Create Entry” and select the type of entry that you are going to create:
  //- .example
  //-       img(src='../../assets/images/create_part.png')
  //-
  //- p 2. Fill the required fields with the data, including Sequence file:
  //- p.
  //-   3. Add two fields: Emma Module with slot number and Category, if in doubt, use CDS
  //-   You can also browse the
  //- p 4. Click submit, and you will go back to the entry main page
  //- p.
  //-   Go back to designer and refresh: you will see your part.
  //-   Note that by default all created parts are private: you have to share them in
  //-   ICE with the users you want to see them or with everyone to make them public.
  //- p.
  //-   You can save and upload the schema to work on at a later date.

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
