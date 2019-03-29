# LiveCoding documentation

Live coding is built arround two main blocks :
* The client app, a simple web page that contains : code editor, game engine and somme tools.
* The server processr, a python 3 app, that converts code from supprted languages to game engine commands.

## In general

* [About LiveCoding, platform architecture](./about.md)
* [Protocol between app and processor](./websocket_protocol.md)

## Client side app

* [Install client for dev](./client/installation.md)
* [Client app structure](./client/strucutre.md)
* [The store](./client/store.md)
* [The editor](./client/editor.md)
* [Game frame](./client/game_frame.md)
* [Console](./client/console.md)
* [Game loading/starting](./client/game_managment.md)

## Server side processor

* [Install Server](server/environment.md)
* [The server architecture](server/serverArchitecture.md)
* [Add a new language](server/languages.md)
* [The server proxy](server/proxyProtocol.md)

## Creating games !

* [Create your own game](./games/create_one.md)
* [Game manifest specifications](./games/game_manifest_specs.md)
