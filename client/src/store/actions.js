import GameManager from '@/game/GameManager'
import ProviderFactory from '@/game/providers/ProviderFactory'
import { ProcessorProxyFactory } from '@/processor/ProcessorProxyFactory'
// import ProcessorConnexion from '@/game/processor/ProcessorConnexion'

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
      window.gameManager.startGame()
      dispatch('console/success', 'OK, Game started, ready to go !')
    } catch (e) {
      console.error(e)
      // Display little message in the game box
      document.getElementById('game-box').innerHTML = 'Aucun jeu chargé !'
      dispatch('console/error', 'Error during Game loading !')
      throw new Error()
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
      window.processorProxy.launchExecution()
      dispatch('console/success', 'Process corectly executed !')
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
  }
}
