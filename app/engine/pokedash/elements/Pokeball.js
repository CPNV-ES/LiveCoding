class Pokeball extends MovableElement{
    constructor(x, y, img){
        super(x, y, img)
    }

    action(information){
        console.log("bienvenue dans la méthode action de la classe Pokeball")
        return true
    }
}

// TO DELETE IF NOT USED : module.exports = Pokeball