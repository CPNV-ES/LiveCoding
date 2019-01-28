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
    
    def __init__(self, socket):
        self.mainSocket = socket
        self.processor = Processor()
        return

    async def run(self):
        message = await self.mainSocket.recv()
        self.processor.peel(message)
        await self.processor.execute(self.mainSocket)
        return    