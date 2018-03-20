class PacmanGame{
    constructor(){
        this.BLOCK_WIDTH = 48;
        this.BLOCK_HEIGHT = 48;
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
        this.comCliEngine = new ComCli('engine');
        this.wallImg;
        this.pacmanImg;
        this.wall;
        this.pacman;
        this.walls = [];
    }

    preload(){
        this.wallImg = loadImage("engine/pacman/assets/wall.jpg");
        this.pacmanImg = loadImage("engine/pacman/assets/pacman.png");
    }

    setup() {
        let canvas = createCanvas(13*this.BLOCK_WIDTH, 13*this.BLOCK_HEIGHT);
        canvas.parent("game");
        let map = new Map();
        map.loadLevel(1);
        this.iterateOverMap(map);
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




    // Iterate through the map to fill the walls array and create the pacman
    iterateOverMap(map){
        for (let i = 0; i < map.rows; i++) {
            for (let j = 0; j < map.columns; j++) {
                if(map.pattern[i][j] == '*'){
                    // j first because columns defines the x position and i defines the y position
                    this.walls.push(new Wall(this.wallImg, j*this.BLOCK_WIDTH, i*this.BLOCK_HEIGHT));
                }
                if(map.pattern[i][j] == 'p'){
                    this.pacman = new Pacman(this.pacmanImg, j*this.BLOCK_WIDTH, i*this.BLOCK_HEIGHT);
                }
            }
        }
    }

    isLeftSideFree(){
        let isFree = true;
        for (let i = 0; i < this.walls.length; i++) {
            if(this.walls[i].x == this.pacman.x - this.BLOCK_WIDTH && this.walls[i].y == this.pacman.y){
                isFree = false;
            }
        }
        return isFree;
    }
    isRightSideFree(){
        let isFree = true;
        for (let i = 0; i < this.walls.length; i++) {
            if(this.walls[i].x == this.pacman.x + this.BLOCK_WIDTH && this.walls[i].y == this.pacman.y){
                isFree = false;
            }
        }
        return isFree;
    }
    isUpSideFree(){
        let isFree = true;
        for (let i = 0; i < this.walls.length; i++) {
            if(this.walls[i].x == this.pacman.x && this.walls[i].y == this.pacman.y - this.BLOCK_HEIGHT){
                isFree = false;
            }
        }
        return isFree;
    }
    isDownSideFree(){
        let isFree = true;
        for (let i = 0; i < this.walls.length; i++) {
            if(this.walls[i].x == this.pacman.x && this.walls[i].y == this.pacman.y + this.BLOCK_HEIGHT){
                isFree = false;
            }
        }
        return isFree;
    }


    keyPressed(keyCode) {
        if (keyCode === LEFT_ARROW){
            if(this.isLeftSideFree()){
                this.pacman.moveLeft();
            }
        }else if(keyCode === RIGHT_ARROW) {
            if(this.isRightSideFree()){
                this.pacman.moveRight();
            }
        }else if(keyCode === UP_ARROW) {
            if(this.isUpSideFree()){
                this.pacman.moveUp();
            }
        }else if(keyCode === DOWN_ARROW) {
            if(this.isDownSideFree()){
                this.pacman.moveDown();
            }
        }
    }

    sendMessageToServer(messageToSend){
        // Send message (cmdsEvailable) to the Editor
        this.comCliEngine.send(messageToSend, (event, msg) => {
            // Callback : When we receive a message (cmds to execute)
            // we fetch the cmds, execute them and send to the Processor the returned value
            let command = msg.split("/")[1];
            var pacman = this.pacman;
            this.comCliEngine.send(eval(command), (r) => {
                // Callback:
            });
            console.log("Response from server: "+msg); // arg contains message
        });
    }

}