import { log } from '@/console/DevConsole'

/**
 * This module stores the consoles messages, and provides methods to log messages easily
 */
export default {
  // [Vuex namespaced module](https://vuex.vuejs.org/guide/modules.html)
  namespaced: true,
  state: {
    /**
     * Each messages will be displayed into the console of the browser, and the console of the game
     * **Message datas**
     * - **text :** the message to display
     * - **payload :** value to log in the console
     * - **type :** the type of message (log, info, warning, error, ...)
     * - **time :** timestamp at the emission of the message
     */
    messages: []
  },
  mutations: {
    /**
     * Add a console message
     * @param {Object} message
     */
    ADD_MESSAGE: (state, message) => {
      // Create a random id for each messages
      message.id = crypto.getRandomValues(new Uint32Array(2)).join()
      // Add the message in the store
      state.messages.push(message)
      // Logs the message in the developpment console
      log(message)
    }
  },
  actions: {
    /**
     * Shortcut to log message without payload
     */
    log ({ commit }, message) {
      commit('ADD_MESSAGE', {
        text: message,
        type: 'log',
        time: new Date()
      })
    },
    info ({ commit }, message) {
      commit('ADD_MESSAGE', {
        text: message,
        type: 'info',
        time: new Date()
      })
    },
    success ({ commit }, message) {
      commit('ADD_MESSAGE', {
        text: message,
        type: 'success',
        time: new Date()
      })
    },
    warning ({ commit }, message) {
      commit('ADD_MESSAGE', {
        text: message,
        type: 'warning',
        time: new Date()
      })
    },
    error ({ commit }, message) {
      commit('ADD_MESSAGE', {
        text: message,
        type: 'error',
        time: new Date()
      })
    }
  }
}
