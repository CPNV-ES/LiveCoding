# LiveCoding
> Livecoding is a desktop appliaction where newbies can learn the basics of programmation.
> The principle is simple : You write commands in the in-app editor, press send, and the commands will interact the a little game (like pacman).

## Changelog - v2.0.0-beta.5

*This version is unstable - do not use in production !*

**Client :**
- Game are now loaded in a javascript module (via import method).
- Games can specify libraries that will be loaded in the global context of the web page (required for some graphic libraries).
- Games can now load asseds form their origin vie the `assetsBasePath` property.
- You will find a list of compatible games below.

**Processor :**
- Now sends back commands to the client.
- Possibility to launch several commands still in progress.

**Games specs :**
- The game `manifest.json` spec was updated, see it [here](https://github.com/CPNV-ES/LiveCoding/blob/master/docs/games/game_manifest_specs.md).
- The `Game` class specs was updated, see new spec [here](https://github.com/CPNV-ES/LiveCoding/blob/master/docs/games/game_class_specs.md).

**Pokedash game :**
The legacy game shipped with livecoding is deprecated, the new default game are developped in his dedicated repo : [LiveCoding-Pokedash-Game](https://github.com/CPNV-ES/LiveCoding-Pokedash-Game).
You can consult the changelog directly on the dedicated repository.

## Documentation

You find all the documentation in the **[docs folder](docs)**.

## Available games

> A list of compatible games
- **[Pokedash](https://github.com/CPNV-ES/LiveCoding-Pokedash-Game)** - Find the way to complete the level !
- **[Block](https://github.com/bastiennicoud/LiveCoding-Block-Game)** - A TypeScript implementation of the legacy LiveCoding game (shipped in v1), mainly to provide a TypeScript game example, *not stable yet*.
- **[Test](https://github.com/CPNV-ES/LiveCoding-Test-Game)** - For testing purpose, not really a game.

Want to create your own game ? Follow the [docs](./docs#Creating-games-!).

## Authors :wave:

**2018-2019**
* [Davide Carboni](https://github.com/CarboniDavide)
* [Julien Richoz](https://github.com/JulienRichoz)
* [Bastien Nicoud](https://github.com/bastiennicoud)

**2017-2018**
* [EricBroutba](https://github.com/EricBroutba)
* [Loïc Dessaules](https://github.com/gollgot)
* [Raphaël](https://github.com/raph-u)
