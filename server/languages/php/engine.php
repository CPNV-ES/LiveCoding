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
        fflush(STDERR);

        fgets(STDIN);

        fwrite(STDOUT, $commandJS);
        fflush(STDOUT);

        $stdin = fgets(STDIN);
        fflush(STDIN);

        fwrite(STDOUT, $stdin);
        fflush(STDOUT);

        return $stdin;
    }
}

?>