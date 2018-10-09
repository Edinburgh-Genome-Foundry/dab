<template lang="pug">
.construct-export-form
  .json-querier.querier
    el-button(@click='downloadJSON' icon='el-icon-download') JSON (for later use)

  backend-querier.querier(
    :form='{constructsData, projectName, iceAuthentication: $iceClient.getSimplifiedAuth()}',
    :validateForm='validateGenbankForm',
    backendUrl='start/get_constructs_as_genbanks',
    v-model='genbankQueriesStatus'
    icon='el-icon-download'
  )
    span(slot='button') Genbank (final sequences)
  progress-bars(:bars='genbankQueriesStatus.polling.data.bars',
                :order="['construct']",
                v-if='polling.genbank && genbankQueriesStatus.polling.data')
  .results(v-if='!polling.genbank')
    download-button(v-if='genbankQueriesStatus.result.zip_file',
                    button_text='Download sequences',
                    :filedata='genbankQueriesStatus.result.zip_file')
  el-alert(v-if='genbankQueriesStatus.requestError',
            title='Program Error', :description='genbankQueriesStatus.requestError',
            type="error", :closable="false")


  backend-querier.querier(:form='{constructsData}',
                  backendUrl='start/get_constructs_as_pdf',
                  v-model='pdfQueriesStatus'
                  icon='el-icon-download')
    span(slot='button') PDF schemas
  .results(v-if='!polling.pdf')
    download-button(v-if='pdfQueriesStatus.result.pdf_file && (!polling.pdf)',
                    button_text='Download PDF',
                    :filedata='pdfQueriesStatus.result.pdf_file')
  el-alert(v-if='pdfQueriesStatus.requestError', :title="pdfQueriesStatus.requestError",
            type="error", :closable="false")
</template>

<script>
import download from 'downloadjs'
import { mapGetters } from 'vuex'

export default {
  props: {
    constructsData: {default: () => ([])},
    projectName: {default: ''}
  },
  data () {
    return {
      pdfQueriesStatus: {
        polling: {},
        result: {},
        requestError: ''
      },
      genbankQueriesStatus: {
        polling: {},
        result: {},
        requestError: ''
      }
    }
  },
  methods: {
    downloadJSON () {
      download(
        JSON.stringify(this.constructsData, null, ' '),
        'constructs.json',
        'application/json;charset=utf8'
      )
    },
    validateGenbankForm () {
      var errors = []
      var self = this
      console.log(this.allConstructsEmptySlots)
      Object.keys(this.allConstructsEmptySlots).map(function (constructIndex) {
        var emptySlots = self.allConstructsEmptySlots[constructIndex]
        errors.push('Construct #' + constructIndex + ' has empty slots (' +
                    emptySlots.join(', ') + ')')
      })
      return errors
    },
  },
  computed: {
    ...mapGetters([
      'allConstructsEmptySlots'
    ]),
    polling () {
      return {
        pdf: this.pdfQueriesStatus.polling.inProgress,
        genbank: this.genbankQueriesStatus.polling.inProgress
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.querier /deep/ {
  button {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    font-size: 16px;
    border: none;
    font-weight: normal;
  }
}
</style>