import subprocess
from Language import Language

class Ruby(Language):

	def __init__(self):
		header = "load \"ruby/commands.rb\""
		footer = ""
		# Language call is the real name of the command we'll run in the CLI
		# We define it in case of versionning e.g : python 3
		languageCall = "ruby"
		Language.__init__(self, header, footer, languageCall)
		pass