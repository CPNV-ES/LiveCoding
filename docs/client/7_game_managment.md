# Game managment

To manage the game loading and running, the app uses a specific class, responsible of the actually loaded game, the `gameManager`.

![game manager](../diagrams/game_manager.svg)

## gameManager


## processorProxy

The app uses the processor proxy to execute the user code. Currently only one proxy exists, the `ExternalWebSocketProcessorProxy`, ant he is responsible to manage connexion with processor.
But the system is designed to be able to add new proxies easily. For example, you want to add support of javascript to the platform, and you vant to run this code directly on the browser via a [web worker](https://developer.mozilla.org/fr/docs/Web/API/Web_Workers_API). All you have to do is create a new `proxy` that implements the necessary logic to acomplish js execution on web worker, then you register the new proxy in the `ProcessorProxyFactory`, and you brand new proxy will be available for javascript code execution.
