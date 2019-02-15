import { LocalProcessorProxy } from './LocalProcessorProxy'
import { ExternalWebSocketProcessorProxy } from './ExternalWebSocketProcessorProxy'

/**
 * This factory create a processor proxy depending the language
 */
export class ProcessorProxyFactory {
  /**
   * Map languages to corresponding type of processor
   */
  static get processorProxies () {
    return [
      {
        name: 'javascript',
        class: LocalProcessorProxy
      },
      {
        name: 'php',
        class: ExternalWebSocketProcessorProxy
      }
    ]
  }

  /**
   * Return an instance of the corresponding processor proxy
   * @param {string} language
   * @param {any} params Params to inject on the provider instance
   */
  static create (language, params) {
    // Get the right provider
    let proxy = this.processorProxies.find(p => p.name === language)
    // Return new instance of the corresponding provider
    return new proxy.class(params)
  }
}
