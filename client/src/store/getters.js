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
    // Encode the selected provider
    // Get the encoded parameters from the corresponding provider
    if (state.game.loaded) {
      return `${window.location.protocol}//${window.location.host}${window.location.pathname}?provider=${state.game.provider}${window.gameManager.provider.shareString}`
    } else {
      return 'You must load a game'
    }
  }
}
