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
      // FIX : Cors errors on diffrent origin
      let response = await fetch(`${this.url}/manifest.json`)
      let manifest = await response.json()
      return manifest
    } catch (e) {
      console.warn(e)
      throw new Error('Impossible to load the game manifest, check your url, or if a manifest is present.')
    }
  }
}
