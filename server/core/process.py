# Class Process
# Process all game code running into a sunprocess and send the result to client
# v1.0

import asyncio
import websockets
import os
from mod import mlog
import subprocess
from mod import io

class Process:

    def __init__(self, socket, tempfile, languageName):
        self.socket = socket
        self.tempfile = tempfile
        self.languageName = languageName
        self.process = None
        pass

    async def run(self):
        mlog.show("Proccess ready! Using engine to play game")
        # prepare the subprocess command
        cmd = self.languageName + " " + self.tempfile.getName()
        # execute a new process for the current game
        self.process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE)
        mlog.show("Starting proxy server ... Waiting for client answer...")
        # start to process all game commandes
        await self.proxyGame()
        pass
    
    async def proxyGame(self):
        #loop until process is running
        count = 0
        while self.process.poll() is None:
            # get error form the current executing commande
            errorMsg = await io.stderrGet(self.process)

            # run the current command using the server-process protocol
            if errorMsg == "none":
                await self.waitForReady("start")                               # wait until server is ready
                cmdsJS = await io.stdoutGet(self.process)                      # get command from process to send to client
                await self.sendCommandToClient(cmdsJS)                         # send the command to the client
                message = await self.getReponseFromClient()                    # get reponse from client 
                await self.waitForReady("insert")                              # wait until server is ready
                await io.stdinWrite(self.process, message)                     # send to process the client confirmation                         
                await self.waitForReady("close")                               # wait until server is ready
                if message == 'PROCESS_ENDED_BY_USER':                         # exit request from client
                    mlog.show("Game closed by User. By...")
                    self.process.terminate()
                    break
                count = count + 1                                              # count executed commamdes
                
                                
            # for any error
            if errorMsg.strip() != "none" and errorMsg.strip() != "":          
                mlog.show("Process error.. Game has been stopped..")
                mlog.show("Error message: " + errorMsg)
                await self.socket.send("PROCESS_ERROR" + errorMsg)                    # send the error to client
                self.process.terminate()                                       # stop the subprocess 
                break       
                
        mlog.show("Commandes executed: " + str(count))
        return

    # syncronisation between subporcess and server
    # stop the current sequence in proxy game and wait the reponse from process to continue
    async def waitForReady(self, value):
        while True:
            if await io.stdoutGet(self.process) == value:
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
            self.process.terminate()
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
            self.process.terminate()
            return None
        return None