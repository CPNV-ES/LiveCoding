import Vue from 'vue'
import Vuex from 'vuex'

// Store parts
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

// Store modules
import console from './console'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    console
  },
  state,
  getters,
  mutations,
  actions,
  strict: true
})
