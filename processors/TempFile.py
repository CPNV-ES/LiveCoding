import tempfile;

class TempFile:
	def __init__(self, content, header= "", footer= ""):
		self.content = content
		self.header = header
		self.footer = footer
		self.file = None
		pass

	# Create a tmpfile which contains all the user code that we will execute. (the file is deleted by itself as soon as it is closed by the process)
	def create(self):
		self.file = tempfile.NamedTemporaryFile(delete=True)
		self.file.write(bytes(self.header+"\n"+self.content+"\n"+self.footer+"\n", "UTF-8"))
		self.file.seek(0)

	def getName(self):
		return self.file.name