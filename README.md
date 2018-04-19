# LiveCoding
_Livecoding is a desktop appliaction where newbies can learn the basics of programmation._  
_The principle is simple : You write commands in the in-app editor, press send, and the commands will interact the a little game (like pacman)._  

## Getting started :ok_hand:

### Electron app (client)

#### Prerequisites
 - Node.js

#### Node.js
*Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code server-side.*

You need Node.js because we manage all our dependencies with npm which is includes in Node.js. 

*npm is the package manager for JavaScript and the world’s largest software registry.*

If you don't have Node.js installed, go to [this download page](https://nodejs.org/en/download/) and follow the instructions.

#### installation
you need to install all the dependencies of the project. So you have to be in the project folder and simply run this command : `npm i`.

So there, now you're up and running and you can start messing arround with the project.

#### Running the app
When everything is installed, run `npm start` in the project folder and you should be good to go. 

### Debian server
We have a debian server which communicate with all electron applications.

#### Specifications
 - Debian 8.6
 - Python 3
 - Ruby 2.1
 - Php 7.0


#### Installation
We used VMware Workstation, so you can find in the [realeases page](https://github.com/CPNV-ES/LiveCoding/releases) of the repo a .zip in the last release that include an export of the actual server version. To install it you just have to import the .ovf in VMware Workstation and follow the instructions.

The server is ready to use and have git installed, so if you want to have the last updates, go to the project folder : `/home/cpnv/LiveCoding` and used the git commands to fetch updates.

*If you don't want to use our virtual machine export, you have to build our own server which contains all specifications mentioned [here](#specifications)*.

All the code executed by the server is in the folder : `LiveCoding/processors`.

#### Configuration
 - The server need to communicate to the client so you have to put a static IP. 
 - If you want to pull the repository, be sure to have internet connection. *Be carefull to change the DNS to yours*
 - The client application must know the server IP to connect to the TCP server (running in the server). Open the `LiveCoding/main.js` file and search the `new ComSocket("...")` line to type your right server IP.

#### Running the python TCP server :clap:
We have a TCP server wrote in Python to communicate with the clients by sockets.

To run the server without errors you need to have root privileges and go to the `/home/cpnv/LiveCoding/processors` folder and run `sudo python3 server.py` 

Now the TCP server listen in the 12800 port and are ready to communicate with clients.

*Dont forgot to run the TCP server before the client application !*
 

## Built with :muscle:
* [electron](https://electronjs.org/) - Desktop application
* [jQuery](https://jquery.com/) - For front-end DOM manipulation and event handling.
* [lodash](https://lodash.com/) - Utility library for data structure manipulations.
* [socket](https://nodejs.org/api/net.html#net_net) - For TCP communications.

## Authors :wave:
* [EricBroutba](https://github.com/EricBroutba)  
* [Loïc Dessaules](https://github.com/gollgot)
* ...

## Documentation :book:
You can read the full documentation in **french** [here](https://docs.google.com/document/d/1fkNICn0q7WczbRoqzaK3-Cywe4iNDkT-OlqZPiTaOvw/edit?usp=sharing).  
We also have a **logbook** [here](https://docs.google.com/spreadsheets/d/199NcMHqpopsX3ojlcSrUzju_kCopXOCgO8GdGqmlyHM/edit?usp=sharing).  
