# Base input output class to send an received data from socket

import subprocess

def stdinGet(process):
    res = process.stdin.readline().decode()
    process.stdin.flush()
    return res

def stdoutGet(process):
    res = process.stdout.readline().decode()
    process.stdout.flush()
    return res

def stderrGet(process):
    res = process.stderr.readline().decode()
    process.stdout.flush()
    return res

def stdinWrite(process, value):
    process.stdin.write(bytes(value + "\n","UTF-8"))
    return True

def stderrWrite(process, value):
    process.stderr.write(bytes(value + "\n","UTF-8"))
    return True

def stdoutWrite(process, value):
    process.stdout.write(bytes(value + "\n","UTF-8"))
    return True