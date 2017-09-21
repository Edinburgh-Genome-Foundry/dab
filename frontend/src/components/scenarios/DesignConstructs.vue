<template lang="pug">
div
  h1  {{ infos.title }}
  //- img.icon.center-block(slot='title-img', :src='infos.icon')
  sequencedesigner(v-model='design')
  backend-querier(:form='form', :backendUrl='infos.backendUrl',
                  :validateForm='validateForm', submitButtonText='Get design sequence(s)',
                  v-model='queryStatus')
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
import sequencedesigner from '../SequenceDesigner/SequenceDesigner'
import emma from '../SequenceDesigner/EMMA'
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
    var slotsData = {}
    emma.slotNames.map(function (slotName) {
      slotsData[slotName] = {
        userEnabled: true,
        selectedParts: [],
        zone: emma.slotInfos[slotName].zone[0]
      }
    })
    return {
      infos: infos,
      design: {
        slotsData: slotsData,
        checklist: emma.checklistDefaults
      },
      form: {
        database_token: this.$cookie.get('sessionId').slice(1, -1),
        parts_ids: []
      },
      queryStatus: {
        polling: {},
        result: {},
        requestError: ''
      }
    }
  },
  computed: {
    emptySlots: function () {
      return Object.values(this.design.slotsData).some(function (slot) {
        return ((slot.selectedParts.length === 0) && slot.checklistEnabled &&
                (slot.userEnabled || slot.checklistLocked))
      })
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
    },
    validateForm: function () {
      var errors = []
      if (this.emptySlots) {
        errors.push('Cannot compute sequences when there are empty slots.')
      }
      return errors
    }
  },
  watch: {
    design: {
      deep: true,
      handler: function (newval) {
        var partsIds = []
        Object.values(newval.slotsData).map(function (val) {
          val.selectedParts.map(function (val2) {
            if (partsIds.indexOf(val2.dbId) < 0) {
              partsIds.push(val2.dbId)
            }
          })
        })
        this.form.parts_ids = partsIds
      }
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
