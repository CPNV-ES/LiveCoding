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
    theme: 'solarized-dark',
    /**
     * Default selected language
     * @type {String}
     */
    language: 'ruby',
    // Mapping between the language and the content of the editor
    languagesContent: {
      javascript: `let tutu = 'Bienvenue sur LiveCoding'\ndebugger.log(tutu)\n`,
      ruby: `tutu = 'Bienvenue sur LiveCoding'\ndebugger.log tutu\n`,
      php: `<?php\n$tutu = 'Bienvenue sur LiveCoding';\n$debugger->log($tutu);\n`,
      python: `tutu = 'Bienvenue sur LiveCoding'\ndebugger.log(tutu)\n`
    }
  },
  /**
   * Information form the current loaded game
   */
  game: {
    provider: 'url',
    url: 'http://localhost:3333',
    loaded: false,
    manager: null
  },
  /**
   * Conosole stores the messages displayed in the little console on bottom of the page
   */
  console: {
    /**
     * Each messages will be displayed into the console of the browser, and the console of the game
     * **Message datas**
     * - **content :** the value to display
     * - **type :** the type of message (log, info, warning, error, ...)
     * - **time :** timestamp at the emission of the message
     */
    messages: [
      {
        content: 'Application launched',
        type: 'info',
        time: new Date()
      },
      {
        content: 'Loading Game ...',
        type: 'info',
        time: new Date()
      },
      {
        content: 'Error, game not accesible, check network.',
        type: 'error',
        time: new Date()
      }
    ]
  }
}
