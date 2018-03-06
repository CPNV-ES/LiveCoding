import socket
import subprocess
import os
import json
exec(open("TempFile.py").read())

class Processor:

	def __init__(self):
		self.language = ""
		self.userCmds = ""
		pass

	def peel(self, datas):
		self.language = datas.split('/', 1)[0]
		self.userCmds = datas.split('/', 1)[1]


	def execute(self, socket):
		if self.language == "ruby":
			tmpFileToRun = TempFile(self.userCmds, "load \"ruby/commands.rb\"")
			tmpFileToRun.create()
			self.runInInterpretor(socket, tmpFileToRun)

		elif self.language == "php":
			tmpFileToRun = TempFile(self.userCmds, "<?php require \"php/commands.php\";", "?>")
			tmpFileToRun.create()
			self.runInInterpretor(socket, tmpFileToRun)

	def runInInterpretor(self, socket, fileToRun):
		# Open a command line and run the userCmds tmp file into the good interpretor
		cliProcess = subprocess.Popen(self.language+" "+fileToRun.getName(), shell=True, stdout=subprocess.PIPE, stdin=subprocess.PIPE, stderr=subprocess.PIPE)

		# Fetch the error from the stderr ("none" if no error)
		errorMsg = cliProcess.stderr.readline().decode()
		if(errorMsg.strip() == "none"):
			# Fetch from the process the JS commande that the game will be able to execute, and format the string
			cmdsJS = "execute/{}".format(cliProcess.stdout.readline().decode())
			print(cmdsJS)
			# Send the JS commands through the socket and fetch the return message of the game execution
			socket.send(cmdsJS.encode())
			gameReturnedMsg = socket.recv(1024).decode()
			# Put the game returned message into the STDIN (because the game method of the target langage wait a response to return it to the langage interpretor)
			cliProcess.stdin.write(bytes(gameReturnedMsg+"\n","UTF-8"))
			cliProcess.stdin.flush() # !! DONT FORGET TO FLUSH THE BUFER AFTER EACH WRITE !!
			print("Returned by interpretor -> "+cliProcess.stdout.readline().decode())
		# Error detected -> send to the builder via the socket the errorMsg 
		else:
			data = {}
			data['language'] = self.language
			data['message'] = errorMsg
			data['fileName'] = fileToRun.getName()
			json_data = json.dumps(data)

			data = 'error/'+json_data

			socket.send(data.encode())

			