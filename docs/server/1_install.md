# Install and Run LiveCoding server

## Intro
In ordre to run your game you must install a new LiveCoding server. You can install and run the server in Winows and Linux.

## How to install in Windows OS

### Pyton3
LiveCoding server is writen in python language. So it is necessary to install python in your system to run the server.

Follow this link to install python3: [Python3 install](https://realpython.com/installing-python/)

### Pip3
Pip3 allow you to install python modules. Normally pip3 is installed with python3. So there is nothing to do.

### Php
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

## How to install in Linux

###Python3
LiveCoding server is writen in python language. So it is necessary to install python in your system to run the server. to install python3 type the follow command in your console:

	# apt-get install build-essential

### Pip3
Pip3 allow you to install python modules.To install pip3 type the follow command in your console:

	# apt-get install python-pip3

### Php
	$ sudo apt-get install php-5

### Javascript
	$ sudo apt-get install nodejs

### Ruby
	$ sudo apt-get install ruby-full

## Required mudules
In ordre to use added modules in LiveCoding server you must install using **pip3**:

Colored Logs

	# pip3 install colored coloredlogs

Websockets

	# pip3 install websockets

## How to run

Now you are ready to run the server. Go in **/server** folder and run the **main.py** python file

	$ python3 main.py
