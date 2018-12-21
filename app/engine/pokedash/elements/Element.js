class Element{
    constructor(x, y, img){
        this.x = x
        this.y = y
        this.img = img
    }
    show(){
        image(this.img, this.x, this.y)
    }

   /* static loadSprite(){
        return loadImage(`assets/${this.constructor.name.toLowerCase()}.jpg`)
    }*/
}

// TO DELETE IF NOT USED : module.exports = Element