# Protocol between app and processor

The communication between the client app and the server is done via the websocket protocol.

When you tell the app to run your code, the app will start interactions with processor :

## Execution lifecycle

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

## Socket messages

Two types of messages are user between the client ant the processor.

### JSON messages

JSON messages are used to transfer structured datas to the interpreter easily, il allows
to use a simple structure, and can be efficiently parsed.

All the json messages share the same structure :

```json
{
  "type": "message",
  "message": "Error retrieving code from the client.",
  "time": "1221212"
}
```

### Pure text messages

Pure text messages are used oly when we have to transfer raw code to the interpreter.
This allow us to skip steps like parsing and escaping the code to transfer it in a common format like json.
In pure text, the raw code is directly transferred in one block to the server, without parsing, or any transpiling process. The interpretter only have to took the raw message, and store it.

## Errors

In case of error, the server will send a corresponding message to the client.
They are two types of errors :

### Server errors

These are errors fired by the python server, they can be type check fail, or content mismatch...
In these case the server will fire a message on the websocket with the type of error, and content.

Example :
```json
{
  "type": "error",
  "code": "SERVER_ERROR",
  "message": "Error retrieving code from the client.",
  "time": "1221212"
}
```

### Interpreter errors

These errors are fired by the interpreter launched by the user when y run his code. It can by runtime
error from the specified language, syntax/parsing errors, unexpected token...

These errors are captured by the server and sended to the client for debugging.

Example :
```json
{
  "type": "error",
  "code": "INTERPRETER_ERROR",
  "message": "Unexpected token on line 12.",
  "time": "1221212"
}
```
