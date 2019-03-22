# Create and Use a new language
The LiveCoding server allow you to create new languages to performe your game.

## Language module
LiveConding use a modular structure to integrate new languages. 
You can find the languages module into "~/server/mod" folder. This module load all languages stored inside the **languages** folder.
So, if you would to add a new language for your game it's enough to put your language folder inside it.

## How it work
The language module use a manifest file to verify if a language is defined and can be used.

This is an example of manifest file:

    {
    'name': 'Php Language Class',
    'targetLanguage': 'Php',
    'file name': 'Php.py',
    'version': '1.0',
    'category': 'Language',
    'description': ''
    }

This file is required in each personal language that you have created.
The are two main informations that are necessary: 

    - The language name
    - The file where your language class is defined

Your personal language are loaded and used by the server when the client start a new game. The sequence is defined as:

- 1 Client start a new game
- 2 The server get the language name to be used
- 3 The language module verify if a manifest file exists for the required language 
- 4 If the manifest file exists the server load the required language
- 5 If the manifest file not exists the server stop the client request and send a error message to client

At this moment the server verify if the required language exists 


## How to create
Create a new language module step by step

### Create Folder
First of all create a new folder called with the new language

    par exampele: to create a new javascript language module:

    mkdir /server/languages/javascript
### 

## How to use

