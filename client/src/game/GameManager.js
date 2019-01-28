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
    // Loads the manifest of the game (from the external source)
    await this.provider.loadManifest()
    // Loads game classes
    await this.provider.loadGameClass()
  }
  /**
   * Loads the game
   */
  async startGame () {
    // Create the base game class instance
    window.game = new this.provider.gameModule.Game(
      document.getElementById('game-box'),
      this.provider.assetsBasePath
    )
  }
}
