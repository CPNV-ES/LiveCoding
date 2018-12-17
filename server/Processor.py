import socket
import os
import json
import logging
from TempFile import TempFile
exec(open("setup.py").read())

class Processor:

	def __init__(self):
		self.language = ''
		self.userCmds = ''
		pass

	def peel(self, data):
		targetLanguage = data.split('/', 1)[0] # Target language is just the name who become from the socket message
		self.userCmds = data.split('/', 1)[1]
		self.language = LanguageFactory.create(targetLanguage) # language is the real language object /ruby, Php, etc.)

	def execute(self, socket):
		tmpFileToRun = TempFile(self.userCmds, self.language.getFileHeader(), self.language.getFileFooter())
		tmpFileToRun.create()
		print(tmpFileToRun.content)

		print("Process lance")
		process = self.language.runProcessAndFetchIt(tmpFileToRun)

		# Fetch the error from the stderr ("none" if no error)
		errorMsg = process.stderr.readline().decode()
		if (errorMsg.strip() == "none"):
			print("Pas d'erreur")
			# Fetch from the process the JS commande that the game will be able to execute, and format the string
			cmdsJS = "execute/{}".format(process.stdout.readline().decode())
			print("La commande :")
			print(cmdsJS)
			# Send the JS commands through the socket and fetch the return message of the game execution
			socket.send(cmdsJS.encode())
			gameReturnedMsg = socket.recv(1024).decode()
			print(gameReturnedMsg)
			# Put the game returned message into the STDIN (because the game method of the target langage wait a response to return it to the langage interpretor)
			process.stdin.write(bytes(gameReturnedMsg+"\n","UTF-8"))
			process.stdin.flush() # !! DONT FORGET TO FLUSH THE BUFER AFTER EACH WRITE !!
			print("Returned by interpretor -> "+process.stdout.readline().decode())
		# Error detected -> send to the builder via the socket the errorMsg
		else:
			print("Il y a eu une erreur")
			data = {}
			data['language'] = self.language.getlanguageCall()
			data['message'] = errorMsg
			data['fileName'] = tmpFileToRun.getName()
			json_data = json.dumps(data)

			data = 'error/'+json_data

			socket.send(data.encode())