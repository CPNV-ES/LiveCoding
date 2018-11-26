import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /**
     * Stores all editor related datas
     */
    editor: {
      theme: 'vs-dark',
      language: 'javascript',
      // The value of the editor (the code)
      value: 'console.log(tutu)'
    }
  },
  mutations: {
    UPDATE_EDITOR_VALUE: (state, value) => {
      state.editor.value = value
    },
    UPDATE_EDITOR_THEME: (state, value) => {
      state.editor.theme = value
    },
    UPDATE_EDITOR_LANGUAGE: (state, value) => {
      state.editor.language = value
    }
  },
  actions: {

  }
})
