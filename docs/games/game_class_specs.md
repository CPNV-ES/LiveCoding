# Specifications for the game class

When you create a game, you nees to provide a sigle file, all the game must be build in this file.
If you want to have multiple files for better development experience, you need to use a muodule bundler (like [webpack](https://webpack.js.org)) to compile/transpile our sources into one file. See our [base game templates](./game_templates.md).

## The `Game` class

When you load your game, LiveCoding will import the main game file into the platform, and will lanch the game by instantiating the `Game` class.

To work properly thiy class must meet certain characteristics :

### Game class constructor parameters

LiveCoding will pass 2 parameters to the Game class :

* `{Element}` The dom element in wich you have to display the game.
* `{String}` The base path to the assets directory of our game.

### Game class methods

The Game class must provide a specific method named `executeGameCommand` to execude the game commands sended by the processor. This method must accept a string (the command), and return the result in string format.

### Game class example

```js
export class Game {

  /**
   * @param {HTMLElement} el
   * @param {string} assetsBasePath
   */
  constructor (el, assetsBasePath) {
    // Initialize your game
  }

  /**
   * @param {string} command
   * @return {string} command output
   */
  executeGameCommand (command) {
    // Execute the command in your game and return the result
  }

}
```
