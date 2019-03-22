<?php
// Class Engine
// Read and write to/form server proxy
class Engine
{
    public static function send($commandJS){
        
        fwrite(STDERR, "none\n");
        fflush(STDERR);

        fwrite(STDOUT,"start\n");
        fflush(STDOUT);

        fwrite(STDOUT, $commandJS."\n");
        fflush(STDOUT);

        fwrite(STDOUT,"insert\n");
        fflush(STDOUT);

        $stdin = fgets(STDIN);
        fflush(STDIN);

        fwrite(STDOUT,"close\n");
        fflush(STDOUT);

        return str_replace("\n","", $stdin);
    }
}

?>