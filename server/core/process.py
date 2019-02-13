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

class Process:

    def __init__(self, socket, tempfile, languageName):
        self.socket = socket
        self.tempfile = tempfile
        self.languageName = languageName
        self.process = None
        pass

    def run(self):
        mlog.show("Proccess ready! Using engine to play game")
        self.process = subprocess.Popen(self.languageName + " " + self.tempfile.getName(), shell=True, stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE)
        # Fetch the error from the stderr ("none" if no error)
        errorMsg = self.process.stderr.readline().decode()
        if errorMsg.strip() == "none":
            self.proxyGame()
        else:
            mlog.show("Process error.. Game has been stopped..")
            mlog.show("Error message: " + errorMsg)
            self.socket.send("ERROR/" + errorMsg)
        pass
    
    def proxyGame(self):
        # wait for client reponse
        mlog.show("Starting proxy server ... Waiting for client answer...")
        pass
