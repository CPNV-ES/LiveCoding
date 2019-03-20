# [LiveCoding](https://cpnv-es.github.io/LiveCoding/)
> Livecoding is a desktop appliaction where newbies can learn the basics of programmation.
> The principle is simple : You write commands in the in-app editor, press send, and the commands will interact the a little game (like pacman).

## Changelog - v2.0.0-beta.10

*This version is unstable - do not use in production !*

**Client :**
- Manifest validator now uses the proxy language list to check the available languages.
- The gameManager now injects the console in the game constructor for easy logging.

**Processor :**
- Fix command errors with first command execution.
- Fix string parsing error in php engine.

**Pokedash game :**
The legacy game shipped with livecoding is deprecated, the new default game are developped in his dedicated repo : [LiveCoding-Pokedash-Game](https://github.com/CPNV-ES/LiveCoding-Pokedash-Game).
You can consult the changelog directly on the dedicated repository.

## Documentation

You find all the documentation in the **[docs folder](docs)**, still being drafted.

## Available games

> A list of compatible games
- **[Pokedash](https://github.com/CPNV-ES/LiveCoding-Pokedash-Game)** - Find the way to complete the level !
- **[Block](https://github.com/bastiennicoud/LiveCoding-Block-Game)** - A TypeScript implementation of the legacy LiveCoding game (shipped in v1), mainly to provide a TypeScript game example, *not stable yet*.
- **[Test](https://github.com/CPNV-ES/LiveCoding-Test-Game)** - For testing purpose, not really a game.

Want to create your own game ? Follow the [docs](./docs#creating-games-).

## Authors :wave:

**2018-2019**
* [Davide Carboni](https://github.com/CarboniDavide)
* [Julien Richoz](https://github.com/JulienRichoz)
* [Bastien Nicoud](https://github.com/bastiennicoud)

**2017-2018**
* [EricBroutba](https://github.com/EricBroutba)
* [Loïc Dessaules](https://github.com/gollgot)
* [Raphaël](https://github.com/raph-u)
