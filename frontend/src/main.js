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
import store from './store'
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
  component: Home,
  meta: {
    title: 'EMMA-DB - Home',
    description: 'Store design and order EMMA constructs and parts'
  }
}, {
  path: '/about-emma',
  component: require('./components/pages/About-EMMA'),
  meta: {
    title: 'EMMA-DB - About EMMA',
    description: 'About the EMMA assembly standard'
  }
}, {
  path: '/help',
  component: require('./components/pages/Help'),
  meta: {
    title: 'EMMA-DB - Help',
    description: 'How to use EMMA-DB'
  }
}, {
  path: '/login',
  component: require('./auth/Login'),
  meta: {
    title: 'EMMA-DB - Login',
    description: 'Login'
  }
}
]

scenarios.list.forEach(function (scenario) {
  routes.push({
    path: '/' + scenario.infos.path,
    component: scenario,
    meta: {
      title: scenario.infos.title + '- EMMA-DB',
      description: 'EMMA-DB is a website of the EGF}'
    }
  })
})

routes.push({
  path: '*',
  component: Home,
  meta: {
    title: 'EMMA-DB - Home',
    description: 'Store design and order EMMA constructs and parts'
  }
})

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

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
