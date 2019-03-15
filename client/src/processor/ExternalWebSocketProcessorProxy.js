/**
 * Manage an execution of a user script with the processor
 * @class
 * @author Bastien Nicoud
 */
export class ExternalWebSocketProcessorProxy {
  /**
   *
   * @param {Object} context must contain all game context datas required by processor proxy
   */
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
      this.socket.onopen = (oEvent) => {
        this.dispatch('console/success', 'Processor connected, sending data !')
        this.socket.send(this.language)
        this.socket.onmessage = (mEvent) => {
          if (mEvent.data === 'OK') {
            this.socket.send(this.interpreter)
            this.socket.onmessage = (mEvent) => {
              if (mEvent.data === 'OK') {
                this.socket.send(this.userScript)
                this.socket.onmessage = (mEvent) => {
                  if (mEvent.data === 'OK') {
                    this.dispatch('console/success', 'Processor successfully loaded script, launching process.')
                    this.dispatch('console/info', 'Waiting for engine interactions')
                    this.socket.onmessage = async (mEvent) => {
                      // Evaluate the command in the game context
                      if (mEvent.data === 'close game') {
                        this.socket.close()
                      } else {
                        let tutu = await window.game.executeGameCommand(mEvent.data)
                        this.socket.send(tutu)
                      }
                    }
                  } else {
                    this.socket.close()
                  }
                }
              } else {
                this.socket.close()
              }
            }
          } else {
            this.socket.close()
          }
        }
      }
    })
  }

  /**
   * Close the connexion and stop the process execution
   */
  stopExecution () {
    this.socket.send('PROCESS_ENDED_BY_USER')
  }
}
