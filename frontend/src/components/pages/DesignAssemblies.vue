<template lang="pug">
.page

  h1.app-title Design assemblies

  .constructs-designer

    el-container
      el-aside(width="300px")
        .menu-container
          el-menu
            el-submenu(index='0')
              template(slot="title")
                i(class="el-icon-plus")
                span Add a construct
              templates-tree(@click='function (n) {addConstruct({templateName: n})}',
                             :singleRoot='false')
            
            el-submenu(index='1')
              template(slot="title")
                i(class="el-icon-upload2")
                span Upload constructs
              constructs-upload-form(@input='projectName=e.value')
            
            el-submenu(index='2', :disabled='constructs.length === 0')
              template(slot="title")
                i(class="el-icon-download")
                span Export project
              constructs-export-form(:constructsData='constructsData',
                                     :projectName='projectName')

            el-submenu(:disabled='constructs.length === 0' , index='3')
              template(slot="title")
                  i(class="el-icon-goods")
                  span Order
              constructs-order-form(:constructsData='constructsData')
      
      el-main.constructs-container(style="overflow: hidden")
        textarea.project-name(v-model='projectName', placeholder='(Name this project)' rows=1)

        transition-group(name='constructs-list',
                        enter-active-class='animated flipInX',
                        leave-active-class='animated zoomOutRight',
                        tag='div')
          construct(v-for="construct, i in $store.state.constructs",
                    :construct='construct',
                    :key='construct.id')
        
</template>

<script>
import utf8 from 'utf8'
import { mapMutations, mapGetters } from 'vuex'
import construct from '../Constructs/Construct'
import ConstructsOrderForm from '../forms/ConstructsOrderForm'
import ConstructsUploadForm from '../forms/ConstructsUploadForm'
import ConstructsExportForm from '..//forms/ConstructsExportForm'

var infos = {
  title: 'Design Assemblies',
  navbarTitle: 'Design Assemblies',
  path: 'design_assemblies',
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
    },
  },
  components: {
    construct,
    'constructs-order-form': ConstructsOrderForm,
    'constructs-upload-form': ConstructsUploadForm,
    'constructs-export-form': ConstructsExportForm
  },
  infos: infos,
  methods: {
    ...mapMutations([
      'addConstruct',
    ]),
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
  }
}
</script>

<style lang='scss' scoped>

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
    margin-top: 0em;
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

.menu-container {
  position: fixed;
  display: block;
  width: 300px;
  overflow-y: auto;
  height: 60vh;
  
  /deep/ .el-submenu__title {
    background: #f0fcff;
  }
  /deep/ .el-submenu > .el-menu {
    margin: 20px;
  }
  /deep/ .el-form-item__label:before {
    display: none;
  }
}

.constructs-container {
  padding: 0;
  margin-left: 10px;
  
}

</style>
