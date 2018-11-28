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
    },
    /**
     * Information form the current loaded game
     */
    game: {
      type: 'github',
      url: 'https://github.com/bastiennicoud/LiveCoding-Block-Game'
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
    /**
     * Loads a game in the app
     */
    load () {

    },
    /**
     * Run the current code for the current game
     *
     * - launch the socket connexion
     * - send the code
     * - execute commands
     * - clode the connexion
     */
    run () {

    }
  }
})
