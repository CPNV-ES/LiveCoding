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
            errorMsg = self.process.stderr.readline().decode()
            self.flushAll()

            if errorMsg.strip() == "none":
                await self.waitForReady()     
                cmdsJS = await self.getCommand()
                await self.sendCommandToClient(cmdsJS)
                message = await self.socket.recv()
                if message == 'PROCESS_ENDED_BY_USER':
                    self.process.terminate()
                    break
                mlog.show("Received confirmation from client: "+ message)
                await self.waitForReady()
                self.process.stdin.write(bytes(message + "\n","UTF-8"))
                self.process.stdin.flush()

                                
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
            self.flushAll()
            self.process.stdin.write(bytes("ready\n","UTF-8"))
            res = self.process.stdout.readline().decode().strip()
            if res == "ready":
                self.flushAll()
                return
        return

    async def getCommand(self):
        return self.process.stdout.readline().decode().strip()
        pass

    async def sendCommandToClient(self, value):
        mlog.show("Send command to client: " + value)
        await self.socket.send(value)
        pass

    async def stdinWrite(self, value):
        self.process.stdin.write(bytes(value + "\n","UTF-8"))
        pass

    async def stderrWrite(self, value):
        self.process.stderr.write(bytes(value + "\n","UTF-8"))
        pass

    async def stdoutWrite(self, value):
        self.process.stdout.write(bytes(value + "\n","UTF-8"))
        pass

    # flush all data in stdin stdout stderr
    def flushAll(self):
        self.process.stdout.flush()
        self.process.stdin.flush()
        self.process.stderr.flush()
        pass
