from Php import Php
from Ruby import Ruby
# exec(open("Php.py").read())
# exec(open("Ruby.py").read())

class LanguageFactory:

	def __init__(self):
		pass

	@staticmethod
	def create(targetLanguage):
		if targetLanguage == "ruby":
			return Ruby()
		elif targetLanguage == "php":
			return Php()