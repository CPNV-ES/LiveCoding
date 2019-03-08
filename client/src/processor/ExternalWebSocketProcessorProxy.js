/**
 * Manage an execution of a user script with the processor
 */
export class ExternalWebSocketProcessorProxy {

  constructor ({ dispatch, processorUrl, language, interpreter, userScript }) {
    this.dispatch = dispatch
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
    return new Promise((resolve, reject) => {
      // Open the websocket connexion
      this.socket = new WebSocket(this.processorUrl)

      // Map close and error events to promise callbacks
      this.socket.onerror = (e) => {
        this.dispatch('console/error', 'Websocket connexion error.')
        reject(e)
      }
      this.socket.close = (e) => {
        this.dispatch('console/info', 'Websocket connexion closed, execution finish.')
        resolve()
      }

      // On connexion opening, launch protocol procedure
      this.socket.onopen
    })
    // Launch the code interpretation
    try {
      // window.processor = new ProcessorConnexion()
      let socket = new WebSocket(this.processorUrl)
      socket.onopen = (oEvent) => {
        console.log(oEvent)
        this.dispatch('console/success', 'Processor connected, sending data !')
        // step 1 : sending language
        socket.send(this.language)
        socket.onmessage = (mEvent) => {
          if (mEvent.data === 'OK') {
            socket.send(this.interpreter)
            socket.onmessage = (mEvent) => {
              if (mEvent.data === 'OK') {
                socket.send(this.userScript)
                socket.onmessage = (mEvent) => {
                  if (mEvent.data === 'OK') {
                    this.dispatch('console/success', 'Processor successfully loaded script, launching process.')
                    this.dispatch('console/info', 'Waiting for engine interactions')
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
        this.dispatch('console/info', 'Websocket connexion closed.')
        console.log(cEvent)
      }
      socket.onerror = (eEvent) => {
        this.dispatch('console/error', 'Websocket connexion error.')
        console.log(eEvent)
        throw new Error('Websocket connexion error !')
      }
    } catch (e) {
      console.error(e)
      this.dispatch('console/error', 'Error during running !')
      throw new Error()
    }
  }

  /**
   * Close the connexion and stop the process execution
   */
  stopExecution () {

  }
}
