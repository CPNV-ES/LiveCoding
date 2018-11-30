import Provider from './Provider'

/**
 * Allows to load games from github repository
 */
export default class GitHubProvider extends Provider {
  /**
   * Loads the manifest of the specified game
   * @async
   */
  async loadManifest () {
    try {
      // Test with fixed url... implement url parsing
      let response = await fetch(`https://raw.githubusercontent.com/bastiennicoud/LiveCoding-Test-Game/master/manifest.json`)
      let manifest = await response.json()
      return manifest
    } catch (e) {
      throw new Error('Impossible to load the game manifest, check your url, or if a manifest is present.')
    }
  }
}
