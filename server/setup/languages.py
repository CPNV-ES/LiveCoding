import os, fnmatch
import json

root = os.getcwd()
path = root + "/languages/targetLanguage/"
pattern = "__manifest__.py"
languages = {}

directories = [d for d in os.listdir(path) if os.path.isdir(os.path.join(os.path.abspath(path), d))]

for dir in directories:
    currentDirectory = path + dir + "/"
    files = os.listdir(currentDirectory)
    for file in files:  
        if fnmatch.fnmatch(file, pattern):
            content = open(currentDirectory + file, "r").read().replace("'", "\"")
            languageName = json.loads(content)['targetLanguage']
            fileName = json.loads(content)['file name']
            languages[languageName] = fileName
            exec(open(currentDirectory + fileName).read())