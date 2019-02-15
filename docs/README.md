# LiveCoding documentation

> LiveCoding is a web app to learn coding in a interactive way !

Live coding is built arround two main blocks :
* The client app, a simple web page that contains : code editor, game engine and somme tools.
* The server processr, a python 3 app, that converts code from supprted languages to game engine commands.

## In general

* [About LiveCoding, main concepts](./about.md)
* [Installation for developement](./installation.md)
* [Protocol between app and processor](./websocket_protocol.md)

### Client side app

* [Client app structure](./client/strucutre.md)
* [The editor](./client/editor.md)
* [Game frame](./client/game_frame.md)
* [Console](./client/console.md)

### Server side processor

* [The processor](./server/processor.md)
* [Engines](./server/engines.md)

### Creating games !

* [Create your own game](./games/create_one.md)
* [Game manifest specifications](./games/game_manifest_specs.md)
