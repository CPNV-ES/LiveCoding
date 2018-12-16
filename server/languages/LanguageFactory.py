class LanguageFactory:

	def __init__(self):
		pass

	@staticmethod
	def create(Language):
		if Language == "ruby":
			return  Ruby()
		elif Language == "php":
			return Php()