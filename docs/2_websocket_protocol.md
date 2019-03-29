# Protocol between app and processor

The communication between the client app and the server is done via the websocket protocol.

When you tell the app to run your code, the app will start interactions with processor :

## Execution lifecycle

1. **CLIENT** starts a new websocket connexion with the server.
2. **CLIENT** send the laguage actually selected by the user
3. **SERVER** respond with `OK` status if the language is ok
4. **CLIENT** send to the server the game instruction
5. **SERVER** respond with `OK` when instructions are loaded
6. **CLIENT** send to the server the user script
7. **SERVER** respond with `OK` when the script are loaded
8. **SERVER** launch the process and now act as a proxy between porcess ant the game.
  * **SERVER** proxy a command from the process to the client
  * **CLIENT** respond to the processor the command result
  * ...
9. **SERVER** End the connexion when the process end's.

> A complete interaction diagram is available in the [server docs](./server/4_proxyProtocol.md#complete-sequence)

### Error cases

* **The websocket connection crash :** The server clear the process.
* **The process crash :** The server send to the client the error.

## Key codes

* **OK** the last statement has been properly done.
* **CLOSE_GAME** process terminated, the user script has been corectly executed.
* **CLOSE_GAME_WITH_WEBSOCKET_ERRORS** error when the connexion is closer due to an error in the websockets connexion.
* **PROCESS_ERROR** process crashed, when this error occurs, the precise error message can be sent 1 space after the error code.
* **PROCESS_ENDED_BY_USER** when the user uses the stop button
