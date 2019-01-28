# Specifications for the game class

When you create a game, you nees to provide a sigle file, all the game must be build in this file.
If you want to have multiple files for better development experience, you need to use a muodule bundler (like [webpack](https://webpack.js.org)) to compile/transpile our sources into one file. See our [base game templates](./game_templates.md).

## The `Game` class

When you load your game, LiveCoding will import the main game file into the platform, and will lanch the game by instantiating the `Game` class.

To work properly thiy class must meet certain characteristics :

### Game class parameters

LiveCoding will pass 2 parameters to the Game class :

* `{Element}` The dom element in wich you have to display the game.
* `{String}` The base path to the assets directory of our game.

### Interpreters commands execution

When the user launch his code, the processor will execute the code, and send game commants to the the `Game` class. So the commandes used in the interpreters must be available under the game class instance. Mode details about game commands [here](./game_commands_execution.md).
