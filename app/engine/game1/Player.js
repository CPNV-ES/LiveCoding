class Player extends Phaser.Sprite{
    constructor(){
        super(game, 100, 300, 'player');
    }

    create(){
        // Add the sprite on the game (displaying)
        game.add.existing(this);
        // Set the frame position (right)
        this.frame = 6;
        // Enable the physics in the player
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        // Get the cursors to manage the keyboard inputs
        this.cursors  = game.input.keyboard.createCursorKeys();
    }

    update(){
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
        }
    }

    moveRight(){
        this.x = this.x + this.width;
        this.frame = 6;
    }
    moveLeft(){
        this.x = this.x - this.width;
        this.frame = 3;
    }
    moveUp(){
        this.y = this.y - this.height;
        this.frame = 9;
    }
    moveDown(){
        this.y = this.y + this.height;
        this.frame = 0;
    }
}