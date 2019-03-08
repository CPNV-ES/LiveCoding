class Engine
    def self.send(commandJS)
        STDERR.puts "none\n"

        while STDIN.gets !== "ready\n"
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