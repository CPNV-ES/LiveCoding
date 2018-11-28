/**
 * The GameManager is the orchestrator of the game
 * He is responsible of :
 * - Loading the game from provider
 * - Run the game
 * - Execute commands from the processor
 * - destroying the game
 */
import ProviderFactory from './providers/ProviderFactory'

export default class GameManager {
  /**
   * Constructor
   * @param {Object} options
   * @param {String} options.providerType
   * @param {String} options.url
   */
  constructor ({ providerType, url }) {
    this.provider = ProviderFactory(providerType, { url })
  }

  /**
   * Loads the game
   */
  loadGame () {
    this.provider.loadManifest()
  }
}
