# Pokedash Game
## Principe du jeu
Game de type Boulderdash, similaire au jeu [Pokemon Reverse Universe]("https://github.com/JulienRichoz/PokemonReverseUniverse").

### But du jeu
Déplacer des rochers à l'aide d'un personnage afin de récupérer différents objectifs. Une fois tous les objectifs récupérés, le joueur peut passer au niveau suivant ou terminer son niveau actuel.

### Interaction joueur
Cependant, le but de ce jeu dans le projet n'est pas de fournir le jeu fonctionnel. C'est le joueur qui doit apporter la logique à l'aide de fonctions proposées par le jeu afin d'interagir avec le jeu.

## Jeu Initial
Le jeu initial sera constitué du protagoniste avec une map chargée de différents décors (chemin, rocher, arbres, pokeball, portes). 
Les interactions possibles seront le déplacement avec les touches flechées du clavier pour se déplacer dans la carte, mais sans la logique d'interaction avec les éléments sur la carte. C'est à dire que le protagoniste passera au travers des éléments sans qu'il ne se passe rien d'autres.

## But du joueur
Fournir un code permettant d'accomplir les exercices demandés. Le jeu final serait similaire aux points suivants:
Coder une fonctionnalité qui..
- détecte les collisions avec les éléments du décor
- interagit correctement selon l'élément
    - Pokeball : passe dessus et récupère la pokeball (+ score, enlever le sprite)
    - Arbre : ne peut pas interagir avec (collision)
    - Porte fermée : ne peut pas interagir avec (collision)
    - Porte ouverte : passe dessus et termine le niveau / charge le suivant
    - Rocher : peut déplacer le rocher si un élément de type "road" est derrière le rocher