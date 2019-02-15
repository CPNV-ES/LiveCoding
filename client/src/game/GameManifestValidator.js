import availableLanguages from '@/processor/AvailableLanguages'

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
    this.formatChecked = true
  }

  /**
   * Validates the manifest specified languages are compatibles
   * @returns {Boolean}
   * @throws {Error}
   */
  checkLanguages () {
    if (this.formatChecked) {
      // Check if each manifest languages are included in the availableLanguages constant
      if (Object.keys(this.manifest.interpreters).every(e => availableLanguages.includes(e))) {
        console.log('Tous les languanges sont suportés')
        return true
      } else {
        throw new Error(`Some specified languages are not suported by the platform, supported languages : ${availableLanguages.toString()}`)
      }
    } else {
      throw new Error('You need to check the manifest format before checking the languages !')
    }
  }
}
