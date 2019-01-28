/**
 * Mutations for the vuex store
 * @module
 * @author Bastien Nicoud
 */
export default {
  /**
   * Update the current editor content according to the selected language
   * @param {String} value
   */
  UPDATE_EDITOR_CONTENT: (state, value) => {
    localStorage.setItem(state.editor.language, value)
    state.editor.languagesContent[state.editor.language] = value
  },
  /**
   * Change the editor theme
   * @param {String} value
   */
  UPDATE_EDITOR_THEME: (state, value) => {
    localStorage.setItem('editor-theme', value)
    state.editor.theme = value
  },
  /**
   * Change the editor language
   * @param {String} value
   */
  UPDATE_EDITOR_LANGUAGE: (state, value) => {
    localStorage.setItem('editor-language', value)
    state.editor.language = value
  },
  /**
   * Change the editor language
   * @param {String} value
   */
  UPDATE_GAME_URL: (state, value) => {
    localStorage.setItem('game-url', value)
    state.game.url = value
  },
  /**
   * Change the editor language
   * @param {String} value
   */
  UPDATE_GAME_PROVIDER: (state, value) => {
    localStorage.setItem('game-provider', value)
    state.game.provider = value
  },
  /**
   * Set a new gamemanager (when a game is loaded)
   * @param {String} value
   */
  SET_GAME_MANAGER: (state, value) => {
    state.game.manager = value
    state.game.loaded = true
  },
  /**
   * Show the parameters modal
   * @param {Boolean}
   */
  SHOW_APP_PARAMETERS_MODAL: (state, value) => {
    state.showAppParametersModal = value
  }
}
