<template lang="pug">
.page
  h1  {{ infos.title }}
  .constructs-designer

    textarea.project-name(v-model='projectName', placeholder='(Name this project)' rows=1)


    transition-group(name='constructs-list',
                     enter-active-class='animated flipInX',
                     leave-active-class='animated fadeOut',
                     tag='div')
      construct(v-for="construct, i in $store.state.constructs",
                :construct='construct',
                :key='construct.id')



    el-tabs.main-menu.navbar

      el-tab-pane
        span(slot="label") <i class="el-icon-plus"></i> Add constructs
        el-row.add-constructs(:gutter='60')
          el-col(:lg='12', :md="12", :sm='12', :xs='24')
            h4.center Choose a template
            templates-tree(@click='function (n) {addConstruct({templateName: n})}',
                           :singleRoot='false')
          el-col(:lg='12', :md="12", :sm='12', :xs='24')
            h4.center ...or upload designs from previous projects
            files-uploader(v-model='file', :showSelected='false', :multiple='false',
                           help='Click here or drag/drop a .project',
                           text='Provide JSON designs exported from previous projects.')

      el-tab-pane(v-if='constructs.length')
        span(slot="label") <i class="el-icon-download"></i> Export project
        el-row(:gutter='30')
          el-col(:lg='8', :md="8", :sm='8', :xs='24')
            .json-querier.querier
              el-button.center(@click='downloadJSON') <icon name='download'></icon> Save the designs
          el-col(:lg='8', :md="8", :sm='8', :xs='24')
            backend-querier.querier(
              :form='{constructsData: constructsData, database_token: database_token}',
              :validateForm='validateGenbankForm',
              backendUrl='start/get_constructs_as_genbanks',
              v-model='queriesStatus.genbank'
            )
              span(slot='button') <icon name='download'></icon> Constructs sequences (.gb)
            progress-bars(:bars='queriesStatus.genbank.polling.data.bars',
                          :order="['construct']"
                          v-if='queriesStatus.genbank.polling.inProgress && queriesStatus.genbank.polling.data')
            .results(v-if='!queriesStatus.genbank.polling.inProgress')
              download-button(v-if='queriesStatus.genbank.result.zip_file',
                              button_text='Download sequences',
                              :filedata='queriesStatus.genbank.result.zip_file')
            el-alert(v-if='queriesStatus.genbank.requestError',
                     title='Program Error', :description='queriesStatus.genbank.requestError',
                     type="error", :closable="false")
          el-col(:lg='8', :md="8", :sm='8', :xs='24')

            backend-querier.querier(:form='{constructsData: constructsData, withLinkers: form.withLinkers}',
                            backendUrl='start/get_constructs_as_pdf',
                            v-model='queriesStatus.pdf')
              span(slot='button') <icon name='download'></icon> Designs as PDF
            .results(v-if='!queriesStatus.pdf.polling.inProgress')
              download-button(v-if='queriesStatus.pdf.result.pdf_file',
                              button_text='Download PDF',
                              :filedata='queriesStatus.pdf.result.pdf_file')
            el-alert(v-if='queriesStatus.pdf.requestError', :title="queriesStatus.pdf.requestError",
                     type="error", :closable="false")

      el-tab-pane(v-if='constructs.length')
        span(slot="label") <i class="el-icon-goods"></i> Order the constructs
        .form.center
          p Provide your contact informations, we will get in touch shortly.
          p
            el-input(placeholder='Name' v-model='customer.name')
          p
            el-input(placeholder='Email address', v-model='customer.email')
          p
            el-input(type="textarea", placeholder='Comment', v-model='customer.comment', :rows='8')
          backend-querier.querier(
            :form='{constructsData: constructsData, database_token: database_token, customer: customer}',
            :validateForm='validateOrderForm',
            backendUrl='start/send_order_to_egf',
            v-model='queriesStatus.order'
          )
            span(slot='button')  <i class="el-icon-goods"></i> Order the constructs
          progress-bars(:bars='queriesStatus.order.polling.data.bars',
                        :order="['construct']"
                        v-if='queriesStatus.order.polling.inProgress && queriesStatus.order.polling.data')
          .results(v-if='!queriesStatus.order.polling.inProgress')
            p {{ queriesStatus.order.result.message}}
            download-button(v-if='queriesStatus.order.result.zip_file',
                            button_text='Download assembly checking report',
                            :filedata='queriesStatus.order.result.zip_file')
            el-alert(v-if='queriesStatus.order.requestError', :title="queriesStatus.order.requestError",
                     type="error", :closable="false")
</template>

<script>
import construct from '../Constructs/Construct'
import download from 'downloadjs'
import { mapMutations, mapGetters } from 'vuex'
import utf8 from 'utf8'

var infos = {
  title: 'Design new assemblies',
  navbarTitle: 'Design',
  path: 'design',
  icon: require('assets/images/pencil.svg')
}

export default {
  data: function () {
    return {
      infos: infos,
      dialogVisible: false,
      projectName: '',
      file: {},
      database_token: this.$cookie.get('sessionId').slice(1, -1),
      form: {
        withLinkers: false,
      },
      customer: {
        name: '',
        email: '',
        comment: ''
      },
      queriesStatus: {
        pdf: {
          polling: {},
          result: {},
          requestError: ''
        },
        genbank: {
          polling: {},
          result: {},
          requestError: ''
        },
        order: {
          polling: {},
          result: {},
          requestError: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'getConstructOptionsEnabled',
      'getConstructOptionsLocked',
      'getConstructCategoriesEnabled',
      'getConstructEnabled',
      'allConstructsEmptySlots'
    ]),
    constructs () {
      return this.$store.state.constructs
    },
    constructTemplates () {
      return this.$store.state.constructTemplates
    },
    constructsData () {
      var data = {
        projectName: this.projectName,
        constructs: JSON.parse(utf8.encode(JSON.stringify(this.constructs))),
        constructTemplates: {}
      }
      var self = this
      Object.keys(this.constructTemplates).map(function (key, index) {
        data.constructTemplates[key] = self.$store.state.constructTemplates[key]
      })
      data.constructs.map(function (construct) {
        construct.categoriesEnabled = self.getConstructCategoriesEnabled(construct)
        construct.enabledSlots = self.getConstructEnabled(construct)
        console.log(construct.enabledSlots)
      })
      return data
    }
  },
  components: {
    construct,
  },
  infos: infos,
  methods: {
    ...mapMutations([
      'addConstruct',
      'loadConstructs'
    ]),
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
        console.log(emptySlots)
        errors.push('Construct #' + constructIndex + ' has empty slots (' +
                    emptySlots.join(', ') + ')')
      })
      return errors
    },
    validateOrderForm () {
      var errors = []
      if (this.customer.name === '') {
        errors.push('Name required.')
      }
      if (this.customer.email === '') {
        errors.push('Email required.')
      }
      if (this.customer.comment === '') {
        errors.push('Comment required.')
      }

      return errors
    },
    sendOrderToEGF: function () {
      var errors = this.validateSendForm()
      var subject = 'New EMMAdb order by ' + this.customer.email
      var content = this.$el.querySelector('.email').innerHTML
      if (errors.length === 0) {
        this.$http.post(
          'https://utils.genomefoundry.org/rest/sendEmail',
          {
            replyTo: this.customer.email,
            To: 'EGF_WETLAB_EMAIL_GROUP',
            subject: subject,
            body64: window.btoa(unescape(encodeURIComponent(content)))
          }, {
            emulateJSON: true
          }).then((response) => {
          // SUCCESS
          console.log('success', response)
          this.form.cart = []
          this.$message('Your order has been sent. We will contact you soon.')
        },
        function (response) {
          // FAILURE
          this.$message.error('Connexion error. Please contact the EGF if the problem persists')
        })
      }
    },
    addConstructTemplate (templateName) {
      this.addConstruct({templateName: templateName})
    }
  },
  watch: {
    'file.content': function (newval) {
      if (newval) {
        var json = JSON.parse(atob(newval.split(',')[1]))
        if (this.constructs.length === 0) {
          this.projectName = json.projectName
        }
        this.loadConstructs({constructs: json.constructs})
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

.constructs-designer {

  width: 100%;
  margin-top: 2em;
  input, textarea {
    border: none !important;
    outline: 0 !important;
    border-color: Transparent;
    font-family: 'Raleway';
    font-size: 1em;
    resize: none;
    &.title {
      font-size: 2em;
      margin-bottom: 0.1em;
      width: 100%;
      text-align: center;

    }
    &.note {
      width: 100%;
    }
  }
  textarea.project-name {
    border: none !important;
    outline: 0 !important;
    border-color: Transparent;
    font-family: 'Raleway';
    font-size: 2em;
    color: rgb(81, 107, 173);
    width: 100%;
    text-align: center;
    resize: none;
  }
  .file-operations {
    text-align: center;
    .file-link {
      display: inline;
      font-size: 1em;
      border: none;
      margin-right: 1em;
    }
    margin-bottom: 2.5em;
  }
  .el-dropdown-menu__item {
    font-family: 'Raleway' !important;

  }

  .constructs-list-move {
    transition: transform 1s;
  }
  .collapsible-button-move {
    transition: transform 1s;
  }
  .hidden {
    visibility: hidden;
    margin: 0;
  }
}
.genbank-querier, .pdf-querier, .order-querier {

  &.withbackground {
    padding: 1em;
    border-radius: 1em;
    border: 2px solid grey;
    width: 80%;
    margin-left: 10%;
    margin-top: 1em;
  }
}

.main-menu {
  margin-top: 2em;
}

</style>
