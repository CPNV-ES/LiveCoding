class Element{
    constructor(x, y, img, isMovable){
        this.x = x
        this.y = y
        this.img = img
        this.isMovable = Boolean
        this.posX = this.x / game.blockHeight
        this.posY = this.y / game.blockWidth
    }
    
    //You can only move a sprite one case to one case
    moveSprite(direction){
        if (direction === 'left' || direction === LEFT_ARROW){
            this.x -= game.blockWidth
        }

        if (direction === 'right' || direction === RIGHT_ARROW){
            this.x += game.blockWidth
        }

        if (direction === 'up' || direction === UP_ARROW){
            this.y -= game.blockHeight
        }

        if (direction === 'down' || direction === DOWN_ARROW){
            this.y += game.blockHeight
        }
    }

    get x(){
        return this._x
    }

    get y(){
        return this._y
    }

    get img(){
        return this._img
    }

    set x(newX){
        this._x = newX
    }

    set y(newY){
        this._y = newY
    }


    set img(newImg){
        this._img = newImg
    }

  

    show(){
        image(this.img, this.x, this.y)
    }

   /* static loadSprite(){
        return loadImage(`assets/${this.constructor.name.toLowerCase()}.jpg`)
    }*/
}

// TO DELETE IF NOT USED : module.exports = Element