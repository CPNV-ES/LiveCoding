import socket
import subprocess
import os
import tempfile

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
			tmpFileToRun = self.createTempFile("load \"ruby/commands.rb\"")

			self.runInInterpretor(socket, tmpFileToRun)

		elif self.language == "php":
			tmpFileToRun = self.createTempFile("<?php require \"php/commands.php\";", "?>")
	
			self.runInInterpretor(socket, tmpFileToRun)
			
		elif self.language == "python":
			tmpFileToRun = self.createTempFile("exec(open(\"python/commands.py\").read()) ")
			self.runInInterpretor(socket, tmpFileToRun)

	# Create a tmpfile which contains all the user code that we will execute. (the file is deleted by itself as soon as it is closed)
	def createTempFile(self, header = "", footer = ""):
		# Create a tmpfile which contains all the user code that we will execute. (the file is deleted by itself as soon as it is closed)
		tmpFileToRun = tempfile.NamedTemporaryFile(delete=True)
		tmpFileToRun.write(bytes(header+"\n"+self.userCmds+"\n"+footer+"\n", "UTF-8"))
		tmpFileToRun.seek(0)

		return tmpFileToRun

	def runInInterpretor(self, socket, fileToRun):
		# Open a command line and run the userCmds tmp file into the good interpretor
		cliProcess = subprocess.Popen(self.language+" "+fileToRun.name, shell=True, stdout=subprocess.PIPE, stdin=subprocess.PIPE)
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