import GameManager from '@/game/GameManager'
import ProviderFactory from '../game/providers/ProviderFactory'

/**
 * Actions for the vuex store
 * @module
 * @author Bastien Nicoud
 */
export default {
  /**
   * Loads a game in the app
   */
  async load ({ state, commit, dispatch }) {
    try {
      let gameManager = new GameManager(ProviderFactory.create(state.game.provider, state.game.url))
      await gameManager.loadGame()
      commit('SET_GAME_MANAGER', gameManager)
      dispatch('console/success', 'OK, Game loaded !')
      gameManager.startGame()
      dispatch('console/success', 'OK, Game started, ready to go !')
    } catch (e) {
      commit('console/ADD_MESSAGE', {
        text: 'Error during Game loading !',
        payload: e,
        type: 'error',
        time: new Date()
      }, { root: true })
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
