'use strict'

class GameConsole {
  print(value) {
    console.log(value);
  }
}

const gameConsole = new GameConsole();


class Pacman {
  moveLeft() {
    console.log('pacman.moveLeft();');
  }

  moveRight() {
    console.log('pacman.moveRight();');
  }

  moveUp() {
    console.log('pacman.moveUp();');
  }

  moveDown() {
    console.log('pacman.moveDown();');
  }
}

const pacman = new Pacman();


function isLeftSideFree() {
  console.log('isLeftSideFree();');
}

function isRightSideFree() {
  console.log('isRightSideFree();');
}

function isUpSideFree() {
  console.log('isUpSideFree();');
}

function isDownSideFree() {
  console.log('isDownSideFree();');
}
