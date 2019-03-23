# Environment preparation

## Intro
The purpose of this document is to indicate how to set up a server that will be used to process game commands and to run the server.

## Windows

###Pyton3
LiveCoding server is writen in python language. So it is necessary to install python in your system to run the server.

Follow this link to install python3: [Python3 install](https://realpython.com/installing-python/)

###Pip3
Pip3 allow you to install python modules. Normally pip3 is installed with python3. So there is nothing to do.

### PHP
1. Go to http://windows.php.net/download/
2. Download the latest Non Thread Safe binaries
3. Extract the files to ```C:\php```
4. Add ```C:\php``` in the environment path variable
5. ```$ php -f <filename.php>```

### Javascript
1. Go to https://nodejs.org/en/download/
2. Download the latest Windows Installer (.msi)
3. Install Node
4. ```$ node <filename.js>```

### Ruby
1. Go to https://rubyinstaller.org/downloads/
2. Download Ruby 2.4.3-1
3. Set the installation path to be ```C:\Ruby``` and make sure ```Add ruby executables to you path```
4. ```$ ruby <filename.rb>```

## Linux

###Python3
LiveCoding server is writen in python language. So it is necessary to install python in your system to run the server. to install python3 type the follow command in your console:

	# apt-get install build-essential

###Pip3
Pip3 allow you to install python modules.To install pip3 type the follow command in your console:

	# apt-get install python-pip3

### PHP
1.```$ sudo apt-get install php-5```
2. ```$ php -f <filename.php>```

### Javascript
1.```$ sudo apt-get install nodejs```
2. ```$ nodejs <filename.js>```

### Ruby
1.```$ sudo apt-get install ruby-full```
2. ```$ ruby <filename.rb>```

## Required mudules
In ordre to use added modules in LiveCoding server you must install using **pip3**:

Colored Logs

	# pip3 install colored coloredlogs

Websockets

	# pip3 install websockets
