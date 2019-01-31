# Listen all from socket

import asyncio
import websockets
import socket
import select
from mlogging import mlog
from .Processor import Processor

class Listen:

    mainSocket = None
    processor = None
    languages = ['php', 'ruby']
    selectedLanguage = None
    
    def __init__(self, socket):
        self.mainSocket = socket
        self.processor = Processor()
        self.engine = None
        self.content = None
        return

    #protocol sequency
    async def run(self):
        if not await self.get_language(): 
            return False
        if not await self.get_engine():
            return False
        if not await self.get_content():
            return False
        if not await self.start_proxy():
            return False
        return True
    
    # get the game language
    async def get_language(self):
        message = await self.mainSocket.recv()
        if (message in self.languages):
            await self.mainSocket.send('OK')
            mlog.show("Language game for client: " + message)
        else:
            await self.mainSocket.send('ERROR/Not game for this language')
            mlog.show("The language " + message + " is not defined for this game")
            return False
        return True

    # get the game engine code form client
    async def get_engine(self):
        self.engine = await self.mainSocket.recv()
        mlog.show("Engine loaded successfully!")
        await self.mainSocket.send('OK')
        return True

    # get code content form client
    async def get_content(self):
        self.content = await self.mainSocket.recv()
        mlog.show("Client code loaded successfully!")
        await self.mainSocket.send('OK')
        return True

    # start the game
    async def start_proxy(self):
        #message = await self.mainSocket.recv()
        #self.processor.peel(message)
        #await self.processor.execute(self.mainSocket)
        return True

    
         