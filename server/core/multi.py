# Create multiple connection in socket

import socket
import select
from mlogging import mlog
from Processor import Processor

class Multi:

    class Clients:
        def __init__(self):
            self.connected = []
            self.toListen = []
            return

    clients = Clients()
    processor = Processor()
    server_run = True
    time = 0.05

    def __init__(self, socket):
        self.mainSocket = socket
        return

    # add a new client socket connection
    def add(self):
        # Check for asked client connections each 0.05(he sent a connection packet)
        askedConnections, wList, xList = select.select([self.mainSocket], [], [], self.time)
        for connection in askedConnections:
            clientSocket, clientInfos = connection.accept()
            # Add the new accepted client socket to our connected clients
            self.clients.connected.append(clientSocket)
            mlog.show("New client connection in socket")
        return

    def check(self):
        # Check enabled connected client to read(he sent a msg)
        try:
            self.clients.toListen, wList, xList = select.select(self.clients.connected, [], [], self.time)
        except select.error:
            mlog.show("Clients connection error !")
        else:
            self.getClientData()
        return

    def getClientData(self):
         # Get clientSocket which have sent a msg one by one
        for client in self.clients.toListen:
                recvMsg = client.recv(1024)
                recvMsg = recvMsg.decode()
                mlog.show("New message received from client")
                if recvMsg == "close":
                    client.close()
                    self.clients.toListen.remove(client)
                    self.clients.connected.remove(client)
                    mlog.show("One client disconnected")
                else:
                    mlog.show("New message received..")
                    self.processor.peel(recvMsg)
                    self.processor.execute(client)
        return

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
        for client in self.clients.connected:
            client.close()
        return

    