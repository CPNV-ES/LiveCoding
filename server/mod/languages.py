# languages module: Search and load a selected language
# Langauges are defined into the manifest.py file

import os, fnmatch
import json
from mod import mlog

root = os.getcwd()
path = root + "/languages/"
pattern = "__manifest__.py"
directories = [d for d in os.listdir(path) if os.path.isdir(os.path.join(os.path.abspath(path), d))]

def loadLanguage(name):
    mlog.show("Loading " + name + " language...")
    for dir in directories:                                                                       # start to search manifest.py file into all sub folders
        currentDirectory = path + dir + "/"
        files = os.listdir(currentDirectory)
        for file in files:                                                                        # search manifest.py in all file  
            if fnmatch.fnmatch(file, pattern):                                                    # only directory with manifest file
                content = open(currentDirectory + file, "r").read().replace("'", "\"")            # read language from manifest file 
                languageName = json.loads(content)['targetLanguage'].lower()
                if languageName == name:                                                          # load the selected language
                    fileName = json.loads(content)['file name']
                    exec(open(currentDirectory + fileName).read())                           
                    mlog.show('Language ' + languageName + " has been loaded")
                    return languageName
    mlog.show(name + " language is not defined")                                                  # default action.. nothing to do if selected language is not defined
    return None