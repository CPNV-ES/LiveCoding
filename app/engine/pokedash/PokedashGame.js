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
        System.import('maps/' + this.mapName.toString() + '.js').then(function(log){
            console.log(log)
        })
        // Create PokedashGame's classes attribute amongst element found in the map to load in param
        for (let e in this.mapName.e){      
            this[this.mapName.e[e].toLowerCase()]
            this[this.mapName.e[e].toString().toLowerCase()+'Img'] = e.loadSprite() // Load sprite of element and assign it as an attribute
        }
        
    }

    setup(){

        // Define dimension of the map and of each block
        let canvas = createCanvas(HEIGHT, WIDTH)
        this.columns = this.mapName.pattern.length    
        this.rows = this.mapName.pattern[0].length
        this.blockHeight = floor(HEIGHT/this.rows)
        this.blockWidth = floor(WIDTH/this.columns)
        canvas.parent("game");
        this.iterateOverMap()
        // The game is fully loaded, we can send all the command to the editor (through the builder)
        this.sendMessageToServer(JSON.stringify(this.availableCommands));
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
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.columns; y++) {
                element = this.mapName.e[x][y].toLowerCase()
                elementImg = this.mapName.e[x][y].toString().toLowerCase()+'Img' 
                /*if((this.mapName.e[x][y]) == pikachu){
                    this.mapElement.push(pikachu(x, y, this.pikachuImg))
                }*/
                this.mapElement.push(new this[element].apply(x*this.blockHeight, y*this.blockWidth, this[this.mapName.e[e].toString().toLowerCase()+'Img']))
            }
        }
    }
}
