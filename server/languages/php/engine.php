<?php

class Engine
{
    public static function send($commandJS){

        fwrite(STDERR, "none\n");
        while (fgets(STDIN) !== "ready\n") {
        }

        fwrite(STDOUT,"ready\n");
        fflush(STDOUT);

        fwrite(STDOUT, $commandJS."\n");
        fflush(STDOUT);

        $stdin = fgets(STDIN);
        fflush(STDIN);

        fwrite(STDOUT, "close\n");
        fflush(STDOUT);

        return $stdin;
    }
}

?>