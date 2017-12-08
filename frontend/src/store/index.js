import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import { state } from './state'
import { getters } from './getters'
// import plugins from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  // plugins
})
