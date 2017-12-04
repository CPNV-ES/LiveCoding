// Engine Communication to the server
var comCliEngine = new ComCli('engine');
var availableCommands = {
    availableCommands: ["moveRight", "moveLeft", "moveUp", "moveDown"]
}

// Create the gameFrame and added it to the parent html called "game"
var game = new Phaser.Game(600, 600, Phaser.AUTO, "game");
var velocity = 300;

var gameState = {
    // Assets loading
    preload: function(){
        game.load.image('background', 'engine/game1/assets/img/background.png');
        game.load.spritesheet('player', 'engine/game1/assets/img/player.png', 95, 75, 12);
    },
    // Setup and displaying
    create: function(){
        // Load the physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.sprite(0, 0, 'background');
        // Player init and set sprites animations
        this.player = game.add.sprite(100, 100, 'player');
        this.player.animations.add('down', [0, 1, 2]);
        this.player.animations.add('left', [3, 4, 5]);
        this.player.animations.add('right', [6, 7, 8]);
        this.player.animations.add('up', [9, 10, 11]);
        // Set the player position to 6th frame (left position)
        this.player.frame = 6;

        // Enable the physics in the player
        game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.cursors  = game.input.keyboard.createCursorKeys();

        sendMessageToServer(JSON.stringify(availableCommands));
    },
    // game Logic
    update: function(){
        movePlayer(this.player, this.cursors);
    }
};

function sendMessageToServer(messageToSend){
    comCliEngine.send(messageToSend, (event, msg) => {
        console.log("Response to send commands : "+msg); // arg contains message
    });
}

function movePlayer(player, cursors){
    if(cursors.right.isDown){
        moveRight(player);
    }
    else if(cursors.left.isDown){
        moveLeft(player);
    }
    else if(cursors.up.isDown){
        moveUp(player);
    }
    else if(cursors.down.isDown){
        moveDown(player);
    }else{
        player.animations.stop();
    }
}
function moveRight(player){
    player.body.position.x = player.body.position.x + player.width;
    player.frame = 6;
}
function moveLeft(player){
    player.body.position.x = player.body.position.x - player.width;
    player.frame = 3;
}
function moveUp(player){
    player.body.position.y = player.body.position.y - player.height;
    player.frame = 9;
}
function moveDown(player){
    player.body.position.y = player.body.position.y + player.height;
    player.frame = 0;
}


game.state.add('gameState', gameState);
game.state.start('gameState');