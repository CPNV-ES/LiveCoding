<?php

class Engine
{
    public static function send($commandJS){

        fwrite(STDERR, "none\n");

        while (fgets(STDIN) !== "ready\n") {
        }
        fflush(STDIN);

        fwrite(STDOUT,"ready\n");
        fflush(STDOUT);

        fwrite(STDOUT, $commandJS."\n");
        fflush(STDOUT);

        while (fgets(STDIN) !== "ready\n") {
        }
        fflush(STDIN);

        fwrite(STDOUT,"ready\n");
        fflush(STDOUT);

        $stdin = fgets(STDIN);
        fflush(STDIN);

        return str_replace("\n","", $stdin);
    }
}

?>