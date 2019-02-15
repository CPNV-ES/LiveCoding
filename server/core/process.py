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
        errorMsg = self.process.stderr.readline().decode()
        mlog.show(errorMsg)
        if errorMsg.strip() == "none":
            self.process.stdin.write(bytes("ready","UTF-8"))
            cmdsJS = self.process.stdout.readline().decode()
            print("the command: "+ cmdsJS)
            await self.socket.send(cmdsJS)
            message = await self.socket.recv()
            mlog.show("Starting proxy server ... Waiting for client answer...")
        else:
            mlog.show("Process error.. Game has been stopped..")
            mlog.show("Error message: " + errorMsg)
            self.socket.send("ERROR/" + errorMsg)
        pass
    
    async def proxyGame(self):
        # wait for client reponse
        pass
