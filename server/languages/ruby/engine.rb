# Class Engine
# read and write to/form server proxy

class Engine
    def self.send(commandJS)
        
        STDERR.puts "none\n"
        STDERR.flush
        
        puts "start"
        STDOUT.flush

        puts commandJS
        STDOUT.flush

        puts "insert"
        STDOUT.flush

        msg = STDIN.gets
        STDIN.flush

        puts "close"
        STDOUT.flush

        msg.gsub("\n","")
    end
end