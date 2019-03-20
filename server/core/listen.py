# Listen all from socket:
# Get all data form client and create a new game then run it

import asyncio
import websockets
import socket
import select
from mod import mlog
from .game import Game
from mod import languages

class Listen:
    
    def __init__(self, socket):
        self.mainSocket = socket          # the client socket to listen
        self.game = None                  # the game to attach a this connection 
        return

    #protocol sequency
    async def run(self):
        if not await self.get_language(): 
            return False
        if not await self.get_classes():
            return False
        if not await self.get_content():
            return False
        if not await self.start_game():
            return False
        return True
    
    # get the game language from client 
    async def get_language(self):
        mlog.show("Waiting for the game language information ...")
        message = await self.mainSocket.recv()
        mlog.show("Language game for client: " + message)
        selectedLanguage = languages.loadLanguage(message)
        if (selectedLanguage):
            # create a new game for the selected language
            self.game = Game(selectedLanguage, self.mainSocket)
            await self.mainSocket.send('OK')
        else:
            await self.mainSocket.send('ERROR/Not game for this language')
            mlog.show("The language " + message + " is not defined for this game")
            return False
        return True

    # get the game engine code form client
    async def get_classes(self):
        mlog.show("Waiting for client game engine...")
        self.game.classes = await self.mainSocket.recv()
        mlog.show("Client game engine loaded successfully!")
        await self.mainSocket.send('OK')
        return True

    # get code content form client
    async def get_content(self):
        mlog.show("Waiting for the client game code ...")
        self.game.content = await self.mainSocket.recv()
        mlog.show("Client game code loaded successfully!")
        await self.mainSocket.send('OK')
        return True

    # start the game
    async def start_game(self):
        await self.game.run(self.mainSocket)
        return True

    
         