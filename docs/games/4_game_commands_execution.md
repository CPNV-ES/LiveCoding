# Game commands execution

To be able to play with your games from the editor, it must implement :

## Game interpreters

The methods and classes you want to make available in the supported languages must be implemented in the interpreters. When the user will run his code, the procesor will load the instructions then execute the user code.

### An example of php interpreter

```php
function hello () {
  // Call the game
  Engine::send('hello()');
}
```
Here, the hello function will be available to the user, so he can call it in his code.

### Interaction with the game

As the game is executed in the browser and the code written by the client is executed on the server side, it is necessary to allow them to communicate.

#### Processor side

On the server side, a class containing static methods is available in each language supported by LiveCoding. So you can use these methods to communicate directly with your game.

This class is called `Engine`, you can find complete specs of thi class for each languages in the [Processor documentation](../server/engines.md).

In the example above we used `Engine::send()`. This static method allows you to send a command to the client side of the game and will give you back the client's answer.

#### Client side

To execute the commands that the processor will send you, it is necessary to implement the `executeGameCommand` method in your `Game` class. When LiveCoding receives an order from `Engine::send()` it will send it to this method, you will be able to perform the necessary processing directly and return a response. Then LiveCoding will send back to the processor the response.
