import GameManager from '@/game/GameManager'
import ProviderFactory from '@/game/providers/ProviderFactory'
import { ProcessorProxyFactory } from '@/processor/ProcessorProxyFactory'
import { saveAs } from 'file-saver'
import { languagesExtensions } from './languagesExtensions'
import { Snackbar } from 'buefy/dist/components/snackbar'

/**
 * Actions for the vuex store
 * @module
 * @author Bastien Nicoud
 */
export default {
  /**
   * Loads a game in the app (when the user click on the load button)
   */
  async load ({ state, commit, dispatch }) {
    try {
      commit('SET_GAME_LOADING_STATE', true)
      // Clear the content of the game box
      document.getElementById('game-box').innerHTML = ''
      // Create a new game manager for the game
      window.gameManager = new GameManager(
        // Load the right provider depending to the selection
        ProviderFactory.create(state.game.provider, state.game.url)
      )
      // Load the game manifest and datas
      await window.gameManager.loadGame()
      commit('SET_GAME_MANAGER', window.gameManager)
      dispatch('console/success', 'OK, Game loaded !')
      // Launch the game
      window.gameManager.startGame({
        info: (m) => dispatch('console/info', m),
        log: (m) => dispatch('console/log', m),
        success: (m) => dispatch('console/success', m),
        warning: (m) => dispatch('console/warning', m),
        error: (m) => dispatch('console/error', m)
      })
      dispatch('console/success', 'OK, Game started, ready to go !')
    } catch (e) {
      console.error(e)
      // Display little message in the game box
      document.getElementById('game-box').innerHTML = 'Aucun jeu chargé !'
      dispatch('console/error', 'Error during Game loading !')
      commit('CLEAR_GAME_MANAGER')
      throw new Error()
    } finally {
      commit('SET_GAME_LOADING_STATE', false)
    }
  },
  /**
   * Run the current code for the current game
   *
   * - launch the socket connexion
   * - send the code
   * - execute commands
   * - close the connexion
   */
  async run ({ state, dispatch }) {
    try {
      dispatch('console/info', 'Running, try to contact processor.')
      // Get the right processor proxy depending the language
      window.processorProxy = ProcessorProxyFactory.create(state.editor.language, {
        dispatch: dispatch,
        processorUrl: state.processor.url,
        language: state.editor.language,
        interpreter: window.gameManager.provider.interpreters[state.editor.language],
        userScript: state.editor.languagesContent[state.editor.language]
      })
      await window.processorProxy.launchExecution()
      dispatch('console/info', 'Process terminated !')
    } catch (e) {
      dispatch('console/error', 'Error during process execution.')
      throw new Error()
    }
  },
  /**
   * Stop the execution of the process
   */
  stop ({ dispatch }) {
    dispatch('console/info', 'Stopping the process.')
    window.processorProxy.stopExecution()
  },
  /**
   * Save the content of the current editor in a file
   */
  async saveEditorContent ({ state }) {
    const file = new File(
      [state.editor.languagesContent[state.editor.language]],
      `livecoding.${languagesExtensions[state.editor.language]}`,
      { type: 'text/plain;charset=utf-8' }
    )
    saveAs(file)
  },
  /**
   * Import a file in the current editor language
   */
  importEditorContent ({ commit, dispatch, state }, fileList) {
    if (state.game.loaded) {
      let file = fileList[0]
      let fileExtension = file.name.split('.').pop()
      // Check file extension
      if (ProcessorProxyFactory.processorProxies.map(e => e.name).includes(Object.keys(languagesExtensions).find(key => languagesExtensions[key] === fileExtension))) {
        dispatch('console/info', 'Fichier supporté')
        // Get file
        let fr = new FileReader()
        // Declare onload callback
        fr.onload = (e) => {
          console.log(e.target.result)
          commit('UPDATE_EDITOR_CONTENT', e.target.result)
          // Reset the editor value directly on the editor instance
          // Nesesary because the editor component can not watch the editor content state
          window.scriptEditor.getModel().setValue(e.target.result)
        }
        fr.readAsText(fileList[0])
        commit('UPDATE_EDITOR_LANGUAGE', Object.keys(languagesExtensions).find(key => languagesExtensions[key] === fileExtension))
      } else {
        Snackbar.open({
          message: 'Language non supporté.',
          type: 'is-warning',
          position: 'is-top',
          actionText: 'OK',
          duration: 4500
        })
        dispatch('console/warning', 'Language non supporté.')
      }
    } else {
      Snackbar.open({
        message: "Vous ne pouvez pas importer de fichier si aucun jeux n'est chargé.",
        type: 'is-warning',
        position: 'is-top',
        actionText: 'OK',
        duration: 4500
      })
      dispatch('console/warning', "Vous ne pouvez pas importer de fichier si aucun jeux n'est chargé.")
    }
  }
}
