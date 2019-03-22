# Intro

The LiveCoding server handles all the requests of a customer connected through a websocket.
In detail, the server allows executing the client code to perform a game and interacting with it through a proxy server.
The server must:
    - get all game classes
    - get the game engine
    - execute the game using a server-proxy to iterate with the client