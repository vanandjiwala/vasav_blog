+++
author = "Vasav"
categories = ["miscellaneous"]
date = "2020-04-02"
description = ""
featured = "pic02.jpg"
featuredalt = "Pic 2"
featuredpath = "date"
linktitle = ""
title = "Installing Hugo On Windows"
type = "post"

+++
# Installing Hugo On Windows
**Installation**
1. Naviage to [Hugo release page](https://github.com/gohugoio/hugo/releases).
2. Install Hugo version based on your OS. In my case I am using windows 10 - 64 bit.
3. Create a folder in C drive named Hugo. Use can use any location ideally. Extract the downloaded Gugo zip file there.
4. Go to start and type Environment varibale in order to make Hugo available from all locations through command line. Tutorial about the same can be found [here](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/).
5. Include path where hugo executable file is located in the environment variables.
6. Save and apply changes. 
7. Start command line(cmd). cmd can be started wither from start or run(ctrl + r).
8. type command ```hugo help```. This command should display information about hugo and important commands that can be used with hugo. If you get error around ```command not found``` then there is something wrong with setting up the environment variable.