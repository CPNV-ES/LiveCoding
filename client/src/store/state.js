/**
 * State for the vuex store
 * @module
 * @author Bastien Nicoud
 */
export default {
  /**
   * Stores all editor related datas
   * @type {Object}
   */
  editor: {
    /**
     * Default theme (on first load)
     * @type {String}
     * */
    theme: localStorage.getItem('editor-theme') || 'solarized-dark',
    /**
     * Default selected language
     * @type {String}
     */
    language: localStorage.getItem('editor-language') || 'ruby',
    // Mapping between the language and the content of the editor
    languagesContent: {
      javascript: localStorage.getItem('javascript') || `let tutu = 'Bienvenue sur LiveCoding'\ndebugger.log(tutu)\n`,
      ruby: localStorage.getItem('ruby') || `tutu = 'Bienvenue sur LiveCoding'\ndebugger.log tutu\n`,
      php: localStorage.getItem('php') || `<?php\n$tutu = 'Bienvenue sur LiveCoding';\n$debugger->log($tutu);\n`,
      python: localStorage.getItem('python') || `tutu = 'Bienvenue sur LiveCoding'\ndebugger.log(tutu)\n`
    }
  },
  /**
   * Information form the current loaded game
   */
  game: {
    provider: localStorage.getItem('game-provider') || 'url',
    url: localStorage.getItem('game-url') || 'http://localhost:3333',
    loaded: false,
    manager: null
  }
}