import sys

class GameConsole:
    def print(self, value):
        print("console.log({})".format(value))

console = GameConsole()

class Pacman:
    def __init__(self):
        pass

    def _flush(self):
        sys.stdout.flush()
        print(sys.stdin.read())

    def moveLeft(self):
        print("pacman.moveLeft();")
        self._flush()
    
    def moveRight(self):
        print("pacman.moveRight();")
        self._flush()

    def moveUp(self):
        print("pacman.moveUp();")
        self._flush()

    def moveDown(self):
        print("pacman.moveDown();")
        self._flush()

def isLeftSideFree():
    print("isLeftSideFree();")

def isRightSideFree():
    print("isRightSideFree();")

def isUpSideFree():
    print("isUpSideFree();")

def isDownSideFree():
    print("isDownSideFree();")
