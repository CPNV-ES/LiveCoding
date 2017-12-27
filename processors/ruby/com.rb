require 'rubygems'
require 'socket.io-client-simple'

class Communication
    def initialize(emit_channel='processor_ruby')
        @socket = SocketIO::Client::Simple.connect 'http://localhost:3000'
        @emit_channel = emit_channel
    end

    def listen
        puts 'waiting...'
        @socket.on :processor_ruby do |data|
            puts 'got new message'
            puts data
        end
    end

    def send message
        @socket.emit @emit_channel, message
    end
end
