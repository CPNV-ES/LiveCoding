const GAMEPATH = 'engine/game1/';

const _import = function(filepath, callback){
    let head = document.getElementsByTagName('head')[0];
    let imported = document.createElement('script');
    imported.type = "text/javascript";
    imported.src = filepath;
    // imported.onreadystatechange = callback;
    imported.onload = callback;
    head.appendChild(imported);
};

let tatata = function(){
    // Engine Communication to the server
    var comCliEngine = new ComCli('engine');

    var gameState = new GameState();
    var game = new Game();
    game.startState(gameState);

    function sendMessageToServer(messageToSend){
        comCliEngine.send(messageToSend, (event, msg) => {
            console.log("Response to send commands : "+msg); // arg contains message
            console.log(typeof msg)
        });
    }

    $("#runButton").click(function(){
        gameState.player.moveUp();
    });
};

// _import(GAMEPATH + 'Player.js', _import(GAMEPATH + 'GameState.js', _import(GAMEPATH + 'Game.js', tatata)));

// _import('ComCli.js');

