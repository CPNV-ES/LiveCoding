# Base input output class to send an received data from socket

import subprocess

async def stdinGet(process):
    res = process.stdin.readline().decode().strip()
    process.stdin.flush()
    return res

async def stdoutGet(process):
    res = process.stdout.readline().decode().strip()
    process.stdout.flush()
    return res

async def stderrGet(process):
    res = process.stderr.readline().decode().strip()
    process.stderr.flush()
    return res

async def stdinWrite(process, value):
    process.stdin.write(bytes(value + "\n","UTF-8"))
    process.stdin.flush()
    return True

async def stderrWrite(process, value):
    process.stderr.write(bytes(value + "\n","UTF-8"))
    process.stderr.flush()
    return True

async def stdoutWrite(process, value):
    process.stdout.write(bytes(value + "\n","UTF-8"))
    process.stdout.flush()
    return True