# Manifest.json specification

Each games developed for the platform must provide a `manifest.json` file at the root of the folder.

This file provide base informations about your game, thats allow the platform to correctly load the game.

## Manifest.json example

```json
{
  "name": "Test",
  "description": "A meaningless game for test purpose.",
  "paths": {
    "game": "/game.js",
    "assets": "/assets",
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
}
```

## Specification