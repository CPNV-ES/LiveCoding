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
        this.a 
        this.b 
        this.c
    }

   
    preload(){
        // Create PokedashGame's classes attribute amongst element found in the map to load in param
        //Example: Create this.pokemon and this.pokemonImg
        console.log("Preload->this.mapName: " + this.mapName)
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        for (let ele in window[this.mapName.e]){
            console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
            let eName = window[this.mapName].e[ele].name.toLowerCase()
            this[eName] //if ele = 0 -> this.road
            this[eName+'Img'] = loadImage("engine/pokedash/assets/"+eName+".png") // -> this.roadImg = loadImg(assets/road.jpg)
            console.log("s: " + this[eName+'Img'])
        }    
    }

    setup(){
        // Define dimension of the map and of each block
        console.log("mapname: " + this.mapName)
        console.log("tutorial.js elements: " + window[this.mapName].e[5])
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
        // Display each element on the map
        for (let i = 0; i < this.mapElement.length; i++) {
            this.mapElement[i].show();
        }
    }

    //Function to iterate through the pattern map to fill the array map
    iterateOverMap(){
        for (let x = 0; x < this.rows; x++){
            for (let y = 0; y < this.columns; y++) {
                let idElement = window[this.mapName].pattern[x][y]
                let element = window[this.mapName].e[idElement].name
                let elementImg = element.toLowerCase()+'Img' 
                console.log("id element: "+idElement)
                console.log("element: " + element)
                console.log("element image: " + elementImg)
                /*if((this.mapName.e[x][y]) == pikachu){
                    this.mapElement.push(pikachu(x, y, this.pikachuImg))
                }*/
               this.mapElement.push(new DynamicElement(element, x*this.blockHeight, y*this.blockWidth, this[elementImg]))
               //this.mapElement.push(new[element].apply(x*this.blockHeight, y*this.blockWidth, this[elementImg]))

            }
        }
        console.log("map img: " + this.treeImg)
    }

    keyPressed(){
    }

    sendMessageToServer(messageToSend){
        // Send message (cmdsEvailable) to the Editor
        this.comCliEngine.send(messageToSend, (event, msg) => {
            // Callback : When we receive a message (cmds to execute)
            // we fetch the cmds, execute them and send to the Processor the returned value
            let command = msg.split("/")[1]

            this.comCliEngine.send(eval(command), (r) => {
                // Callback:
            });
            console.log("Response from server: "+msg); // arg contains message
        });
    }
}
