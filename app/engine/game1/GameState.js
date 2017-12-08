class GameState extends Phaser.State {
    init(){
        this.availableCommands = {
            availableCommands: ["moveRight", "moveLeft", "moveUp", "moveDown"]
        }
    }

    preload(){
        game.load.image('background', 'engine/game1/assets/img/background.png');
        game.load.spritesheet('player', 'engine/game1/assets/img/player.png', 95, 75, 12);
    }

    create() {
        // Load the physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.sprite(0, 0, 'background');
        this.player = new Player();
        this.player.create();

        // Send the availableCommands when all is ready
        sendMessageToServer(JSON.stringify(this.availableCommands));
    }

    update(){
        this.player.update();
    }
}