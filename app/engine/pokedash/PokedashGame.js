//TO DELETE IF NOT USED: const DynamicElement = require('./DynamicElement')
class PokedashGame{
    constructor(mapName, comCli){
        this.mapName = mapName
        this.HEIGHT = 768
        this.WIDTH = 768
        this.blockHeight
        this.blockWidth
        this.columns
        this.rows   

        this.availableCommands = [
            "isLeftSideFree()",
            "isRightSideFree()",
            "isUpSideFree()",
            "isDownSideFree()",
            "moveLeft()",
            "moveRight()",
            "moveUp()",
            "moveDown()",
        ];

        const directions = {
            UP : Symbol( 'UP' ),
            DOWN : Symbol( 'DOWN' ),
            LEFT : Symbol( 'LEFT' ),
            RIGHT: Symbol( 'RIGHT' )
        }

        this.comCliEngine = comCli   // Engine Communication to the server
        this.mapElement = [] 
        this.objectives = 0 // Number of objectives (pokeball) in the map
    }

   
    preload(){
        // Create PokedashGame's classes attribute amongst element found in the map to load in param
        // Example: Create this.protagonist and this.protagonistImg
        console.log("------------ PRELOAD() ------------")
        console.log("this.mapName: " + this.mapName)
        for (let ele in window[this.mapName].e){
            let eName = window[this.mapName].e[ele].name.toLowerCase()
            console.log("eName: "+eName)

            this[eName] = null//if ele = 0 -> this.protagonist = null
            if(eName == 'road')this[eName+"Img"] = null //Not rendering the road (just the background). Easier to handle
            else this[eName+"Img"] = loadImage("engine/pokedash/assets/"+eName+"Img.png") // -> this.protagonist = loadImg(assets/protagonist.png)
        }    
    }

    setup(){
        // Define dimension of the map and of each block
        console.log("------------ SETUP() ------------")
        let canvas = createCanvas(this.HEIGHT, this.WIDTH)
        this.columns = window[this.mapName].pattern.length    
        this.rows = window[this.mapName].pattern[0].length
        this.blockHeight = floor(this.HEIGHT/this.rows)
        this.blockWidth = floor(this.WIDTH/this.columns)
        canvas.parent("game")
        new Element()
        this.iterateOverMap()
        // The game is fully loaded, we can send all the command to the editor (through the builder)
        this.sendMessageToServer(JSON.stringify(this.availableCommands))
    }

    draw() { 
        background("#5E3F6B");
        for (let y = 0; y < this.columns; y++){
            for (let x = 0; x < this.rows; x++) {
                if(this.mapElement[x][y].constructor.name == 'Road') continue                
                else this.mapElement[x][y].show()
            }
        }
    }
 
    //Function to iterate through the pattern map to fill the array map
    iterateOverMap(){
        //Instantiate 2d array in mapElement
        for(let i = 0; i < this.rows; i++){
            this.mapElement[i] = new Array(this.columns) 
        }
        console.log("------------ ITERATEOVERMAP() ------------")
        for (let y = 0; y < this.columns; y++){
            for (let x = 0; x < this.rows; x++) {
                // Instantiate objects in the 2D array
                let idElement = window[this.mapName].pattern[y][x]
                let element = window[this.mapName].e[idElement].name
                let elementImg = element.toLowerCase()+'Img'
                this.mapElement[x][y] = new DynamicElement(element, x*this.blockHeight, y*this.blockWidth, this[elementImg])
               
                // Récupère la position du joueur dans le tableau d'objet
                if(this.mapElement[x][y].isProtagonist) {
                    this.protagonist = this.mapElement[x][y]
                }

                // Récupère le nombre d'objectifs dans le jeu
                if(this.mapElement[x][y].isObjective){
                    this.objectives += 1
                } 
                
                if(this.mapElement[x][y].constructor.name == "Door"){
                    this.door = this.mapElement[x][y]
                }
            }
        }      
    }

    keyPressed(keyCode) {
        //let element = null
        if (keyCode === LEFT_ARROW){
            // Check if not going out of the map
            if(this.protagonist.posX <= 0) return false 
            //element = this.getElement(keyCode, 1)
            this.protagonist.moveLeft()

        } else if(keyCode === RIGHT_ARROW) {
            // Check if not going out of the map
            if(this.protagonist.posX >= this.rows - 1) return false 
            //element = this.getElement(keyCode, 1)
            this.protagonist.moveRight()

        } else if(keyCode === UP_ARROW) {
            // Check if not going out of the map
            if(this.protagonist.posY <= 0) return false 
            //element = this.getElement(keyCode, 1)
            this.protagonist.moveUp()

        } else if(keyCode === DOWN_ARROW) {
            // Check if not going out of the map
            if(this.protagonist.posY >= this.columns-1) return false
           // element = this.getElement(keyCode, 1)
            this.protagonist.moveDown()

        }
        //element.action(keyCode)
        return true
    }

    // Functions for user
    getObjectives(){
        return this.objectives
    }

    openDoor(){
        if(this.objectives != 0) return false
        this.mapElement[this.door.posX][this.door.posY].open()
        return true
    }
    closeDoor(){
        this.mapElement[this.doorPosX][this.doorPosY].close()
        return true
    }

    // Get element from protagonist
    getElement(direction, distance){
        if (distance < 0) return false
        
        let x = this.protagonist.posX
        let y = this.protagonist.posY
        let element
        
        if (direction === 'left' || direction === LEFT_ARROW){
            x = x - distance
            if (x < 0 ) return false // If it's out of the map
            element = this.mapElement[this.playerPosX - distance][this.playerPosY]
        }

        if (direction === 'right' || direction === RIGHT_ARROW){
            x = x + distance
            if (x >= this.blockWidth ) return false // If it's out of the map
            element = this.mapElement[this.playerPosX + distance][this.playerPosY]
        }

        if (direction === 'up' || direction === UP_ARROW){
            y = y - distance
            if (y < 0 ) return false // If it's out of the map
            element = this.mapElement[this.playerPosX][this.playerPosY - distance]
        }

        if (direction === 'down' || direction === DOWN_ARROW){
            y = y + distance
            if (y >= this.blockHeight) return false // If it's out of the map
            element = this.mapElement[this.playerPosX][this.playerPosY + distance]
        }
        return element.constructor.name.toString() // Return the name of the class's element in string
    }

    sendMessageToServer(messageToSend){
        //console.log("This.playableCha: " +  this.mapElement[0].constructor.name)
        console.log("------------ SENDMESSAGETOSERVER(messageToSend) ------------")
        // Send message (cmdsEvailable) to the Editor
        this.comCliEngine.send(messageToSend, (event, msg) => {
            // Callback : When we receive a message (cmds to execute)
            // we fetch the cmds, execute them and send to the Processor the returned value
            let command = msg.split("/")[1]

            this.comCliEngine.send(eval(command), (r) => {
                // Callback:
            });
            console.log("Response from server: " + msg); // arg contains message
        });
    }
}
