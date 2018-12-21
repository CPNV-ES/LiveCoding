# Manifest.json specification

Each games developed for the platform must provide a `manifest.json` file at the root of the folder.

This file provide base informations about your game, thats allow the platform to correctly load the game.

## Manifest.json example

```json
{
  "name": "Test",
  "description": "A meaningless game for test purpose.",
  "data": {
    "game": "/game.js",
    "assets": "/assets"
  },
  "interpreters": {
    "php": "interpreters/php.php",
    "ruby": "interpreters/ruby.rb",
    "javascript": "interpreters/javascript.js",
    "python": "interpreters/python.py"
  },
  "instructions": [
    {
      "name": "Commandes",
      "path": "instructions/commands.md"
    },
    {
      "name": "Consignes",
      "path": "instructions/readme.md"
    }
  ]
}
```

## Specification

### Name
Specifies the name of your game (displayed in the title bar of te LiveCoding app).
```json
{
  ...
  "name": ".."
}
```

### Description
A simple desription of the game.
```json
{
  ...
  "description": ".."
}
```

### Data
The data key contains all the paths related to the game engine and assets.
```json
{
  ...
  "data": {
    ...
  }
}
```

#### Data > game
The game key specifies the entry file of the game.
```json
{
  ...
  "data": {
    "game": "main.js"
  }
}
```

### Interpreters
The interpreters key cntains all the interpreters supported by the game, and the path to the command file specific to the game.
```json
{
  ...
  "interpreters": {
    "php": "interpreters/php.php",
    "ruby": "interpreters/ruby.rb",
    "javascript": "interpreters/javascript.js",
    "python": "interpreters/python.py"
  }
}
```

### Instructions
The instructions key is an array that lists diffrents files containing instructions. LiveCoding will iterates the array and creates links on the navbar of the app to this files. This allow the user to consult the app instructions directly from the platform. If you use GitHub, the Markdown files will be rendered nicely !
```json
{
  ...
  "instructions": [
    {
      "name": "Commandes",
      "path": "instructions/commands.md"
    },
    {
      "name": "Consignes",
      "path": "instructions/readme.md"
    }
  ]
}
```