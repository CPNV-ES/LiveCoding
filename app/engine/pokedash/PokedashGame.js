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

        this.comCliEngine = comCli   // Engine Communication to the server
        this.mapElement = []
    }

   
    preload(){
        // Create PokedashGame's classes attribute amongst element found in the map to load in param
        // Example: Create this.pikachu and this.pikachuImg
        console.log("------------ PRELOAD() ------------")
        console.log("this.mapName: " + this.mapName)
        for (let ele in window[this.mapName].e){
            let eName = window[this.mapName].e[ele].name.toLowerCase()
            console.log("eName: "+eName)

            this[eName] = null//if ele = 0 -> this.pikachu
            if(eName == 'road') continue //Not rendering the road (just the background). Easier to handle
            this[eName+"Img"] = loadImage("engine/pokedash/assets/"+eName+"Img.png") // -> this.pikachu = loadImg(assets/pikachu.png)
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
                if(this.mapElement[x][y] == null) continue
                this.mapElement[x][y].show()
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
                let idElement = window[this.mapName].pattern[y][x]
                //If the element is a road, we dont handle it
                if(idElement == 9) {
                    this.mapElement[x][y] = null
                    continue
                }

                let element = window[this.mapName].e[idElement].name
                let elementImg = element.toLowerCase()+'Img'
                console.log(element)
                this.mapElement[x][y] = new DynamicElement(element, x*this.blockHeight, y*this.blockWidth, this[elementImg])
            }
        }
    }

    keyPressed(keyCode) {
        if (keyCode === LEFT_ARROW){
            console.log("Move Left")
            this.pikachu.moveLeft();
            console.log("Move Left")
        }else if(keyCode === RIGHT_ARROW) {
            this.pikachu.moveRight();
        }else if(keyCode === UP_ARROW) {
            this.pikachu.moveUp();
        }else if(keyCode === DOWN_ARROW) {
            this.pikachu.moveDown();
        }
    }

    sendMessageToServer(messageToSend){
        //console.log("This.pikachu: " +  this.mapElement[0].constructor.name)
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
