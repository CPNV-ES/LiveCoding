/**
 * The provider factory return the right provider depending provider type specified by the user
 */
import GitHubProvider from './GitHubProvider'
import UrlProvider from './UrlProvider'

export default class ProviderFactory {
  /**
   * Return an instance of the corresponding provider
   * @param {string} providerType github | url
   * @param {Object} params Params to inject on the provider instance
   */
  static create (providerType, params) {
    let providers = [
      {
        name: 'github',
        class: GitHubProvider
      },
      {
        name: 'url',
        class: UrlProvider
      }
    ]

    let provider = providers.find(p => p.name === providerType).class
  }
}
