import Vue from 'vue'
import Vuex from 'vuex'
import GameManager from '@/game/GameManager'
import { logError } from '@/console/DevConsole'
import ProviderFactory from './game/providers/ProviderFactory'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /**
     * Stores all editor related datas
     * @type {Object}
     */
    editor: {
      /**
       * Default theme (on first load)
       * @type {String}
       * */
      theme: 'solarized-dark',
      /**
       * Default selected language
       * @type {String}
       */
      language: 'ruby',
      // Mapping between the language and the content of the editor
      languagesContent: {
        javascript: `let tutu = 'Bienvenue sur LiveCoding'\ndebugger.log(tutu)\n`,
        ruby: `tutu = 'Bienvenue sur LiveCoding'\ndebugger.log tutu\n`,
        php: `<?php\n$tutu = 'Bienvenue sur LiveCoding';\n$debugger->log($tutu);\n`,
        python: `tutu = 'Bienvenue sur LiveCoding'\ndebugger.log(tutu)\n`
      }
    },
    /**
     * Information form the current loaded game
     */
    game: {
      provider: 'url',
      url: 'http://localhost:3333'
    }
  },
  getters: {
    /**
     * Get the editor content depending the current selected language
     * @return {String}
     */
    editorContent: state => state.editor.languagesContent[state.editor.language]
  },
  mutations: {
    /**
     * Update the current editor content according to the selected language
     * @param {String} value
     */
    UPDATE_EDITOR_CONTENT: (state, value) => {
      state.editor.languagesContent[state.editor.language] = value
    },
    /**
     * Change the editor theme
     * @param {String} value
     */
    UPDATE_EDITOR_THEME: (state, value) => {
      state.editor.theme = value
    },
    /**
     * Change the editor language
     * @param {String} value
     */
    UPDATE_EDITOR_LANGUAGE: (state, value) => {
      state.editor.language = value
    },
    /**
     * Change the editor language
     * @param {String} value
     */
    UPDATE_GAME_URL: (state, value) => {
      state.game.url = value
    },
    /**
     * Change the editor language
     * @param {String} value
     */
    UPDATE_GAME_PROVIDER: (state, value) => {
      state.game.provider = value
    }
  },
  actions: {
    /**
     * Loads a game in the app
     */
    async load ({ state }) {
      try {
        let gameManager = new GameManager(ProviderFactory.create(state.game.provider, state.game.url))
        await gameManager.loadGame()
      } catch (e) {
        logError('Error during Game loading !', e)
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
