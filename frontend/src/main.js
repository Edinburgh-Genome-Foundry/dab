import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import App from './App'
import widgets from './components/widgets'
import VueCookie from 'vue-cookie'
import Icon from 'vue-awesome/components/Icon'
import store from './store'
import router from './router'
import 'vue-awesome/icons'
// import auth from './auth'
// import BootstrapVue from 'bootstrap-vue'

// Globally register bootstrap-vue components

Vue.use(VueResource)
Vue.use(ElementUI, { locale })
Vue.use(widgets)
Vue.use(VueCookie)
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
})
