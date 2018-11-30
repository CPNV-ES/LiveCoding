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
}
