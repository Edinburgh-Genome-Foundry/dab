<template lang="pug">
.construct-order-form
  el-form(label-width='30px' style='padding: 10px;', :model='form', label-position="right")
    el-form-item(:rules='formRules.name')
      template(slot='label')
        icon(name="user")
      el-input(placeholder='Your name' v-model='form.name')
    el-form-item(prop="email", :rules='formRules.email')
      template(slot='label')
          i.el-icon-message
      el-input(placeholder='Your email' v-model='form.email')
    el-form-item
      template(slot='label')
        i.el-icon-edit
      el-input(type="textarea", placeholder='Any comment ?', v-model='form.comment', :rows='8')
  center
    backend-querier.querier(
      :form='Object.assign({constructsData: constructsData}, form)',
      backendUrl='start/send_order_to_egf',
      icon='el-icon-goods',
      v-model='queriesStatus'
    )
      span(slot='button') Order
    progress-bars(:bars='queriesStatus.polling.data.bars',
                  :order="['construct']"
                  v-if='queriesStatus.polling.inProgress && queriesStatus.polling.data')
    .results(v-if='!queriesStatus.polling.inProgress')
    p {{ queriesStatus.result.message}}
    download-button(v-if='queriesStatus.result.zip_file',
                    button_text='Download assembly checking report',
                    :filedata='queriesStatus.result.zip_file')
    el-alert(v-if='queriesStatus.requestError', :title="queriesStatus.requestError",
            type="error", :closable="false")
</template>

<script>
export default {
  props: {
    constructsData: {default: () => ([])}
  },
  data () {
    return {
      form: {
        name: '',
        email: '',
        comment: '',
      },
      formRules: {
        name: [
          { required: true, message: 'Please provide a contact name', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please provide an email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
        ]
      },
      queriesStatus: {
        polling: {},
        result: {},
        requestError: ''
      }
    }
  }
}
</script>