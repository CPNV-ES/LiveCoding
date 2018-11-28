import Vue from 'vue'
import Vuex from 'vuex'
import GameManager from '@/game/GameManager'
import { logError } from '@/console/DevConsole'

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
      provider: 'github',
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
    async load ({ state }) {
      try {
        let gameManager = new GameManager({
          provider: state.game.provider,
          url: state.game.url
        })
        await gameManager.loadGame()
      } catch (e) {
        logError('Error during Game loading !', e)
      } finally {
        //
      }
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
