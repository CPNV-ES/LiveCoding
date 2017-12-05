class Game extends Phaser.Game {
    constructor(){
        // Create the gameFrame and added it to the parent html called "game"
        super(600, 600, Phaser.AUTO, "game");
    }

    startState(state){
        this.state.add('gameState', gameState);
        this.state.start('gameState');
    }
}