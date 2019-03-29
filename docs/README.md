# LiveCoding documentation

Live coding is built arround two main blocks :
* The client app, a simple web page that contains : code editor, game engine and somme tools.
* The server processr, a python 3 app, that converts code from supprted languages to game engine commands.

## In general

* [About LiveCoding, platform architecture](./1_about.md)
* [Protocol between app and processor](./2_websocket_protocol.md)

## Client side app

* [Install client for dev](./client/1_installation.md)
* [Client app structure](./client/2_strucutre.md)
* [The store](./client/3_store.md)
* [The code editor](./client/4_editor.md)
* [Game frame](./client/5_game_frame.md)
* [Console](./client/6_console.md)
* [Game loading/starting](./client/7_game_managment.md)

## Server side processor

* [Install Server](server/1_environment.md)
* [The server architecture](server/2_serverArchitecture.md)
* [Add a new language](server/3_languages.md)
* [The server proxy](server/4_proxyProtocol.md)

## Creating games !

* [Create your own game](./games/1_create_one.md)
* [Game manifest specifications](./games/2_game_manifest_specs.md)
* [Game class specifications](./games/3_game_class_specs.md)
* [Game commands execution](./games/4_game_commands_execution.md)
