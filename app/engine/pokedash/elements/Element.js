class Element{
    constructor(x, y, path){
        this.x = x;
        this.y = y;
        this.path = path;
    }

    static loadSprite(){
        this.img = loadImage(`assets/${this.constructor.name.toLowerCase()}.jpg`)
    }
}