# LiveCoding
> Livecoding is a desktop appliaction where newbies can learn the basics of programmation.
> The principle is simple : You write commands in the in-app editor, press send, and the commands will interact the a little game (like pacman).

## Changelog

**v2.0.0-beta.4**  
*This version is unstable*

**Client :**
- The client now loads the game interpreters locally to send it to the processor
- Improvments for game loading form github 
- Add processor connexion procedure
  - The client can now send the code to the processsor when you run your code block

**Pokedash game :**
The pokedash game is now in a separate repo : [LiveCoding-Pokedash-Game](https://github.com/CPNV-ES/LiveCoding-Pokedash-Game). Games are now completly separated from the LiveCoding platform, you can load Games into the platform via game providers.

**Processor :**
- Now supports `PHP`.
- A websocket endpoint is available to start a code interpretation session form the client.
_ The language engine, game interpreters and user code is now lodaed into a dedicated process when you run your code.

## Documentation

You find all the documentation in the [docs folder](docs)

## Authors :wave:

**2018-2019**
* [Davide Carboni](https://github.com/CarboniDavide)
* [Julien Richoz](https://github.com/JulienRichoz)
* [Bastien Nicoud](https://github.com/bastiennicoud)

**2017-2018**
* [EricBroutba](https://github.com/EricBroutba)
* [Loïc Dessaules](https://github.com/gollgot)
* [Raphaël](https://github.com/raph-u)
