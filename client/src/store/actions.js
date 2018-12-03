import GameManager from '@/game/GameManager'
import { logError } from '@/console/DevConsole'
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
