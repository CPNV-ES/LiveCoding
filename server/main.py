from core.listen import Listen
from core.connection import Connection
import socket

host = ''
port = 12800

connection = Connection(host, port)          # new socket connection
listen = Listen(connection.mainSocket)       # start a new listening instance to get message from socket
listen.run()                                 # start server 

