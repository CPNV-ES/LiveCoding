<?php
/**
 * Regroups all commands for the PHP version of the default game
 */

class GameConsole {
    function print($value) {
        echo "console.log('{$value}');";
    }
}


/**
 * Character of the game
 * Allows you to control its movements
 */
class Pacman {

    /**
     * Moves the character to the left of his position
     *
     * @return void|string
     */
    function moveLeft() {
        fwrite(STDERR, "none\n");
        fflush(STDERR);

        fwrite(STDOUT, "pacman.moveLeft();\n");
        fflush(STDOUT);

        $stdin = fgets(STDIN);

        fwrite(STDOUT, $stdin."\n");
        fflush(STDOUT);

        return $stdin;
    }

    /**
     * Moves the character to the right of his position
     *
     * @return void|string
     */
    function moveRight() {
        fwrite(STDERR, "none\n");
        fflush(STDERR);

        fwrite(STDOUT, "pacman.moveRight();\n");
        fflush(STDOUT);

        $stdin = fgets(STDIN);

        fwrite(STDOUT, $stdin."\n");
        fflush(STDOUT);

        return $stdin;
    }

    /**
     * Moves the character above his position
     *
     * @return void|string
     */
    function moveUp() {
        fwrite(STDERR, "none\n");
        fflush(STDERR);

        fwrite(STDOUT, "pacman.moveUp();\n");
        fflush(STDOUT);

        $stdin = fgets(STDIN);

        fwrite(STDOUT, $stdin."\n");
        fflush(STDOUT);

        return $stdin;
    }

    /**
     * Moves the character below his position
     *
     * @return void|string
     */
    function moveDown() {
        fwrite(STDERR, "none\n");
        fflush(STDERR);

        fwrite(STDOUT, "pacman.moveDown();\n");
        fflush(STDOUT);

        $stdin = fgets(STDIN);

        fwrite(STDOUT, $stdin."\n");
        fflush(STDOUT);

        return $stdin;
    }
}

/**
 * Check if the case on the left of the character is free
 *
 * @return boolean
 */
function isLeftSideFree() {
    fwrite(STDERR, "none\n");
    fflush(STDERR);

    fwrite(STDOUT, "game.isLeftSideFree();\n");
    fflush(STDOUT);

    $stdin = fgets(STDIN);

    fwrite(STDOUT, $stdin."\n");
    fflush(STDOUT);

    return $stdin;
}

/**
 * Check if the case on the right of the character is free
 *
 * @return boolean
 */
function isRightSideFree() {
    fwrite(STDERR, "none\n");
    fflush(STDERR);

    fwrite(STDOUT, "game.isRightSideFree();\n");
    fflush(STDOUT);

    $stdin = fgets(STDIN);
    fwrite(STDOUT, $stdin);

    fwrite(STDOUT, $stdin."\n");
    fflush(STDOUT);

    return $stdin;
}

/**
 * Check if the case on the top of the character is free
 *
 * @return boolean
 */
function isUpSideFree() {
    fwrite(STDERR, "none\n");
    fflush(STDERR);

    fwrite(STDOUT, "game.isUpSideFree();\n");
    fflush(STDOUT);

    $stdin = fgets(STDIN);

    fwrite(STDOUT, $stdin."\n");
    fflush(STDOUT);

    return $stdin;
}

/**
 * Check if the case on the bottom of the character is free
 *
 * @return boolean
 */
function isDownSideFree() {
    fwrite(STDERR, "none\n");
    fflush(STDERR);

    fwrite(STDOUT, "game.isDownSideFree();\n");
    fflush(STDOUT);

    $stdin = fgets(STDIN);

    fwrite(STDOUT, $stdin."\n");
    fflush(STDOUT);

    return $stdin;
}
