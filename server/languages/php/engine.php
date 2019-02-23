<?php

class Engine
{

    private static $initialized = false;

    private static function initialize(){

        if (self::$initialized)
            return;
        
        self::$initialized = true;
    }

    public static function send($commandJS){
        self::initialize();

        fwrite(STDERR, "none\n");
        while (fgets(STDIN) !== "ready\n") {
        }

        fwrite(STDOUT,"ready\n");
        fflush(STDOUT);

        fwrite(STDOUT, $commandJS."\n");
        fflush(STDOUT);
        //$stdin = fgets(STDIN);
        fflush(STDIN);

        //fwrite(STDOUT, $stdin);
        fflush(STDOUT);

        return;
    }
}

?>