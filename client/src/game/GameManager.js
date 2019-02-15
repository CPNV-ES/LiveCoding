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
    // Loads the available interpreters
    await this.provider.loadInterpreters()
    // Loads game libraries
    await this.provider.loadLibraries()
    // Loads game classes
    await this.provider.loadGameClass()
  }
  /**
   * Responsible to start the game
   * This method instanciate the game base class declared in the game module
   */
  startGame () {
    // Create the base game class instance
    window.game = new this.provider.gameModule.Game(
      document.getElementById('game-box'),
      this.provider.assetsBasePath
    )
    // Create a key to eval commands in the game scope
    /* eslint-disable no-eval */
    window.gameCommandEval = eval
  }
}
