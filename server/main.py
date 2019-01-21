from core.listen import Listen
from core.connection import Connection
from mlogging import mlog
import socket
import configparser

config = configparser.ConfigParser()
config.read("config.ini")
host = config.get("SOCKET CONFIGURATION","HOST")
port = int(config.get("SOCKET CONFIGURATION","PORT"))

connection = Connection(host, port)          # new socket connection
listen = Listen(connection.mainSocket)       # start a new listening instance to get message from socket
listen.run()                                 # start server 

