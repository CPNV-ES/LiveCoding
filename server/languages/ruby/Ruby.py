class Ruby:

	def __init__(self):
		self.header = ""
		self.engine = "load \"languages/ruby/engine.rb\""
		self.footer = ""
		# Language call is the real name of the command we'll run in the CLI
		# We define it in case of versionning e.g : python 3
		self.languageCall = "ruby"
		pass

	def getFileHeader(self):
		return self.header

	def getFileEngine(self):
		return self.engine

	def getFileFooter(self):
		return self.footer

	def getlanguageCall(self):
		return self.languageCall