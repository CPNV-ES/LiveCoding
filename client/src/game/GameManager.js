import { GameManifestValidator } from './GameManifestValidator'

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
    // Check the manifest validity
    let validator = new GameManifestValidator(this.provider.manifest)
    // Validate format
    validator.checkFormat()
    // Check if specified languages are compatible
    validator.checkLanguages()
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
   *
   * Change the game api, this method must be asynchronus
   */
  startGame (console) {
    // Create the base game class instance
    window.game = new this.provider.gameModule.Game({
      element: document.getElementById('game-box'),
      assetsBasePath: this.provider.assetsBasePath,
      console: console
    })
  }
}
