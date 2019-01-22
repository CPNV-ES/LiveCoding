import GameManager from '@/game/GameManager'
import ProviderFactory from '../game/providers/ProviderFactory'

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
      // The game manager is the main class that manage the current game
      // The provider provide methods to get the datas of the game
      // The game manager is stored under the window object, thats allows to easily acces it
      window.gameManager = new GameManager(
        ProviderFactory.create(state.game.provider, state.game.url)
      )
      await window.gameManager.loadGame()
      commit('SET_GAME_MANAGER', window.gameManager)
      dispatch('console/success', 'OK, Game loaded !')
      window.gameManager.startGame()
      dispatch('console/success', 'OK, Game started, ready to go !')
    } catch (e) {
      console.error(e)
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

  }
}
