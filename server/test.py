import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web
import socket
from tornado import gen
from mlogging import mlog

class MyWebSocketServer(tornado.websocket.WebSocketHandler):

    clients = set()
    clientss = {}

    def open(self):
        # metodo eseguito all'apertura della connessione
        mlog.show('New connection created for client %s' % self)
        MyWebSocketServer.clients.add(self)
    
    @gen.coroutine
    def on_message(self, message):
        # metodo eseguito alla ricezione di un messaggio
        # la stringa 'message' rappresenta il messaggio
        mlog.show('Messaggio ricevuto: %s' % message)
        self.write_message("Received: " + message)
        print(self)

    def on_close(self):
        # metodo eseguito alla chiusura della connessione
        mlog.show('Connection %s has been close ' %self)
        MyWebSocketServer.clients.remove(self)

    def check_origin(self, origin):
        return

        
application = tornado.web.Application([(r'/websocketserver', MyWebSocketServer),])
http_server = tornado.httpserver.HTTPServer(application)
http_server.listen(12800)
tornado.ioloop.IOLoop.instance().start()