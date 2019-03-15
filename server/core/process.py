import asyncio
import websockets
import socket
import os
import json
from .TempFile import TempFile
import languages
from mod import languages
from mlogging import mlog
import subprocess
import time
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
        while self.process.poll() is None:
            errorMsg = await io.stderrGet(self.process)

            if errorMsg == "none":
                await self.waitForReady()     
                cmdsJS = await io.stdoutGet(self.process)
                await self.sendCommandToClient(cmdsJS)
                message = await self.socket.recv()
                if message == 'PROCESS_ENDED_BY_USER':
                    mlog.show("Game closed by User. By...")
                    self.process.terminate()
                    break
                mlog.show("Received confirmation from client: "+ message)
                await self.waitForReady()
                await io.stdinWrite(self.process, message)
                                
            if errorMsg.strip() != "none" and errorMsg.strip() != "":
                mlog.show("Process error.. Game has been stopped..")
                mlog.show("Error message: " + errorMsg)
                self.socket.send("ERROR/" + errorMsg)
                self.process.terminate()
                break
        return

    async def waitForReady(self):
        mlog.show("Wait for new command to process...!")
        while True:
            await io.stdinWrite(self.process, "ready")
            if await io.stdoutGet(self.process) == "ready":
                return
        return

    async def sendCommandToClient(self, value):
        mlog.show("Send command to client: " + value)
        await self.socket.send(value)
        pass