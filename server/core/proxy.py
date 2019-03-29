# Class Proxy Game
# Iterate with client and process with server proxy
# v1.0

import asyncio
import websockets
import os
from mod import mlog
import subprocess
from mod import io

class Proxy:

    def __init__(self, socket, process):
        self.socket = socket
        self.process = process 
        return
    
    # run the server proxy
    async def run(self):
        mlog.show("Run a new proxy server. Ready to iterate with client...")
        #loop until process is running
        count = 0
        while self.process.subprocess.poll() is None:
            # get error form the current executing commande
            errorMsg = await io.stderrGet(self.process.subprocess)

            # run the current command using the server-process protocol
            if errorMsg == "none":
                await self.waitForReady("start")                               # wait until server is ready
                cmdsJS = await io.stdoutGet(self.process.subprocess)                      # get command from process to send to client
                await self.sendCommandToClient(cmdsJS)                         # send the command to the client
                message = await self.getReponseFromClient()                    # get reponse from client 
                await self.waitForReady("insert")                              # wait until server is ready
                await io.stdinWrite(self.process.subprocess, message)                     # send to process the client confirmation                         
                await self.waitForReady("close")                               # wait until server is ready
                if message == 'PROCESS_ENDED_BY_USER':                         # exit request from client
                    mlog.show("Game closed by User. By...")
                    self.process.subprocess.terminate()
                    break
                count = count + 1                                              # count executed commamdes
                
                                
            # for any error
            if errorMsg.strip() != "none" and errorMsg.strip() != "":          
                mlog.show("Process error.. Game has been stopped..")
                mlog.show("Error message: " + errorMsg)
                await self.socket.send("PROCESS_ERROR" + errorMsg)                    # send the error to client
                self.process.subprocess.terminate()                                       # stop the subprocess 
                break       
                
        mlog.show("Commandes executed: " + str(count))
        return

    # syncronisation between subporcess and server
    # stop the current sequence in proxy game and wait the reponse from process to continue
    async def waitForReady(self, value):
        while True:
            if await io.stdoutGet(self.process.subprocess) == value:
                return
        return

    # send the command received from process to client
    async def sendCommandToClient(self, value):
        try:
            mlog.show("Send command to client: " + value)
            await self.socket.send(value)
            return True
        except: 
            mlog.show("Client is disconnected.. Process will be close")
            self.process.subprocess.terminate()
            return None
        return None

    # get reponse from client
    async def getReponseFromClient(self):
        try:
            message = await self.socket.recv()                             # wait for client confirmation 
            mlog.show("Received confirmation from client: "+ message)  
            return message
        except: 
            mlog.show("Client is disconnected.. Process will be close")
            self.process.subprocess.terminate()
            return None
        return None