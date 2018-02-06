import socket
import subprocess

class Processor:

	def __init__(self):
		self.language = ""
		self.userCmds = ""
		pass

	def peel(self, datas):
		self.language = datas.split('/', 1)[0]
		self.userCmds = datas.split('/', 1)[1]
		#print("Language : {}".format(self.language))
		#print("User cmds : {}".format(self.userCmds))

	def execute(self, socket):
		if self.language == "ruby":
			print("execution of ruby cmds")
		elif self.language == "php":
			pathToCmds = "php/commands.php"
			# This is the PHP code to include the cmds file before the php user's cmds. This way all our game methods (in php) are availabe for the php interpretor
			cmdsFileToInclude = "include \"{}\";".format(pathToCmds)
			cmdsToRun = cmdsFileToInclude+self.userCmds
			print(cmdsToRun)
			# Open a command line and run the php code into the php interpretor, and get results
			cliProcess = subprocess.Popen('php -r \''+cmdsToRun+"' 2>./out.txt" , shell=True, stdout=subprocess.PIPE, stdin=subprocess.PIPE)
			# Get the stdout returned cmds (cmds in JS format to send them to the JS gameEngine)
			cmdsJS = "execute/{}".format(cliProcess.stdout.readline().decode())
			#socket.send(cmdsJS.encode())
			print(cmdsJS)
			# Returned value from the gameEngine cmds execution
			gameReturnedMsg = socket.recv(1024).decode()
			print("gameReturned->"+gameReturnedMsg)
			# Put returned value to the STDIN of the cli.
			cliProcess.stdin.write(gameReturnedMsg+'\n')
			cliProcess.terminate()
		elif self.language == "javascript":
			print("execution of javascript cmds")


