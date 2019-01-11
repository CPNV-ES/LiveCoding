# Create a new socket connection 

from mlogging import mlog
from mod import connection
import socket
import sys

class Connection:
    isConnected = None

    def __init__(self, host, port):
        self.mainSocket = None
        self.server_address = (host, port)
        self.init()
        self.open()
        return

    # create and set a new socket connection 
    def init(self):
        connection.init(self.server_address)
        return

    # open a socket connection 
    def open(self):
        connection.open(self.mainSocket, self.server_address)
        return

    # close a socket connection
    def close(self):
        connection.close(self.mainSocket, self.server_address)
        return
