+++
author = "Vasav"
categories = ["python","automation","rpa"]
date = "2021-11-23"
description = "Robot Framework Setup"
featuredpath = "date"
linktitle = ""
title = "Setup for robot framework on windows for automation"
type = "post"

+++

## Prerequisites
* Python must be installed in the machine
* If python is not installed then follow the instruction in [this video](https://www.youtube.com/watch?v=4Rx_JRkwAjY)
* Make sure to add python in environment variables

## Installing robot framework library using PIP
* robot framework has their python library which can be installed using ```pip install robotframework``` command. Reference for the command can be found [here](https://pypi.org/project/robotframework/).
* There are some other libraries that you may need to install depending on the use case. At this stage, I am going to include demo for web automation in future posts. For that an additional library is required which is powered by selenium. 
* Install that library using ```pip install robotframework-seleniumlibrary```.
* This command will install all the required libraries to support robot framework. 

## Editor
* A text editor is required to write python code. There are few freely available text editors available in the market and there are tons of videos available to setup these editors. Here is a list of popular text editor which can be used to write and run automagica code. 

1. [Notepad++](https://notepad-plus-plus.org/downloads/)
2. [Pycharm Community Edition](https://www.jetbrains.com/pycharm/download/#section=windows) (Install plugin named - [intellibot-seleniumlibrary-patched](https://plugins.jetbrains.com/plugin/10700-intellibot-seleniumlibrary-patched))
3. [Visual Studio Code](https://code.visualstudio.com/download)
4. [nteract](https://github.com/nteract/nteract/releases)

## Next Steps
Once robot framework is installed, you are all set to automate your redundant office tasks. I will cover the basic demo in the upcoming posts. 