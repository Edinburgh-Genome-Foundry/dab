<template lang="pug">
.page
  h1  {{ infos.title }}
  constructsdesigner

  collapsible-button.query-button(v-if='constructs.length' text='Export project')
    .querier
      el-button.center(@click='downloadJSON') <icon name='download'></icon> As JSON
    backend-querier.querier(:form='{constructs: constructs}',
                    backendUrl='start/get_constructs_as_genbanks',
                    v-model='queryStatus')
      span(slot='button') <icon name='download'></icon> As Genbank


    backend-querier.querier(:form='{constructs: constructs, withLinkers: form.withLinkers}',
                    backendUrl='start/get_constructs_as_pdf',
                    v-model='queryStatus')
      span(slot='button') <icon name='download'></icon> As PDF
    .center.checkbox
      el-checkbox(v-model='form.withLinkers') (include linkers)
  collapsible-button(v-if='constructs.length' text='Send order to EGF...')
    p Provide your contact informations, we will contact you shortly
    el-input(placeholder='Name')
    el-input(placeholder='Email address')
    el-input(type="textarea", placeholder='Comments')
    backend-querier.querier(:form='{constructs: constructs}',
                    backendUrl='start/get_constructs_as_genbanks',
                    v-model='queryStatus')
      span(slot='button') <icon name='envelope-o'></icon> Send

  el-alert(v-if='queryStatus.requestError', :title="queryStatus.requestError",
           type="error", :closable="false")
  .results(v-if='!queryStatus.polling.inProgress')
    download-button(v-if='queryStatus.result.file',
                    :filedata='queryStatus.result.file')
    .results-summary(v-if='queryStatus.result.preview',
                     v-html="queryStatus.result.preview.html")
</template>

<script>
import learnmore from '../widgets/LearnMore'
import constructsdesigner from '../SequenceDesigner/ConstructsDesigner'
import CollapsibleButton from '../widgets/CollapsibleButton'
import download from 'downloadjs'

var infos = {
  title: 'Design constructs',
  navbarTitle: 'Design constructs',
  path: 'design-constructs',
  backendUrl: 'start/simulate_cloning',
  description: '',
  icon: require('assets/images/pencil.svg')
}

export default {
  data: function () {
    return {
      infos: infos,
      form: {
        database_token: this.$cookie.get('sessionId').slice(1, -1),
        withLinkers: false,
        userName: '',
        userEmail: ''
      },
      queryStatus: {
        polling: {},
        result: {},
        requestError: ''
      }
    }
  },
  // computed: {
  //   emptySlots: function () {
  //     return Object.values(this.design.slotsData).some(function (slot) {
  //       return ((slot.selectedParts.length === 0) && slot.checklistEnabled &&
  //               (slot.userEnabled || slot.checklistLocked))
  //     })
  //   }
  // },
  computed: {
    constructs () {
      return this.$store.state.constructs
    }
  },
  components: {
    constructsdesigner,
    learnmore,
    'collapsible-button': CollapsibleButton
  },
  infos: infos,
  methods: {
    downloadJSON: function () {
      console.log('blaaaaaaaaaaaaaaaaaaaaaa')
      download(JSON.stringify(this.constructs, null, ' '), 'constructs.json')
    }
  },
  watch: {
    design: {
      deep: true,
      handler: function (newval) {
        var partsIds = []
        Object.values(newval.slotsData).map(function (val) {
          if (val.checklistEnabled && (val.checklistLocked || val.userEnabled)) {
            val.selectedParts.map(function (val2) {
              if (partsIds.indexOf(val2.dbId) < 0) {
                partsIds.push([val2.dbId, val2.dbName])
              }
            })
          }
        })
        this.form.parts_ids = partsIds
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.querier /deep/ {
  button {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    font-size: 16px;
    border: none;

    font-weight: bold;
  }
}
.page {
  width: 90%;
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

.checkbox {
  margin-top: -1em;
}

.el-input, .el-textarea {
  margin-top: 1em;
  width: 90%;
  max-width: 400px;
}

.el-select {
  width: 100%
}
</style>
