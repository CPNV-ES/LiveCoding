class Engine
    def self.send(commandJS)
        STDERR.puts "none"

        loop do
            break if fgets(STDIN) == "ready\n"
        end
        
        STDOUT.puts "ready\n"
        STDOUT.flush

        STDOUT.puts commandJS + "\n"
        STDOUT.flush

        msg = STDIN.gets
        STDIN.flush

        STDOUT.puts "close\n"
        STDOUT.flush

        msg
    end
end