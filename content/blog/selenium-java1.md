+++
author = "Vasav"
categories = ["qa","automation"]
date = "2022-03-12"
description = "Selenium Webdriver management approach"
featuredpath = "date"
linktitle = ""
title = "Managing Webdrivers in Selenium"
type = "post"

+++

## Introduction
Selenium webdriver is one of the most popular open-source libraries for performing UI automation. Selenium Webdriver supports major high level programming languages like ```Java,Python,C#,Ruby,Javascript```. Selenium allows companies and teams to automate all major/popular browsers. In this article I am going to cover the best approach for managing the webdrivers.

## How selenium works

There are 3 main components which are required for setting up selenium suite:
1. Client libraries
2. Browser Drivers
3. Browsers

### Client Libraries
Developers will choose a programming language to write automation scripts. As desribed in the introduction section, selenium supports all popular high level languages. You need to download the required libraries which are listed on the official [selenium website](https://www.selenium.dev/downloads/). 

I primarily use java and python. So here is a quick tutorial to setup selenium with java and python.
___

### Java
1. Create a maven project 
2. Open pom.xml file
3. Insert the following dependency and then you are good to go
```

<!-- https://mvnrepository.com/artifact/org.seleniumhq.selenium/selenium-java -->
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.1.2</version>
</dependency>
```
**Different versions of selenium can be found on [mvnrepository](https://mvnrepository.com/artifact/org.seleniumhq.selenium/selenium-java) website.** 
___
### Python
1. Create a virtual env (It is a good practice to have one but not required.)
2. Activate the virtual environment
3. Use the below command to install selenium
```
pip install selenium
```
___

### Browser Drivers
Selenium API uses ```driver``` to interact with the actual browser. So depending on the browser which needs to be automated, a binary file for that browser needs to be downloaded. Selenium API interacts with the binary using [W3C webdriver protocoal](https://www.w3.org/TR/webdriver/).

### Browsers
These are the actual web browsers that we use to browse internet. Browser drivers will interact with native capabilities of each browser.

## Maintaining webdriver - Traditional Approach
When I started my career in test automation in 2015, managing webdrivers was a different task altogether. In a framework that I developed or maintained, there used to be a specific package/directory which contains all the browser drivers associated with the web browsers. The code will reference this location while initializing the webdriver.

So the directory structure of a selenium project with maven will be something like this:
```
└───project-dir
    ├───pom.xml
    ├───README.txt
    ├───LICENSE.txt
    └───src
        ├───main
        │   ├───java
        │   ├───resources
        |       ├───drivers
        |           ├───chromedriver
        |           ├───geckodriver
        |
        ├───test
            ├───java
            ├───resources
          
        
```

In such a scenario, developers were making sure that the webdrivers located in the ```drivers``` directory were compatible with the actual browser. If the browser is updated, then the corrosponding driver should also be replaced in the ```drivers``` directory. So maintaining this was an issue, especially for modern browsers as they kept updating. If the driver and the browser are not compatible, then the selenium test won't execute.

## Efficient way to handle this issue

As mentioned in the above section, the developers must keep track of the browser updates and also need to keep updating the browser instance. In addition to that, the binary for the driver is different for every platform (windows, linux, mac).

In order to overcome these set of issues, a [```webdriver manager```](https://bonigarcia.dev/webdrivermanager/) is used. Webdriver manager takes care of the drivers and also makes sure that the driver and the browser versions are compatible. Setting up the webdriver manager is also very simple and straight forward. If you have modularized your framework then it is very easy to apply this to an existing code base as well.

Here I am going to showcase how it can be done on a ```Java``` project, but similar must be available for other programming languages.

## Java

For java, in the pom.xml file, add the following dependencies.

```
<dependency>
    <groupId>io.github.bonigarcia</groupId>
    <artifactId>webdrivermanager</artifactId>
    <version>5.1.0</version>
    <scope>test</scope>
</dependency>
```

```webdrivermanager``` provides managers for all the major browsers. Here is an example for the chrome browser. 

```
WebDriverManager.chromedriver().setup();
driver = new ChromeDriver();
```


## References
1. https://bonigarcia.dev/webdrivermanager/
2. https://hackr.io/blog/complete-guide-selenium-webdriver
3. https://www.selenium.dev/documentation/webdriver/getting_started/
4. https://www.toolsqa.com/selenium-webdriver/webdrivermanager/
