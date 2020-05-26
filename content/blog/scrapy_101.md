+++
author = "Vasav"
categories = ["python","data-analysis"]
date = "2020-05-26"
description = ""
featuredpath = "date"
linktitle = ""
title = "Web Scraping using python and scrapy"
type = "post"
+++

## Setting up Scrapy

* Python: 3.6
* Create a virtual environment
* Activate the virtual environment
* install Scrapy using command ```pip install scrapy```

This is all we need to up and running with scrapy. 
___

## Exploring Scrapy
In the terminal type ```scrapy``` in order to get the available commands associated with scrapy

Here is the list of available commands 
1. bench - Run quick benchmark test
1. fetch - Fetch a URL using the Scrapy downloader
1. genspider - Generate new spider using pre-defined templates
1. runspider - Run a self-contained spider (without creating a project)
1. settings - Get settings values
1. shell - Interactive scraping console
1. startproject - Create new project
1. version - Print Scrapy version
1. view - Open URL in browser, as seen by Scrapy
___

## Creating a Project
As per the above section, we will use ```startproject``` command to create a new project. 

```scrapy startproject worldometer```

* ```startproject``` - command
* ```worldometer``` - Name of the project
___

## Creating a Spider

Naviagate to the newly create project directory. Use the following command to create a spider:

```scrapy genspider countries www.worldometers.info/world-population/population-by-country```

* ```genspider``` - command to generate spider
* ```countries``` - Name of the spider. Must be unique
* ```www.worldometers.info/world-population/population-by-country``` - URL for the spider

This command will generate a folder named spider
___

## Introduction to scrapy shell

* Install ipython using command ```pip install ipython```
* After installation use command ```scrapy shell``` to start scrapy shell in the terminal/command prompt. 

Exploring various shell Commands

* ```shelp()``` - It gives available scrapy objects which can be used in a shell
*  ```fetch("https://www.worldometers.info/world-population/population-by-country/")``` - Crawl on the given url. Other option is to use request object.
```
req = scrapy.Request(
    url="https://www.worldometers.info/world-population/population-by-country/"
    )
fetch(r)
```
* ```response.body``` - This command will display the response from the website

* ```view(response)``` - This will open view in a web browser. 

**Important thing to note here is that the spider see web content without javascript**
___

## Introduction to Object Identification and Data Capturing

As mentioned earlier, spider does not see javascript on the page. So in that case, we can disable the javascript while inspecting the web page. Steps to disable javascript are provided on this [post](https://stackoverflow.com/questions/13405383/how-to-disable-javascript-in-chrome-developer-tools).

* Xpath expressions for the elements can be built using this [cheat sheet](https://devhints.io/xpath).

Following are the steps to obtain the content of an element. 

```
title = response.xpath("//h2/text()")
title.get()
```

Above 2 commands will give the content of the xpath ```//h2/text()```

```
title = response.css("h2::text")
title.get()
```
Above 2 commands will give the content of the css selector ```h2::text```

```
response.xpath("//td/a/text()").getall()
```

Above command will give the content of all the elements as a list 

___

## Changing the script and running the spider

In the spider created earlier using scrapy command, we wiil modify and run that file. 

Make changes in the countries.py file. 

```
class CountriesSpider(scrapy.Spider):
    name = 'countries'
    allowed_domains = ['www.worldometers.info/world-population/population-by-country']
    start_urls = ['https://www.worldometers.info/world-population/population-by-country/']

    def parse(self, response):
        countries = response.xpath("//td/a/text()").getall()

        yield {
            'countries': countries
        }
```

The methods that we tried in the shell are used in the parse method and the result is returned using yield having key as 'countries.

Now from the shell, run command ```scrapy crawl countries``` . Make sure you are in the same location as ```scrapy.cfg``` file. 

The script will run and provide the output in the shell. 

