from core.listen import Listen
from core.connection import Connection
from mod import mlog
import configparser
import asyncio
import websockets

# get configuration form sconfig file
config = configparser.ConfigParser()
config.read("config.ini")
host = config.get("SOCKET CONFIGURATION","HOST")
port = int(config.get("SOCKET CONFIGURATION","PORT"))

#define the websocket main function
async def game(websocket, path):
    mlog.show("New Client Connection")
    listen = Listen(websocket)
    if await listen.run():
        await websocket.send("CLOSE_GAME")
    else:
        await websocket.send("CLOSE_GAME_WITH_ERRORS")
    mlog.show("Client Connection Closed")

mlog.show("Starting Live Coding Server .... Wait")
start_server = websockets.serve(game, host, port)                                     # initialize the websocket
asyncio.get_event_loop().run_until_complete(start_server)
mlog.show("Live Coding Server has been loaded.... Waiting for new connection")
asyncio.get_event_loop().run_forever()                                                # run the websocket service