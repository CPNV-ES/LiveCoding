# Game managment

To manage the game loading and running, the app uses a specific class, responsible of the actually loaded game, the `gameManager`.

![game manager](../diagrams/game_manager.svg)

## gameManager

The game manager class is quite simple, it just embeds the logic to load a game and start this game. The game manager use the currently selected provider class to retrive all the necesary options of the game.

## providers

Providers owns all the logic that depends on the source of the game. In providers you find :
* Url generation methods
* Loading methods (to retrive datas form the game source)
* getters to acces game manifest datas easily

Currently two providers are implemented in the app :
* **GitHub :** allows to load game from a github repo
* **URL :** allows to load game form a http file server.

It is easy to add new ones, for example to support GitLab, or other type of sources...

## processorProxy

The app uses the processor proxy to execute the user code. Currently only one proxy exists, the `ExternalWebSocketProcessorProxy`, ant he is responsible to manage connexion with processor.

But the system is designed to be able to add new proxies easily. For example, you want to add support of javascript to the platform, and you vant to run this code directly on the browser via a [web worker](https://developer.mozilla.org/fr/docs/Web/API/Web_Workers_API). All you have to do is create a new `proxy` that implements the necessary logic to acomplish js execution on web worker, then you register the new proxy in the `ProcessorProxyFactory`, and you brand new proxy will be available for javascript code execution.
