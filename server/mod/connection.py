# Create a new socket connection 

from mlogging import mlog
import socket
import sys

# create and set a new socket connection 
def init(server_address):
    mainSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)        # create a new socket connection
    mainSocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)      # set the new connection
    mlog.show('Starting a new socket connection on server|port {}|{}'.format(*server_address))
    mainSocket.bind(server_address)
    return mainSocket

# open a socket connection 
def open(mainSocket, server_address):
    if mainSocket:
        mainSocket.listen(5)                 
        mlog.show('Listening on server|port {}|{}'.format(*server_address))
        return True
    else:
        mlog.show('Listening error: not socecket founded !')
    return False

# close a socket connection
def close(mainSocket, server_address):
    if mainSocket:
        mainSocket.close()                   
        mlog.show('Socket Connection closed on server|port {}|{}'.format(*server_address))
        return True
    else:
        mlog.show('Close error: not socecket founded !')
    return False

# check socket connection
def check(mainSocket, server_address):
    pass
