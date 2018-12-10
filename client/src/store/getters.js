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
  editorContent: state => state.editor.languagesContent[state.editor.language]
}
