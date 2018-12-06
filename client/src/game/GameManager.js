/**
 * The GameManager is the orchestrator of the game
 * He is responsible of :
 * - Loading the game from provider
 * - Run the game
 * - Execute commands from the processor
 * - destroying the game
 *
 * @class
 * @author Bastien Nicoud
 */
export default class GameManager {
  /**
   * Constructor
   * @param {Provider} provider
   */
  constructor (provider) {
    this.provider = provider
  }
  /**
   * Loads the game
   */
  async loadGame () {
    await this.provider.loadManifest()
  }
  /**
   * Loads the game
   */
  startGame () {
    //
  }
}
