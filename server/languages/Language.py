class Language:

	def __init__(self, header, footer, language):
		self.header = header
		self.footer = footer
		self.languageCall = language
		pass

	def getFileHeader(self):
		return self.header

	def getFileFooter(self):
		return self.footer

	def getlanguageCall(self):
		return self.languageCall

	def runProcessAndFetchIt(self, fileToRun):
		# Open a command line and run the userCmds tmp file into the good interpretor
		return subprocess.Popen(self.languageCall+" "+fileToRun.getName(), shell=True, stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE)""