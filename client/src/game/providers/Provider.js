/**
 * Provider base class
 *
 * @class
 * @author Bastien Nicoud
 */
export default class Provider {
  /** @type {String} */
  url = ''
  /** @type {Object} */
  manifest = null
  /**
   * @param {String} url Url to the root folder of our game (where the manifest is stored)
   */
  constructor (url) {
    this.url = url
  }
  /**
   * Returns the name of the loaded game
   * @return {String}
   */
  get gameName () {
    return this.manifest.name
  }
  /**
   * Returns the name of the loaded game
   * @return {String}
   */
  get gameDescription () {
    return this.manifest.description
  }
  /**
   * Returns the name of the loaded game
   * @return {String}
   */
  get gameInterpreters () {
    return this.manifest.paths.interpreters
  }
  /**
   * Loads the game scripts (described in the game manifest)
   */
  loadGame () {
    // - Get all the nesesary resources for the game
  }
}
