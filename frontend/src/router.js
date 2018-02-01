import Vue from 'vue'
import VueRouter from 'vue-router'
import scenarios from './components/scenarios/scenarios'
import Home from './components/pages/Home'
// import auth from './auth'
// import BootstrapVue from 'bootstrap-vue'

// Globally register bootstrap-vue components

Vue.use(VueRouter)

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
  component: require('./components/pages/About-EMMA').default,
  meta: {
    title: 'EMMA-DB - About EMMA',
    description: 'About the EMMA assembly standard'
  }
}, {
  path: '/help',
  component: require('./components/pages/Help').default,
  meta: {
    title: 'EMMA-DB - Help',
    description: 'How to use EMMA-DB'
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

// function guardRoute (to, from, next) {
//   // work-around to get to the Vuex store (as of Vue 2.0)
//   const auth = router.app.$options.store.state.auth
//
//   if (!auth.isLoggedIn) {
//     next({
//       path: '/login',
//       query: { redirect: to.fullPath }
//     })
//   } else {
//     next()
//   }
// }
/* eslint-disable no-new */
export default router
