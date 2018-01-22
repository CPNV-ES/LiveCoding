<?php
    class GameConsole {
        function print($value) {
            echo "console.log('{$value}');";
        }
    }

    $console = new GameConsole;


    class Pacman {
        function moveLeft() {
            echo 'pacman.moveLeft();';
        }

        function moveRight() {
            echo 'pacman.moveRight();';
        }

        function moveUp() {
            echo 'pacman.moveUp();';
        }

        function moveDown() {
            echo 'pacman.moveDown();';
            
        }
    }

    $pacman = new Pacman;


    function isLeftSideFree() {
        echo 'isLeftSideFree();';
    }

    function isRightSideFree() {
        echo 'isRightSideFree();';
    }

    function isUpSideFree() {
        echo 'isUpSideFree();';
    }

    function isDownSideFree() {
        echo 'isDownSideFree();';
    }
?>
