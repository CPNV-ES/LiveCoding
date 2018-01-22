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

    def execute(self):
        if self.language == "ruby":
            print("execution of ruby cmds")
        elif self.language == "php":
            pathToCmds = "php\commands.php"
            # This is the PHP code to include the cmds file before the php user's cmds. This way all our game methods (in php) are availabe for the php interpretor
            cmdsFileToInclude = "include '{}';".format(pathToCmds)
            cmdsToRun = cmdsFileToInclude+self.userCmds

            # Open a command line and run the php code into the php interpretor, and get results
            proc = subprocess.Popen("php -r \""+cmdsToRun+"\"" , shell=True, stdout=subprocess.PIPE)
            result = proc.stdout.read().decode()
            return result
        elif self.language == "javascript":
            print("execution of javascript cmds")


