import subprocess

class Php:

	def __init__(self):
		self.header = "<?php require \"languages/php/engine.php\";?>"
		self.footer = "?>"
		# Language call is the real name of the command we'll run in the CLI
		# We define it in case of versionning e.g : php 7 
		self.languageCall = "php"
		pass

	def getFileHeader(self):
		return self.header

	def getFileFooter(self):
		return self.footer

	def getlanguageCall(self):
		return self.languageCall

	def runProcessAndFetchIt(self, fileToRun):
		# Open a command line and run the userCmds tmp file into the good interpretor
		return subprocess.Popen(self.languageCall+" "+fileToRun.getName(), shell=True, stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE)
