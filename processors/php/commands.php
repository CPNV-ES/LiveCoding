<?php
    class GameConsole {
        function print($value) {
            echo "console.log('{$value}');";
        }
    }


    class Pacman {
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


    function isLeftSideFree() {
        fwrite(STDERR, "none\n");
        fflush(STDERR);
            
		fwrite(STDOUT, "isLeftSideFree();\n");
        fflush(STDOUT);

        $stdin = fgets(STDIN);

        fwrite(STDOUT, $stdin."\n");
        fflush(STDOUT);

        return $stdin;
    }

    function isRightSideFree() {
        fwrite(STDERR, "none\n");
        fflush(STDERR);
        
        fwrite(STDOUT, "isRightSideFree();\n");
        fflush(STDOUT);

        $stdin = fgets(STDIN);

        fwrite(STDOUT, $stdin."\n");
        fflush(STDOUT);

        return $stdin;
    }

    function isUpSideFree() {
        fwrite(STDERR, "none\n");
        fflush(STDERR);

        fwrite(STDOUT, "isUpSideFree();\n");
        fflush(STDOUT);

        $stdin = fgets(STDIN);

        fwrite(STDOUT, $stdin."\n");
        fflush(STDOUT);

        return $stdin;
    }

    function isDownSideFree() {
        fwrite(STDERR, "none\n");
        fflush(STDERR);
        
        fwrite(STDOUT, "isDownSideFree();\n");
        fflush(STDOUT);

        $stdin = fgets(STDIN);

        fwrite(STDOUT, $stdin."\n");
        fflush(STDOUT);

        return $stdin;
    }
?>
