# Class Process
# Process all game code running into a sunprocess and send the result to client
# v1.0

import asyncio
import websockets
import os
from mod import mlog
import subprocess
from mod import io

class Process:

    def __init__(self, socket, tempfile, languageName):
        self.socket = socket
        self.tempfile = tempfile
        self.languageName = languageName
        self.subprocess = None
        return

    async def run(self):
        mlog.show("Loading a new process.... Wait")
        # prepare the subprocess command
        cmd = self.languageName + " " + self.tempfile.getName()
        # execute a new process for the current game
        self.subprocess = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE)
        mlog.show("Process loaded... Ready to go!")
        return