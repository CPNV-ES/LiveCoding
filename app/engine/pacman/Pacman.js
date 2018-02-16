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
        if(isLeftSideFree()){
            this.x = this.x - BLOCK_WIDTH;
            return true;
        }
        return false;
    }
    moveRight(){
        if(isRightSideFree()){
            this.x = this.x + BLOCK_WIDTH;
            return true;
        }
        return false;
    }
    moveUp(){
        if(isUpSideFree()){
            this.y = this.y - BLOCK_HEIGHT;
            return true;
        }
        return false;
    }
    moveDown(){
        if(isDownSideFree()){
            this.y = this.y + BLOCK_HEIGHT;
            return true;
        }
        return false;
    }
}