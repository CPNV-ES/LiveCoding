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
        cmd = self.languageName + " " + self.tempfile.getName()
        self.process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE)
        mlog.show("Starting proxy server ... Waiting for client answer...")
        await self.proxyGame()
        pass
    
    async def proxyGame(self):
        #loop until process is running
        count = 0
        while self.process.poll() is None:
            errorMsg = await io.stderrGet(self.process)

            if errorMsg == "none":
                await self.waitForReady("start")     
                cmdsJS = await io.stdoutGet(self.process)
                await self.sendCommandToClient(cmdsJS)
                message = await self.socket.recv()
                mlog.show("Received confirmation from client: "+ message)
                await self.waitForReady("insert")
                await io.stdinWrite(self.process, message)
                await self.waitForReady("close")
                if message == 'PROCESS_ENDED_BY_USER':
                    mlog.show("Game closed by User. By...")
                    self.process.terminate()
                    break
                count = count + 1
                
                                
            if errorMsg.strip() != "none" and errorMsg.strip() != "":
                mlog.show("Process error.. Game has been stopped..")
                mlog.show("Error message: " + errorMsg)
                await self.socket.send("ERROR/" + errorMsg)
                self.process.terminate()
                break
                
        mlog.show("Commandes executed: " + str(count))
        return

    async def waitForReady(self, value):
        while True:
            if await io.stdoutGet(self.process) == value:
                return
        return

    async def sendCommandToClient(self, value):
        mlog.show("Send command to client: " + value)
        await self.socket.send(value)
        pass