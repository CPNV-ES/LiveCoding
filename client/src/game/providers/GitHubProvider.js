import Provider from './Provider'

/**
 * Allows to load games from github repository
 */
export default class GitHubProvider extends Provider {
  /**
   * Github base url for raw files
   * @type {String}
   */
  rawBaseUrl = 'https://cdn.jsdelivr.net/gh'
  /**
   * Github base url for rendered files
   * @type {String}
   */
  defaultBaseUrl = 'https://github.com'
  /**
   * This method generate a plain raw url (to get code)
   */
  generateRawUrl (file) {
    return `${this.rawBaseUrl}/${this.url}/${file}`
  }
  /**
   * This method generate a url to rendered ressouce (for mardowns on github)
   */
  generateUrl (file) {
    return `${this.defaultBaseUrl}/${this.url}/${file}`
  }
  /**
   * Return the base path of the game assets
   * @return {String}
   */
  get assetsBasePath () {
    return `${this.rawBaseUrl}/${this.url}/${this.manifest.data.assets}`
  }
}
