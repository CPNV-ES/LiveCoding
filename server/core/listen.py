# Listen all from socket

import socket
import select
from mlogging import mlog
from .Processor import Processor

class Listen:

    mainSocket = None
    processor = None
    connected = []
    
    server_run = True
    time = 0.05

    def __init__(self, socket):
        self.mainSocket = socket
        self.processor = Processor()
        return

    # add a new client socket connection
    def add(self):
        # Check for asked client connections each 0.05(he sent a connection packet)
        askedConnections, wList, xList = select.select([self.mainSocket], [], [], self.time)
        for connection in askedConnections:
            clientSocket, clientInfos = connection.accept()
            # Add the new accepted client socket to our connected clients
            self.connected.append(clientSocket)
            mlog.show("New client connection in socket")
        return

    def check(self):
        # Check enabled connected client to read(he sent a msg)
        clientsToListen = []
        try:
            clientsToListen, wList, xList = select.select(self.connected, [], [], self.time)
        except select.error:
            mlog.show("Clients connection error !")
        else:
            clientsToListen = self.getClientData(clientsToListen)
        return

    def getClientData(self, toListen):
         # Get clientSocket which have sent a msg one by one
        for client in toListen:
                recvMsg = client.recv(1024)
                recvMsg = recvMsg.decode()
                mlog.show("New message received from client")
                if recvMsg == "close":
                    client.close()
                    toListen.remove(client)
                    self.connected.remove(client)
                    mlog.show("One client disconnected")
                else:
                    mlog.show("New message received..")
                    self.processor.peel(recvMsg)
                    self.processor.execute(client)
        return toListen

    def run(self):
        try:
            while self.server_run:
                self.add()
                self.check()
        except IndexError:
            self.mainSocket.close()
        finally:
            self.mainSocket.close()
        self.closeAll()
        return

    def closeAll(self):
        mlog.show("Close all opened connection")
        for client in self.connected:
            client.close()
        return

    