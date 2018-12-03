import subprocess
from Language import Language

class Php(Language):

	def __init__(self):
		header = "<?php require \"php/commands.php\";"
		footer = "?>"
		# Language call is the real name of the command we'll run in the CLI
		# We define it in case of versionning e.g : php 7 
		languageCall = "php"
		Language.__init__(self, header, footer, languageCall)
		pass