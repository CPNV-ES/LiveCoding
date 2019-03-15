class Engine
    def self.send(commandJS)
        STDERR.puts "none\n"
        
        while STDIN.gets != "ready" do
        end
        STDIN.flush

        puts "ready"
        STDOUT.flush

        puts commandJS
        STDOUT.flush

        while STDIN.gets != "ready" do
        end
        STDIN.flush

        msg = STDIN.gets
        STDIN.flush

        puts "close"
        STDOUT.flush

        msg
    end
end