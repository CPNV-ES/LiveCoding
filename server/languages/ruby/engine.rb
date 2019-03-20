class Engine
    def self.send(commandJS)
        STDERR.puts "none\n"
        
        STDIN.gets
        STDIN.flush

        puts "ready"
        STDOUT.flush

        puts commandJS
        STDOUT.flush

        STDIN.gets
        STDIN.flush

        puts "ready"
        STDOUT.flush

        msg = STDIN.gets
        STDIN.flush

        msg.gsub("\n","")
    end
end