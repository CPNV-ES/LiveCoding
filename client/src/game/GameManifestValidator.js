import { ProcessorProxyFactory } from '@/processor/ProcessorProxyFactory'

/**
 * Responsible to validates the manifest.json style
 */
export class GameManifestValidator {
  /**
   * Constructor
   * @param {Object} manifest The manifest parsed
   */
  constructor (manifest) {
    this.manifest = manifest
    this.formatChecked = false
  }

  /**
   * Validates the manifest
   * @returns {Boolean}
   * @throws {Error}
   */
  checkFormat () {
    // Arry to store validation errors
    let errors = []
    // Required name key
    if (!('name' in this.manifest)) {
      errors.push('The manifest must contain a name key.')
    } else {
      // Empty name key
      if (this.manifest.name.length < 1) {
        errors.push('The manifest name key can not be empty.')
      }
    }
    // data key
    if (!('data' in this.manifest)) {
      errors.push('The manifest must contain a data key.')
    } else {
      // Game key in data
      if (!('game' in this.manifest.data)) {
        errors.push('The manifest data key must contain a game key.')
      }
    }
    // interpreters key
    if (!('interpreters' in this.manifest)) {
      errors.push('The manifest must contain a interpreters key.')
    } else {
      if (Object.keys(this.manifest.interpreters).length < 1) {
        errors.push('The game must support at least one interpreter.')
      }
    }

    // Throw exception if errors
    if (errors.length > 0) {
      throw new Error(`The manifest format dont respect specs. Errors : ${errors.toString()}`)
    } else {
      this.formatChecked = true
      return true
    }
  }

  /**
   * Validates the manifest specified languages are compatibles
   * @returns {Boolean}
   * @throws {Error}
   */
  checkLanguages () {
    if (this.formatChecked) {
      // Check if each manifest languages are included in the availableLanguages constant
      if (Object.keys(this.manifest.interpreters).every(l => ProcessorProxyFactory.processorProxies.map(e => e.name).includes(l))) {
        console.log('Tous les languanges sont suportés')
        return true
      } else {
        throw new Error(`Some specified languages are not suported by the platform, supported languages : ${ProcessorProxyFactory.processorProxies.map(e => e.name).toString()}`)
      }
    } else {
      throw new Error('You need to check the manifest format before checking the languages !')
    }
  }
}
