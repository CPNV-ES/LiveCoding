/**
 * Provider base class
 *
 * The provider is responsible to access the game datas
 * He provide an abstraction to the real game location
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
    return this.manifest.interpreters
  }
  /**
   * Returns the array of instructions
   * @return {Array}
   */
  get gameInstructions () {
    return this.manifest.instructions
  }
}
