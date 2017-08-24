<template lang="pug">
.domesticate-parts

  h1 Domesticate Parts
  .minischema
    h3 Select a slot
    minipartslot(v-for='slotName in slotNames', :zone='slots[slotName].zone', :key='slotName',
                 :size='16', :categories='slots[slotName].categories', :slotName='slotName', @click='selectCategory')
  .part-domesticator(v-if='selectedSlot')
    h2 New <b>{{selectedSlot.category}}</b> <br /> at position {{selectedSlot.slotName}}
    .slots-info
    p.
      Slot with overhangs <b>{{slots[selectedSlot.slotName].overhangs.left}}──{{slots[selectedSlot.slotName].overhangs.right}}</b>,
      for {{slots[selectedSlot.slotName].categories.join(' or ')}} parts.
      {{slots[selectedSlot.slotName].infos}}
    el-radio(v-model='sequenceInputType' label='file') Upload a file
    el-radio(v-model='sequenceInputType' label='text') Enter a sequence

    files-uploader.file-uploader(v-if="sequenceInputType == 'file'", v-model='sequenceFile',
                                 :multiple='false', help='Upload a Genbank or Fasta file')
    el-input(v-if="sequenceInputType == 'text'", v-model='sequenceText', type="textarea",
            :rows="5", placeholder="Enter or paste a sequence, e.g. ATTGTGCCA...")
    .subform(v-if='sequenceFile || sequenceText.length')
      .div
        el-checkbox(v-model='polishSequence') Polish the sequence
      .polish-sequence(v-if='polishSequence')
      .div
        el-checkbox(v-model='addToRepo') Save to repo
      .add-to-repo(v-if='addToRepo')
        el-input(placeholder='Sequence name')
        .submit-button
           el-button(type='primary') Save
</template>

<script>
import learnmore from '../../components/widgets/LearnMore'
import minipartslot from '../SequenceDesigner/MiniPartSlot'
import emma from '../SequenceDesigner/EMMA'
var infos = {
  title: 'Domesticate parts',
  navbarTitle: 'Domesticate parts',
  path: 'domesticate-parts',
  description: '',
  icon: require('assets/images/diamond.svg')
}

export default {
  data: function () {
    return {
      slots: emma.slotInfos,
      slotNames: emma.slotNames,
      selectedSlot: null,
      sequenceFile: null,
      sequenceText: '',
      sequenceInputType: 'file',
      polishSequence: false,
      addToRepo: false
    }
  },
  components: {
    minipartslot,
    learnmore,
  },
  infos: infos,
  methods: {
    selectCategory: function (slot, category) {
      this.selectedSlot = {slotName: slot, category: category}
    }
  }
}
</script>

<style lang='scss' scoped>
.domesticate-parts {

  .part-domesticator {
    width: 80%;
    margin-left: 10%;
    h2 {
      font-size: 1.5em;
      b {
        font-weight: bold;

      }
    }
    p.overhangs {
      margin-top: -1em;
      color: #666;
    }
    .add-to-repo {
      margin-top: 1em;
      width: 80%;
      margin-left: 10%;
      .el-input {
        margin-bottom: 1em;
      }
    }
  }
}

h4.formlabel {
  text-align: center;
  text-transform: uppercase;
  margin-top: 40px
}

.form {
  margin: 50px auto;
  max-width: 500px;
}

.title-img {
  height:80px;
  margin-top: -20px;
  margin-bottom: 20px;

}

.el-checkbox {
  font-weight: normal;
}

.el-select {
  width: 100%
}

.enzymes-radio {
  width: 400px;
  margin: 0 auto;
  .el-radio {
    margin-bottom: 20px;
  }
}
</style>
