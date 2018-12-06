/**
 * Provider base class
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
}
