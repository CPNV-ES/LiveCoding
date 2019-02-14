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

        fwrite(STDOUT, $commandJS + "\n");
        fflush(STDOUT);

        $stdin = fgets(STDIN);

        fwrite(STDOUT, $stdin."\n");
        fflush(STDOUT);

        return $stdin;
    }
}

?>