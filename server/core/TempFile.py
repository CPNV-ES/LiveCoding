import tempfile

# Wrapper class to create a temp file, it uses the temfile library
class TempFile:
	def __init__(self, engine, content):
		self.content = content
		self.engine = engine
		self.file = None
		self.create()
		pass

	# Create a tmpfile which contains all the user code that we will execute. (the file is deleted by itself as soon as it is closed by the process)
	def create(self):
		self.file = tempfile.NamedTemporaryFile(delete=True)
		self.file.write(bytes(self.engine + "\n" + self.content + "\n", "UTF-8"))
		self.file.seek(0)

	def getName(self):
		return self.file.name