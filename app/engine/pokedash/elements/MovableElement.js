class MovableElement extends Element {
    constructor(x, y, img, isMovable){
        super(x, y, img, isMovable=true)
    }

    moveRight(){
        this.x = this.x + game.blockWidth //For sprite drawing
        console.log("Movable Element move right")
        this.swapArray(game.posX, game.posY, 'right')  
        return true
    }

    moveLeft(){
        this.x = this.x - game.blockWidth //For sprite drawing
        console.log("Movable Element move left")
        this.swapArray(game.posX, game.posY, 'left')
        return true
    }
    
    moveDown(){
        this.y = this.y + game.blockHeight //For sprite drawing
        console.log("Movable Element move down")
        this.swapArray(game.posX, game.posY, 'down')

        return true
    }

    moveUp(){
        this.y = this.y - game.blockHeight //For sprite drawing
        console.log("Movable Element move up")
        this.swapArray(game.posX, game.posY, 'up')
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
        var temp = game.mapElement[x][y]
        if (direction == 'right'){
            game.mapElement[x][y] = game.mapElement[x+1][y]
            game.mapElement[x+1][y] = temp
            game.posX += 1
        }
        if (direction == 'left'){
            game.mapElement[x][y] = game.mapElement[x-1][y]
            game.mapElement[x-1][y] = temp
            game.posX -= 1
        } 
        if (direction == 'down'){
            game.mapElement[x][y] = game.mapElement[x][y+1]
            game.mapElement[x][y+1] = temp
            game.posY += 1
        }
        if (direction == 'up'){
            //game.mapElement[x][y].y -= game.blockHeight
            game.mapElement[x][y] = game.mapElement[x][y-1]
            game.mapElement[x][y-1] = temp
            game.posY -= 1
        }
        console.log("x: " + game.posX, "y: " +game.posY)
    }
}