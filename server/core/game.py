# Class Game
# Run games commandes defined into the tempfile using a process
# v.1.0

import asyncio
import websockets
import os
from .tempFile import TempFile
from .process import Process
import languages
from mod import mlog

class Game:
    
    def __init__(self, language, socket):
        self.classes = None                                    # engine game defined by the client
        self.content = None                                    # client game code 
        self.languageObject = languages.create(language)       # language with the engine
        self.languageName = language                           # the language name 
        self.process = None                                    # the process to execute the code          
        self.socket = socket                                   # cleint webSocket 
        pass
    
    # Start a new game using process
    async def run(self, socket):
        mlog.show("Starting the new game. Wait for ready....")
        # init and create new file with the game engine and the client code
        tmpFileToRun = TempFile(self.languageObject.getFileHeader(), self.classes, self.content)     
        # init the new game process
        self.process = Process(self.socket, tmpFileToRun, self.languageName)  
        # run the process
        await self.process.run()                                                    
        return