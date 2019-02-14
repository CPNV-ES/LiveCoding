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
  /** @type {Object} */
  interpreters = {}
  /** @type {Object} */
  gameModule = {}
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

  /**
   * Returns the array of libraries
   * @return {Array}
   */
  get gameLibraries () {
    return this.manifest.data.libraries
  }

  /**
   * Return the base path of the game assets
   * @return {String}
   */
  get assetsBasePath () {
    return `${this.url}/${this.manifest.data.assets}/`
  }

  /**
   * Generate an url to load a ressource
   * @param {String} file path of the file
   * @return {String}
   */
  generateRawUrl (file) {
    return `${this.url}/${file}`
  }

  /**
   * Generate an url to display a ressource
   * @param {String} file path of the file
   * @return {String}
   */
  generateUrl (file) {
    return `${this.url}/${file}`
  }

  /**
   * Loads the manifest of the specified game
   * @async
   */
  async loadManifest () {
    try {
      // Test with fixed url... implement url parsing
      let response = await fetch(this.generateRawUrl('manifest.json'))
      this.manifest = await response.json()
      return this.manifest
    } catch (e) {
      throw new Error('Impossible to load the game manifest, check your url, or if a manifest is present.')
    }
  }

  /**
   * Load the code for each available interpreters
   */
  async loadInterpreters () {
    // Fetch the interpreters for each key referenced in the manifest
    for (let interpreter in this.gameInterpreters) {
      let response = await fetch(this.generateRawUrl(this.gameInterpreters[interpreter]))
      this.interpreters[interpreter] = await response.text()
    }
  }

  /**
   * Load the libraries for the game
   */
  async loadLibraries () {
    if (this.gameLibraries) {
      for (let library of this.gameLibraries) {
        // Will check if the library needs to be imported from a cdn, or import it from the game repo directly.
        await import(/* webpackIgnore: true */ library.cdn ? library.url : this.generateRawUrl(library.url))
      }
    } else {
      console.info('No libraries to load')
    }
  }

  /**
   * Loads the game class
   */
  async loadGameClass () {
    try {
      // Get the game code from source
      this.gameModule = await import(/* webpackIgnore: true */ this.generateRawUrl(this.manifest.data.game))
      return this.gameModule
    } catch (e) {
      console.error(e)
      throw new Error('Impossible to load the game class, check your url, or if the manifest is corectly configured.')
    }
  }
}
