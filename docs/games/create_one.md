# Create your own game

Games are and must be developed independently of the LiveCoding platform.
We recomend developping game using the starter game and following this documentation.
**This guide explain the base concepts for creating a game**

## Providers

Actually LiveCoding can load games from two sources :
* **GitHub repo** needs the `username/repo` string.
* **Web server** needs the URL of the server.

To use your game in the app, you need to specify it's url in the *game* popup menu.
![Game popup menu](../images/game_settings_menu.jpg)

## Game folder structure

You can organize your game structure as you want, but you need to corectly declare your files in the game manifest ! **The game manifst must be a the root of your game folder**, this file is loaded first by the platform, and specifies all the infos four your game, see the [game manifest specs](./game_manifest_specs.md) for details.

## Required files

## Javascript Game engines