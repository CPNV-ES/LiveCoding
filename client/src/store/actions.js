import GameManager from '@/game/GameManager'
import ProviderFactory from '@/game/providers/ProviderFactory'
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
    try {
      // window.processor = new ProcessorConnexion()
      let websocketConnexion = new WebSocket('ws://localhost:8765')
      websocketConnexion.onopen = (oEvent) => {
        console.log('WebSocket connexion opened')
        console.log(oEvent)
      }
      websocketConnexion.onclose = (cEvent) => {
        console.log('WebSocket connexion closed')
        console.log(cEvent)
      }
      websocketConnexion.onerror = (eEvent) => {
        console.log('WebSocket error')
        console.log(eEvent)
      }
      websocketConnexion.onmessage = (msgEvent) => {
        console.log('WebSocket message recieved')
        console.log(msgEvent.data)
      }
    } catch (e) {
      console.error(e)
    }
  }
}
