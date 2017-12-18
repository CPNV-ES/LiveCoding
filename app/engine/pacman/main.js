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

    let canvas = createCanvas(13*48, 13*48);
    canvas.parent("game");

    let map = new Map();
    map.loadLevel(1);
    interateOverMap(map);
    console.log(isLeftSideFree());
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
                walls.push(new Wall(wallImg, j*48, i*48));
            }
            if(map.pattern[i][j] == 'p'){
                pacman = new Pacman(pacmanImg, j*48, i*48);
            }
        }
    }
}

function isLeftSideFree(){
    let isFree = true;
    for (let i = 0; i < walls.length; i++) {
        if(walls[i].x == pacman.x - 48 && walls[i].y == pacman.y){
            isFree = false;
        }
    }

    return isFree;
}