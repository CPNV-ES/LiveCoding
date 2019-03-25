/**
 * Getters for the vuex store
 * @module
 * @author Bastien Nicoud
 */
export default {
  /**
   * Get the editor content depending the current selected language
   * @return {String}
   */
  editorContent: state => state.editor.languagesContent[state.editor.language],
  /**
   * This getter generates a query string to share the actual game configuration
   */
  shareUrl: state => {
    return `${window.location.href}?provider=github&user=CPNV-ES&repo=LiveCoding-Test-Game&version=v1.2.0`
  }
}
