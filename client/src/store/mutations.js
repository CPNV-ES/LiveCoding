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
    state.editor.languagesContent[state.editor.language] = value
  },
  /**
   * Change the editor theme
   * @param {String} value
   */
  UPDATE_EDITOR_THEME: (state, value) => {
    state.editor.theme = value
  },
  /**
   * Change the editor language
   * @param {String} value
   */
  UPDATE_EDITOR_LANGUAGE: (state, value) => {
    state.editor.language = value
  },
  /**
   * Change the editor language
   * @param {String} value
   */
  UPDATE_GAME_URL: (state, value) => {
    state.game.url = value
  },
  /**
   * Change the editor language
   * @param {String} value
   */
  UPDATE_GAME_PROVIDER: (state, value) => {
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
   * Add a console message
   * @param {Object} message
   */
  NEW_MESSAGE: (state, message) => {
    state.console.messages.push(message)
  }
}
