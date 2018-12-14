# Protocol between app and processor

The communication between the client app and the server is done via the websocket protocol.

When you tell the app to run your code, the app will start interactions with processor :

# Execution lifecycle

1. The client starts a new connexion with the server.
2. The server indicates to the client that it is ready to receive data.
3. The client transmit to server datas relative to the context of the app.
4. The server loads the context for the current execution.
5. The server indicates to the client that it is ready.
6. The client send to the server the raw code writtent by the user.
7. The server lauch a process in the correspondig language with the raw code of the client.
8. Script executions
  * The process can contact the game engine to execute commands on the game sinchronously.
9. When the process die, the server indicate the end of the execution to the client.

## Errors

In cas of runtime error, the server return to the client the error in a json format, for user friendly formatting.
