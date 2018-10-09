<template lang='pug'>
.page

  h1.app-title About EGF DAB
  center
    img.about-title(src='static/about-title.svg')
  .reduced-width
    :markdown-it
      EGF Design and Build is a project of the
      [Edinburgh Genome Foundry](https://genomefoundry.org/) to
      simplify the discovery and use of different assembly standards (such as
      EMMA, MoClo, Cyanogate), and to provide a simple portal to order constructs from the
      Foundry. It is open source and the code is
      [on Github](https://github.com/Edinburgh-Genome-Foundry/dab).
      
      The website is still under construction and some features will not work as
      expected yet. If you are interested in the project or need some help using
      the website, [leave us a message](mailto:egf-software@ed.ac.uk).


  // h2 Overview

  // .reduced-width
  //   :markdown-it
  //     EGF DAB is composed of:

  //     - A [parts repository](https://emmadb.genomefoundry.org) which you can
  //       use to store and manage your genetic parts, and browse parts from other
  //       labs.
  //     - A design application (this website) featuring several modules:
  //       - The [parts explorer](search-the-database) enables to find parts based
  //         on category and position in the EMMA template
  //       - The [designer](design-constructs) enables to define EMMA assemblies,
  //         and simulate the cloning.
  //       - The [parts domestication app](domesticate-parts) enables to create new
  //         EMMA compatible parts (with correct overhangs, no BsmBI sites, codon optimization etc.)

  // h2 How to load your own Genetic parts

  // .reduced-width
  //   :markdown-it
  //     To use your own parts in EMMA DB, first request a user account
  //     from the [Edinburgh Genome Foundry](mailto:egf-software@ed.ac.uk).

  //     Once you have a user account log in to the [parts repository](https://emmadb.genomefoundry.org).
  //     Click on ``Create Entry/Part`` to access the form below. Make sure to provide the sequence
  //     (preferentially as a Genbank), and two additional fields ``EMMA Module``
  //     (indicating the EMMA position of the part) and ``Category``
  //     (see [here](#/about-emma#categories) for a list of accepted categories).

  //     Your part will now be available in the relevant EGF DAB design apps.

  //     ![Part submission form](static/imgs/ice_part_screenshot.png)

  // h2 How to use the designer

  // .reduced-width
  //   :markdown-it
  //     The designer has two main parts: a checklist which is used to filter out
  //     some slots of the EMMA template, and a schema of the assembly. Click
  //     on the different positions of the assembly to select parts.

  //     ![Designer screenshot](static/imgs/designer_screenshot.png)

</template>

<script>
export default {}
</script>
<style lang='scss' scoped>
.page {
  .about-title {
    width: 700px;
    max-width: 90%;
    margin-bottom: 4em;
  }
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
