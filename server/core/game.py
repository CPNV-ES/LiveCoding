import asyncio
import websockets
import socket
import os
import json
from .TempFile import TempFile
from .process import Process
import languages
from mlogging import mlog

class Game:
    
    def __init__(self, language, socket):
        self.classes = None                                     # engine game defined by the client
        self.content = None                                    # client game code 
        self.languageObject = languages.create(language)       # language with the engine
        self.languageName = language
        self.process = None                                    # the process to execute the code          
        self.socket = socket
        pass
    
    async def run(self, socket):
        mlog.show("Starting the new game. Wait for ready....")
        tmpFileToRun = TempFile(self.languageObject.getFileHeader(), self.classes, self.content)                    # init and create new file with the game engine and the client code

        self.process = Process(self.socket, tmpFileToRun, self.languageName)  # init the new game process
        self.process.run()                                                    # run the process
        pass