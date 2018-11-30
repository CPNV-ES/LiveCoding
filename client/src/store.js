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
      // Default theme
      theme: 'solarized-dark',
      // Default selected language
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
      provider: 'github',
      url: 'https://github.com/bastiennicoud/LiveCoding-Block-Game'
    }
  },
  getters: {
    editorContent: state => {
      return state.editor.languagesContent[state.editor.language]
    }
  },
  mutations: {
    UPDATE_EDITOR_CONTENT: (state, value) => {
      state.editor.languagesContent[state.editor.language] = value
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
