class MovableElement extends Element {
    constructor(x, y, img){
        super(x, y, img)
    }

    moveRight(){
        console.log("Movable Element move right")
        this.swapArray(game.posX, game.posY, 'right')
        this.x = this.x + game.blockWidth
        return true
    }

    moveLeft(){
        console.log("Movable Element move left")
        this.swapArray(game.posX, game.posY, 'left')
        this.x = this.x - game.blockWidth
        return true
    }
    
    moveDown(){
        console.log("Movable Element move down")
        this.swapArray(game.posX, game.posY, 'down')
        this.y = this.y + game.blockHeight
        return true
    }

    moveUp(){
        console.log("Movable Element move up")
        this.swapArray(game.posX, game.posY, 'up')
        this.y = this.y - game.blockHeight
        return true     
    }

    testMove(comingFrom){
        //Testing limit of the screen
        if(x < 0 || y < 0) return false
        if(x > game.WIDTH || y > game.HEIGHT) return false

        if(isStatic) return false
        if(isMovable) e.action(comingFrom)
    }

    swapArray(x, y, direction){
        console.log("x: " + x, "y: " +y)
        var temp = game.mapElement[x][y]
        if (direction == 'left'){
            game.mapElement[x][y] = game.mapElement[x-1][y]
            game.mapElement[x-1][y] = temp
            game.posX -= 1
        } 
        if (direction == 'right'){
            game.mapElement[x][y] = game.mapElement[x+1][y]
            game.mapElement[x+1][y] = temp
            game.posX += 1
        }
        if (direction == 'down'){
            game.mapElement[x][y] = game.mapElement[x][y+1]
            game.mapElement[x][y+1] = temp
            game.posY += 1
        }
        if (direction == 'up'){
            game.mapElement[x][y] = game.mapElement[x][y-1]
            game.mapElement[x][y-1] = temp
            game.posY -= 1
        }
    }
}