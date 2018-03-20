class Pacman{
    constructor(img, x, y){
        this.img = img;
        this.x = x;
        this.y = y;
    }

    show(){
        image(this.img, this.x, this.y);
    }

    moveLeft(){
        if(game.isLeftSideFree()){
            this.x = this.x - game.BLOCK_WIDTH;
            return true;
        }
        return false;
    }
    moveRight(){
        if(game.isRightSideFree()){
            this.x = this.x + game.BLOCK_WIDTH;
            return true;
        }
        return false;
    }
    moveUp(){
        if(game.isUpSideFree()){
            this.y = this.y - game.BLOCK_HEIGHT;
            return true;
        }
        return false;
    }
    moveDown(){
        if(game.isDownSideFree()){
            this.y = this.y + game.BLOCK_HEIGHT;
            return true;
        }
        return false;
    }
}