import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import App from './App'
import scenarios from './components/scenarios/scenarios'
import widgets from './components/widgets'
import VueCookie from 'vue-cookie'
import Home from './components/pages/Home'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'
// import auth from './auth'
// import BootstrapVue from 'bootstrap-vue'

// Globally register bootstrap-vue components

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(widgets)
Vue.use(VueCookie)
Vue.component('icon', Icon)

// Check the users auth status when the app starts
// auth.checkAuth()

const routes = [{
  path: '/home',
  component: Home
}, {
  path: '/about-emma',
  component: require('./components/pages/About-EMMA')
}, {
  path: '/help',
  component: require('./components/pages/Help')
}, {
  path: '/login',
  component: require('./auth/Login')
}
]

scenarios.list.forEach(function (scenario) {
  routes.push({ path: '/' + scenario.infos.path, component: scenario })
})
routes.push({
  path: '*',
  component: Home
})

console.log(routes)
const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
})
