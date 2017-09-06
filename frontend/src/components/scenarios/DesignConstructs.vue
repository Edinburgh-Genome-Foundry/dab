<template lang="pug">
div
  h1  {{ infos.title }}
  //- img.icon.center-block(slot='title-img', :src='infos.icon')
  sequencedesigner
  el-button.center(type='primary', :disabled='emptySlots') {{ emptySlots ? 'Some slots are empty' : 'Get sequence(s)' }}
</template>

<script>
import learnmore from '../widgets/LearnMore'
import sequencedesigner from '../SequenceDesigner/SequenceDesigner'

var infos = {
  title: 'Design constructs',
  navbarTitle: 'Design constructs',
  path: 'design-constructs',
  description: '',
  icon: require('assets/images/pencil.svg')
}

export default {
  data: function () {
    return {
      infos: infos,
      form: {
      },
      queryStatus: {
        polling: {},
        result: {},
        requestError: ''
      },
      goal_options: [
        {
          label: 'A collection of compatible overhangs',
          value: 'overhangs_collection'
        },
        {
          label: 'A sequence decomposition, with compatible overhangs',
          value: 'sequence_decomposition'
        }
      ]
    }
  },
  computed: {
    emptySlots: function () {
      return true
    }
  },
  components: {
    sequencedesigner,
    learnmore
  },
  infos: infos,
  methods: {
    handleSuccess: function (evt) {
      console.log(evt)
    }
  }
}
</script>

<style scoped>

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
</style>
