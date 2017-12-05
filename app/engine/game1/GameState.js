class GameState extends Phaser.State {
    init(){
    }

    preload(){
        game.load.image('background', 'engine/game1/assets/img/background.png');
        game.load.spritesheet('player', 'engine/game1/assets/img/player.png', 95, 75, 12);
    }

    create() {
        // Load the physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.sprite(0, 0, 'background');
        // Player init and set sprites animations
        this.player = game.add.sprite(100, 100, 'player');
        // Set the player position to 6th frame (left position)
        this.player.frame = 6;

        // Enable the physics in the player
        game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.cursors  = game.input.keyboard.createCursorKeys();

        sendMessageToServer(JSON.stringify(availableCommands));
    }

    update(){
        //this.movePlayer();
    }

    /*movePlayer(){
        if(this.cursors.right.isDown){
            this.moveRight();
        }
        else if(this.cursors.left.isDown){
            this.moveLeft();
        }
        else if(this.cursors.up.isDown){
            this.moveUp();
        }
        else if(this.cursors.down.isDown){
            this.moveDown();
        }else{
            this.player.animations.stop();
        }
    }*/

    moveRight(){
        this.player.x = this.player.x + this.player.width;
        this.player.frame = 6;
    }
    moveLeft(){
        this.player.x = this.player.x - this.player.width;
        this.player.frame = 3;
    }
    moveUp(){
        this.player.y = this.player.y - this.player.height;
        this.player.frame = 9;
    }
    moveDown(){
        this.player.y = this.player.y + this.player.height;
        this.player.frame = 0;
    }

}