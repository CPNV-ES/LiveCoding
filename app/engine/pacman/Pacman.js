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
        this.x = this.x - BLOCK_WIDTH;
    }
    moveRight(){
        this.x = this.x + BLOCK_WIDTH;
    }
    moveUp(){
        this.y = this.y - BLOCK_HEIGHT;
    }
    moveDown(){
        this.y = this.y + BLOCK_HEIGHT;
    }
}