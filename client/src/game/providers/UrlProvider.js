/**
 * Allows to load games from url
 */
export default class UrlProvider {
  /**
   * @param {Object} options
   * @param {string} options.url
   */
  constructor ({ url }) {
    this.url = url
  }

  /**
   * Loads the manifest of the specified game
   * @async
   */
  async loadManifest () {
    try {
      this.manifest = await fetch()
    } catch (e) {
      throw new Error('Impossible to load the game manifest, check your url, or if a manifest is present.')
    }
  }
}
