// EVERYTHING BELOW: TO DELETE IF NOT USE
/*const Boulder = require('./elements/Boulder')
const Door = require('./elements/Door')
const Element = require('./elements/Element')
const MovableElement = require('./elements/MovableElement')
const OpenDoor = require('./elements/OpenDoor')
const Pikachu = require('./elements/Pikachu')
const Pokeball = require('./elements/Pokeball')
const Road = require('./elements/Road')
const StaticElement = require('./elements/StaticElement')
const Tree = require('./elements/Tree')
*/

const classes = {
    Boulder,
    Door,
    Element,
    MovableElement,
    OpenDoor,
    Pikachu,
    Pokeball,
    Road,
    StaticElement,
    Tree
}

class DynamicElement{
    constructor (className, x, y, img){
        return new classes[className](x, y, img)
    }
}

