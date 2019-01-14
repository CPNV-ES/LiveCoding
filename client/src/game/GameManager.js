import { log } from '@/console/GameConsole'
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
    await this.provider.loadGame()
  }
  /**
   * Loads the game
   */
  async startGame () {
    // Each game must have a entry class, thi class will be used to access the game
    // TODO :
    // - Load the context of the game (with js module)
    // - loads the game context (suported languages)
    // - Create the game class
    log({
      text: 'startGame() yeahh',
      type: 'log',
      time: new Date()
    })
  }
}
