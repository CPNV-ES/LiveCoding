from .php import *
from .ruby import *
import os, fnmatch
import json

root = os.getcwd()
path = root + "/languages/targetLanguage/"
pattern = "*__manifest__.py"
modules = []

directories = [d for d in os.listdir(path) if os.path.isdir(os.path.join(os.path.abspath(path), d))]

for dir in directories:
    currentDirectory = path + dir + "/"
    files = os.listdir(currentDirectory)
    for file in files:  
        if fnmatch.fnmatch(file, pattern):
            content = open(currentDirectory + file, "r").read().replace("'", "\"")
            modules.append(json.loads(content)['targetLanguage'])

modules = map(__import__, modules)