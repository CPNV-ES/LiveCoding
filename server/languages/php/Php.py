class Php:

	def __init__(self):
		self.header = None
		self.engine = "<?php require \"languages/php/engine.php\";?>"
		self.footer = "?>"
		# Language call is the real name of the command we'll run in the CLI
		# We define it in case of versionning e.g : php 7 
		self.languageCall = "php"
		pass

	def getFileHeader(self):
		return self.header

	def getFileEngine(self):
		return self.engine

	def getFileFooter(self):
		return self.footer

	def getlanguageCall(self):
		return self.languageCall