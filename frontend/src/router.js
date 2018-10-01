import Vue from 'vue'
import VueRouter from 'vue-router'
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
    title: 'EGF DAB - Home',
    description: 'Design and Build with the Edinburgh Genome Foundry'
  }
}, {
  path: '/about',
  component: require('./components/pages/Help').default,
  meta: {
    title: 'EGF DAB - Help',
    description: 'How to use EGF DAB'
  }
}, {
  path: '/manage_parts',
  component: require('./components/pages/ManageParts').default,
  meta: {
    title: 'Manage Parts',
    description: 'EGF DAB: Manage parts'
  }
}, {
  path: '/design_assemblies',
  component: require('./components/pages/DesignAssemblies').default,
  meta: {
    title: 'Design Assemblies',
    description: 'EGF DAB: Design Assemblies'
  }
}]

routes.push({
  path: '*',
  component: Home,
  meta: {
    title: 'EGF DAB - Home',
    description: 'Design and Build with the Edinburgh Genome Foundry'
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
