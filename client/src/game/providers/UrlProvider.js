import Provider from './Provider'

/**
 * Allows to load games from url
 */
export default class UrlProvider extends Provider {
  /**
   * Loads the manifest of the specified game
   * @async
   */
  async loadManifest () {
    try {
      let response = await fetch(`${this.url}/manifest.json`)
      let manifest = JSON.stringify(await response.json())
      return manifest
    } catch (e) {
      throw new Error('Impossible to load the game manifest, check your url, or if a manifest is present.')
    }
  }
}
