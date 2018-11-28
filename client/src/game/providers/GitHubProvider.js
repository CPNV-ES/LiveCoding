/**
 * Allows to load games from github repository
 */
export default class GitHubProvider {
  /**
   * @param {Object} options
   * @param {string} options.url
   */
  constructor ({ url }) {
    this.url = url
  }

  loadManifest() {

  }
}
