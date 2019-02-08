import asyncio
import websockets
import socket
import os
import json
from .TempFile import TempFile
from .Processor import Processor
import languages

class Game:
    
    def __init__(self, language):
        self.header = None
        self.footer = None
        self.engine = None
        self.content = None
        self.language = languages.create(language)
        pass
    
    async def run(self, socket):
        pass