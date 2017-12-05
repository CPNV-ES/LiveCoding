// Engine Communication to the server
var comCliEngine = new ComCli('engine');

var availableCommands = {
    availableCommands: ["moveRight", "moveLeft", "moveUp", "moveDown"]
};

var gameState = new GameState();
var game = new Game();
game.startState(gameState);

function sendMessageToServer(messageToSend){
    comCliEngine.send(messageToSend, (event, msg) => {
        console.log("Response to send commands : "+msg); // arg contains message
    });
}

$("#runButton").click(function(){
    gameState.moveUp();
});