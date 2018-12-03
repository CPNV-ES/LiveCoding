from Language import *

class LanguageFactory:

	def __init__(self):
		pass

	@staticmethod
	def create(targetLanguage):
		if targetLanguage == "ruby":
			return Ruby()
		elif targetLanguage == "php":
			return Php()