class Protagonist extends MovableElement{
    constructor(x, y, img){
        super(x, y, img)
        this.isProtagonist = true
    }

    //static LIFE = 3 
    /*moveLeft(){
        console.log("Protagonist move left")
        console.log(game.blockWidth);
        this.x = this.x - game.blockWidth;
        return true;
    }*/
}
