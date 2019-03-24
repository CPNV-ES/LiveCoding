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
    /**
     * Default font size
     * @type {Number}
     */
    fontSize: localStorage.getItem('editor-font-size') || 14,
    // Mapping between the language and the content of the editor
    languagesContent: {
      javascript: localStorage.getItem('javascript') || `let tutu = 'Bienvenue sur LiveCoding'\nwriteConsole(tutu)\n`,
      ruby: localStorage.getItem('ruby') || `tutu = 'Bienvenue sur LiveCoding'\nwrite_console(tutu)\n`,
      php: localStorage.getItem('php') || `<?php\n$tutu = 'Bienvenue sur LiveCoding';\nwriteConsole($tutu);\n`,
      python: localStorage.getItem('python') || `tutu = 'Bienvenue sur LiveCoding'\nwriteConsole(tutu)\n`
    }
  },
  processor: {
    running: false,
    url: localStorage.getItem('processor-url') || 'ws://localhost:12800/'
  },
  /**
   * Information form the current loaded game
   */
  game: {
    loading: false,
    provider: localStorage.getItem('game-provider') || 'github',
    url: localStorage.getItem('game-url') || 'CPNV-ES/LiveCoding-Pokedash-Game@v1.0.4',
    loaded: false,
    manager: null
  }
}
