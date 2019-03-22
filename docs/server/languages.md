# Create and Use a new language
The LiveCoding server allow you to create new languages package to performe your game.

## Language module
LiveConding use a modular structure to integrate new languages. 
You can find the languages module into **~/server/mod" folder**. This module load all languages packages stored inside the **languages** folder in where are stored all languages packages.
So, if you want to add a new language package for your game it's enough to put your package inside it.

## How it work
LiveCoding use a manifest file to verify if a language package is defined and can be used.

This is an example of manifest file:

    {
    'name': 'Php Language Class',
    'targetLanguage': 'Php',
    'file name': 'Php.py',
    'version': '1.0',
    'category': 'Language',
    'description': ''
    }

This file is required in each package that you have created.
The are two main informations that are necessary: 

    - The language name
    - The file where your language class is defined

Your personal language are loaded and used by the server when the client start a new game. The sequence is defined as:

- 1 Client start a new game
- 2 The server get the language name to be used
- 3 The language module verify if a manifest file exists for the required language 
- 4 If the manifest file exists the server load the required language
- 5 If the manifest file not exists the server stop the client request and send a error message to client

## How to create
Create a new language module step by step is very simple. Follow the procedure and enjoy.

### Create Folder
First of all create a new folder for your new language package inside the **/server/languages** folder. Folder name must be the same to your language. For example if you want create a new **fortran** language package you must create a new folder called **fortran**. In fact into the manifest file there is no informations about folder name, so as default the server use a folder to load language that have the same name of your language.

    exampele: to create a new javascript language module:

    mkdir /server/languages/javascript
### Create the __init__.py file
The __init__.py file in python 3 allow you to set the current folder as a module. In this way you can use all files inside the folder as modules.

## How to use

