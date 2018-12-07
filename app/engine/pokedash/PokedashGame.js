class PokedashGame{
    constructor(comCli){
        this.HEIGHT = 768
        this.WIDTH = 768
        this.blockDimension
        this.columns
        this.rows

        this.availableCommands = [
            "isLeftSideFree()",
            "isRightSideFree()",
            "isUpSideFree()",
            "isDownSideFree()",
            "pacman.moveLeft()",
            "pacman.moveRight()",
            "pacman.moveUp()",
            "pacman.moveDown()",
        ];
         // Engine Communication to the server
        this.comCliEngine = comCli
        this.wallImg
        this.pacmanImg
        this.wall
        this.pikachu
        this.element = []
    }

    preload(mapName){
        for (let e in mapName.e){      //Example: Elements in tutorial => Road, Boulder, Door, OpenDoor, Pikachu, Pokeball, Tree
            this[mapName.e[i].toString().toLowerCase()+'Img'] = e.loadSprite() //Example with 'e'="Road": this.roadImg = loadImage("assets/road.jpg")       
        }
    }

    setup(mapName){

        // Define dimension of the map and of each block
        let canvas = createCanvas(HEIGHT, WIDTH);
        this.blockDimension = mapName.pattern.length 
        this.columns = floor(WIDTH/blockDimension)          
        this.rows = floor(HEIGHT/blockDimension)
        canvas.parent("game");
        this.loadMap();
        // The game is fully loaded, we can send all the command to the editor (through the builder)
        this.sendMessageToServer(JSON.stringify(this.availableCommands));
    }

    draw() {
        background("#5E3F6B");
        // Traval all the walls array and display each walls
        for (let i = 0; i < this.walls.length; i++) {
            this.walls[i].show();
        }
        this.pacman.show();
    }

    //Function to iterate through the pattern map to fill the array map
    fillMap()


    loadMap(mapName){
        System.import('maps/' + mapName.toString()).then(function(log){
            console.log(log)
        })
        this.preload(mapName)
        this.setup(mapName)
        this.draw
    }
}
