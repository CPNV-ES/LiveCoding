class Element{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    static loadSprite(){
        return loadImage(`assets/${this.constructor.name.toLowerCase()}.jpg`)
    }
}