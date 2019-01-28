tutorial = {
    
    /* 
        0 = PlayableCharacter
        1 = pokeball (objectif)
        2 = door
        3 = opendoor
        4 = boulder
        5 = tree
        9 = road (case vide)
    */
   
    pattern: [
        [5,9,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
        [5,9,9,9,9,9,9,9,9,9,9,9,9,9,9,5],
        [5,9,9,9,9,9,9,9,9,9,9,9,9,9,9,5],
        [5,9,9,1,9,2,9,3,9,4,9,3,9,9,9,5],
        [5,9,9,9,9,9,9,9,9,9,9,9,9,9,9,5],
        [5,9,9,9,9,9,9,9,9,9,9,9,9,9,9,5],
        [5,9,9,9,9,9,9,9,9,9,9,9,9,9,9,5],
        [5,9,9,9,9,9,9,9,9,9,9,9,9,9,9,5],
        [5,9,9,9,9,9,9,9,9,9,9,9,9,9,9,5],
        [5,9,9,9,9,9,9,9,9,9,9,9,9,9,9,5],
        [5,9,9,9,9,9,9,9,9,9,9,9,9,9,9,5],
        [5,9,9,9,9,9,9,9,9,9,9,9,9,9,9,5],
        [5,9,9,9,9,9,9,9,9,9,9,9,9,9,9,5],
        [5,9,9,9,9,9,9,9,9,9,0,9,9,9,9,5],
        [5,9,9,9,9,9,9,9,9,9,9,9,9,9,9,5],
        [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
    ],

    e: {
        0: Protagonist, //There can be only one protagonist in the pattern
        1: Pokeball,
        2: Door,
        3: OpenDoor,
        4: Boulder,
        5: Tree,
        9: Road
    }
}