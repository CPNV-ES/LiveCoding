import GameManager from '@/game/GameManager'
import ProviderFactory from '@/game/providers/ProviderFactory'
// import ProcessorConnexion from '@/game/processor/ProcessorConnexion'

/**
 * Actions for the vuex store
 * @module
 * @author Bastien Nicoud
 */
export default {
  /**
   * Loads a game in the app (when the user click on the load button)
   */
  async load ({ state, commit, dispatch }) {
    try {
      // Clear the content of the game box
      document.getElementById('game-box').innerHTML = ''
      // Create a new game manager for the game
      window.gameManager = new GameManager(
        // Load the right provider depending to the selection
        ProviderFactory.create(state.game.provider, state.game.url)
      )
      // Load the game manifest and datas
      await window.gameManager.loadGame()
      commit('SET_GAME_MANAGER', window.gameManager)
      dispatch('console/success', 'OK, Game loaded !')
      // Launch the game
      window.gameManager.startGame()
      dispatch('console/success', 'OK, Game started, ready to go !')
    } catch (e) {
      console.error(e)
      // Display little message in the game box
      document.getElementById('game-box').innerHTML = 'Aucun jeu chargé !'
      dispatch('console/error', 'Error during Game loading !')
    }
  },
  /**
   * Run the current code for the current game
   *
   * - launch the socket connexion
   * - send the code
   * - execute commands
   * - close the connexion
   */
  run ({ state, dispatch }) {
    dispatch('console/info', 'Running, try to contact processor.')
    try {
      // window.processor = new ProcessorConnexion()
      let socket = new WebSocket(state.processor.url)
      socket.onopen = (oEvent) => {
        console.log(oEvent)
        dispatch('console/success', 'Processor connected, sending data !')
        // step 1 : sending language
        socket.send(state.editor.language)
        socket.onmessage = (mEvent) => {
          if (mEvent.data === 'OK') {
            socket.send(window.gameManager.provider.interpreters[state.editor.language])
            socket.onmessage = (mEvent) => {
              if (mEvent.data === 'OK') {
                socket.send(state.languagesContent[state.editor.language])
                socket.onmessage = (mEvent) => {
                  if (mEvent.data === 'OK') {
                    dispatch('console/success', 'Processor successfully loaded script, launching process.')
                    dispatch('console/info', 'Waiting for engine interactions')
                    socket.onmessage = (mEvent) => {
                      // Evaluate the command in the game context
                      let result = window.gameCommandEval(mEvent.data)
                      socket.send(result)
                    }
                  } else {
                    socket.close()
                  }
                }
              } else {
                socket.close()
              }
            }
          } else {
            socket.close()
          }
        }
      }
      socket.onclose = (cEvent) => {
        dispatch('console/info', 'Websocket connexion closed.')
        console.log(cEvent)
      }
      socket.onerror = (eEvent) => {
        dispatch('console/error', 'Websocket connexion error.')
        console.log(eEvent)
      }
    } catch (e) {
      console.error(e)
      dispatch('console/error', 'Error during running !')
    }
  }
}
