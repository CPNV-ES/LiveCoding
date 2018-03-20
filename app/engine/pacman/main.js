// We can load our games
let game = new PacmanGame();

// P5.js function
function preload(){
    game.preload();
}

// P5.js function
function setup() {
    game.setup();
}

// P5.js function
function draw() {
    game.draw();
}

// P5.js function
function keyPressed() {
    game.keyPressed(keyCode);
}