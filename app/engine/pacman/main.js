const BLOCK_WIDTH = 48;
const BLOCK_HEIGHT = 48;
const availableCommands = [
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
let comCliEngine = new ComCli('engine');

let wallImg;
let pacmanImg;
let wall;
let pacman;
let walls = [];

function preload(){
    wallImg = loadImage("engine/pacman/assets/wall.jpg");
    pacmanImg = loadImage("engine/pacman/assets/pacman.png");
}

function setup() {
    let canvas = createCanvas(13*BLOCK_WIDTH, 13*BLOCK_HEIGHT);
    canvas.parent("game");
    let map = new Map();
    map.loadLevel(1);
    interateOverMap(map);
    // The game is fully loaded, we can send all the command to the editor (through the builder)
    sendMessageToServer(JSON.stringify(availableCommands));
}

function draw() {
    background("#5E3F6B");
    // Traval all the walls array and display each walls
    for (let i = 0; i < walls.length; i++) {
        walls[i].show();
    }
    pacman.show();
}





// Iterate through the map to fill the walls array and create the pacman
function interateOverMap(map){
    for (let i = 0; i < map.rows; i++) {
        for (let j = 0; j < map.columns; j++) {
            if(map.pattern[i][j] == '*'){
                // j first because columns defines the x position and i defines the y position
                walls.push(new Wall(wallImg, j*BLOCK_WIDTH, i*BLOCK_HEIGHT));
            }
            if(map.pattern[i][j] == 'p'){
                pacman = new Pacman(pacmanImg, j*BLOCK_WIDTH, i*BLOCK_HEIGHT);
            }
        }
    }
}

function isLeftSideFree(){
    let isFree = true;
    for (let i = 0; i < walls.length; i++) {
        if(walls[i].x == pacman.x - BLOCK_WIDTH && walls[i].y == pacman.y){
            isFree = false;
        }
    }
    return isFree;
}
function isRightSideFree(){
    let isFree = true;
    for (let i = 0; i < walls.length; i++) {
        if(walls[i].x == pacman.x + BLOCK_WIDTH && walls[i].y == pacman.y){
            isFree = false;
        }
    }
    return isFree;
}
function isUpSideFree(){
    let isFree = true;
    for (let i = 0; i < walls.length; i++) {
        if(walls[i].x == pacman.x && walls[i].y == pacman.y - BLOCK_HEIGHT){
            isFree = false;
        }
    }
    return isFree;
}
function isDownSideFree(){
    let isFree = true;
    for (let i = 0; i < walls.length; i++) {
        if(walls[i].x == pacman.x && walls[i].y == pacman.y + BLOCK_HEIGHT){
            isFree = false;
        }
    }
    return isFree;
}


function keyPressed() {
    if (keyCode === LEFT_ARROW){
        if(isLeftSideFree()){
            pacman.moveLeft();
        }
    }else if(keyCode === RIGHT_ARROW) {
        if(isRightSideFree()){
            pacman.moveRight();
        }
    }else if(keyCode === UP_ARROW) {
        if(isUpSideFree()){
            pacman.moveUp();
        }
    }else if(keyCode === DOWN_ARROW) {
        if(isDownSideFree()){
            pacman.moveDown();
        }
    }
}

function sendMessageToServer(messageToSend){
    comCliEngine.send(messageToSend, (event, msg) => {
        let command = msg.split("/")[1];
        comCliEngine.send(eval(command), (r) => {
            // 
        });
        console.log("Response from server: "+msg); // arg contains message
    });
}
