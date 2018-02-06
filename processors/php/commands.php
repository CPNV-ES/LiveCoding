<?php
    class GameConsole {
        function print($value) {
            echo "console.log('{$value}');";
        }
    }

    $console = new GameConsole();


    class Pacman {
        function moveLeft() {
			fwrite(STDERR, "MoveLeft => Debug1\n");
			fwrite(STDOUT, "pacman.moveLeft();\n");
			fwrite(STDERR, "MoveLeft => Debug2\n");
			$stdin = fgets(STDIN);
			return $stdin;
        }

        function moveRight() {
		fwrite(STDERR, "MoveRight => Debug1\n");

        	fwrite(STDOUT, "pacman.moveRight();\n");

		fwrite(STDERR, "MoveRight => Debug2\n");

		$stdin = fgets(STDIN);
		fwrite(STDOUT, $stdin."\n");

		fwrite(STDERR, "MoveRight => Debug3\n");
        }

        function moveUp() {
            echo 'pacman.moveUp();';
        }

        function moveDown() {
            echo 'pacman.moveDown();';
        }

        function moveDown2() {
            fwrite(STDOUT, 'pacman.moveDown();');
            //$stdin = fgets(STDIN);
            //echo $stdin;
        }
    }

    $pacman = new Pacman();


    function isLeftSideFree() {
		fwrite(STDERR, "isLeftSideFree();");
		fwrite(STDOUT, "isLeftSideFree();");
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
