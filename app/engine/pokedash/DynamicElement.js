const classes = {
    Boulder,
    Door,
    Element,
    MovableElement,
    OpenDoor,
    Protagonist,
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

