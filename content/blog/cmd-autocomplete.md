+++
author = "Vasav"
categories = ["miscellaneous"]
date = "2022-01-29"
description = ""
featuredpath = "date"
linktitle = ""
title = "Enable Autocomplete in cmd"
type = "post"
+++

## Issue
After I reset my windows machine, I was not able to perform autocomplete on command line. So below are the steps which can be used to enable it on a windows 10 machine. 

## Steps 
* Open start and search for registery editor
* Nevigate to the following location either by typing: **Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Command Processor** or using explorer on the left side
* There are 2 places where we need to change the value - ```CompletionChar, PathCompletionChar```
* Change both the values to 9. (In my case the value was ```40```, ```Base - HEX```)
* Close the registery editor
* Close any instance of cmd
* Open a new cmd and test
* Using TAB will perform autocomplete
___

## Ref
1. https://superuser.com/questions/121353/how-to-make-tab-work-right-in-command-window