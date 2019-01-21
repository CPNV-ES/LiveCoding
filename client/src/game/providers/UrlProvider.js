import Provider from './Provider'

/**
 * Allows to load games from url
 *
 * @class
 * @author Bastien Nicoud
 */
export default class UrlProvider extends Provider {
  /**
   * Loads the manifest of the specified game
   * @async
   */
  async loadManifest () {
    try {
      let response = await fetch(`${this.url}/manifest.json`)
      this.manifest = await response.json()
      return this.manifest
    } catch (e) {
      console.warn(e)
      throw new Error('Impossible to load the game manifest, check your url, or if a manifest is present.')
    }
  }
  async loadGameClass () {
    try {
      // Get the game code from source
      let game = await import(/* webpackIgnore: true */ `${this.url}/${this.manifest.data.game}`)
      console.log(game)
      // console.log(toto)
    } catch (e) {
      console.log(e)
    }
  }
}
