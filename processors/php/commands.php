<?php
    class GameConsole {
        function print($value) {
            echo "console.log('{$value}');";
        }
    }


    class Pacman {
        function moveLeft() {
			fwrite(STDOUT, "pacman.moveLeft();\n");
            fflush(STDOUT);

			$stdin = fgets(STDIN);

            fwrite(STDOUT, $stdin."\n");
            fflush(STDOUT);

			return $stdin;
        }

        function moveRight() {
            fwrite(STDOUT, "pacman.moveRight();\n");
            fflush(STDOUT);

            $stdin = fgets(STDIN);

            fwrite(STDOUT, $stdin."\n");
            fflush(STDOUT);

            return $stdin;
        }

        function moveUp() {
            fwrite(STDOUT, "pacman.moveUp();\n");
            fflush(STDOUT);

            $stdin = fgets(STDIN);

            fwrite(STDOUT, $stdin."\n");
            fflush(STDOUT);

            return $stdin;
        }

        function moveDown() {
            fwrite(STDOUT, "pacman.moveDown();\n");
            fflush(STDOUT);

            $stdin = fgets(STDIN);

            fwrite(STDOUT, $stdin."\n");
            fflush(STDOUT);

            return $stdin;
        }
    }


    function isLeftSideFree() {
		fwrite(STDOUT, "isLeftSideFree();\n");
        fflush(STDOUT);

        $stdin = fgets(STDIN);

        fwrite(STDOUT, $stdin."\n");
        fflush(STDOUT);

        return $stdin;
    }

    function isRightSideFree() {
        fwrite(STDOUT, "isRightSideFree();\n");
        fflush(STDOUT);

        $stdin = fgets(STDIN);

        fwrite(STDOUT, $stdin."\n");
        fflush(STDOUT);

        return $stdin;
    }

    function isUpSideFree() {
        fwrite(STDOUT, "isUpSideFree();\n");
        fflush(STDOUT);

        $stdin = fgets(STDIN);

        fwrite(STDOUT, $stdin."\n");
        fflush(STDOUT);

        return $stdin;
    }

    function isDownSideFree() {
        fwrite(STDOUT, "isDownSideFree();\n");
        fflush(STDOUT);

        $stdin = fgets(STDIN);

        fwrite(STDOUT, $stdin."\n");
        fflush(STDOUT);

        return $stdin;
    }
?>
