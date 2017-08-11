<template lang="pug">
div
  h1  {{ infos.title }}
  img.icon.center-block(slot='title-img', :src='infos.icon')
  sequencedesigner
  //-
  //- .form
  //-   h4.formlabel What do you want to compute ?
  //-   el-select(v-model='form.goal', placeholder='Select')
  //-     el-option(v-for='item in goal_options', :label='item.label',
  //-               :value='item.value', :key='item.value')
  //-
  //-   p.inline Differences between overhangs:
  //-     el-input-number.inline(v-model="form.overhangs_differences", size="small",
  //-                            :min=1, :max=4)
  //-     helper(help='Number of basepairs by which every overhang pair should differ (this includes reverse complements).')
  //-
  //-     p.inline GC(%) of the overhangs {{ form.gc_content[0] }} to {{ form.gc_content[1] }}:
  //-       el-slider(range show-stops v-if="" v-model='form.gc_content',
  //-                      :max=100, :min=0, :step=25)
  //-
  //-   h4.formlabel Forbidden overhangs
  //-   el-select(v-model='form.forbidden_overhangs',
  //-             placeholder='Enter any forbidden overhangs e.g. ATGC, GCTA, ...',
  //-             filterable, :multiple='true')
  //-     el-option(v-for='overhang in overhangs', :label='overhang', :value='overhang', :key='overhang')
  //-
  //-   div(v-if="form.goal === 'overhangs_collection'")
  //-     h4.formlabel Mandatory overhangs
  //-     el-select(v-model='form.mandatory_overhangs', placeholder='Enter any mandatory overhangs e.g. ATGC, GCTA, ...',
  //-               filterable, :multiple='true')
  //-       el-option(v-for='overhang in overhangs', :label='overhang', :value='overhang', :key='overhang')
  //-
  //-   div(v-if="form_goal === 'sequence_decomposition'")
  //-     sequencesuploader(v-model='form.sequence', text="Drop a single file (or click to select)", :multiple='false')
  //-   backend-querier(:form='form', :backendUrl='infos.backendUrl',
  //-                   :validateForm='validateForm', submitButtonText='Evaluate',
  //-                   v-model='queryStatus')
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
