/**
 * Manage an execution of a user script with the processor
 */
export class ExternalWebSocketProcessorProxy {

  constructor ({ processorUrl, language, interpreter, userScript }) {
    this.processorUrl = processorUrl
    this.language = language
    this.interpreter = interpreter
    this.userScript = userScript
  }

  /**
   * Launch the script execution
   * @returns { Promise } resolved when the complete process execution ends
   */
  launchExecution () {
    // Launch the code interpretation
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
                socket.send(state.editor.languagesContent[state.editor.language])
                socket.onmessage = (mEvent) => {
                  if (mEvent.data === 'OK') {
                    dispatch('console/success', 'Processor successfully loaded script, launching process.')
                    dispatch('console/info', 'Waiting for engine interactions')
                    socket.onmessage = (mEvent) => {
                      // Evaluate the command in the game context
                      let tutu = window.game.executeGameCommand(mEvent.data)
                      socket.send(tutu)
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
        throw new Error('Websocket connexion error !')
      }
    } catch (e) {
      console.error(e)
      dispatch('console/error', 'Error during running !')
      throw new Error()
    }
  }
}
