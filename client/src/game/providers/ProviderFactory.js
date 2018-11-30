/**
 * The provider factory return the right provider depending provider type specified by the user
 */
import GitHubProvider from './GitHubProvider'
import UrlProvider from './UrlProvider'

export default class ProviderFactory {
  /**
   * Register available providers
   */
  static get providers () {
    return [
      {
        name: 'github',
        class: GitHubProvider
      },
      {
        name: 'url',
        class: UrlProvider
      }
    ]
  }

  /**
   * Return an instance of the corresponding provider
   * @param {string} providerType github | url
   * @param {any} params Params to inject on the provider instance
   */
  static create (providerType, params) {
    // Get the right provider
    let provider = this.providers.find(p => p.name === providerType)
    // Return new instance of the corresponding provider
    return new provider.class(params)
  }
}
