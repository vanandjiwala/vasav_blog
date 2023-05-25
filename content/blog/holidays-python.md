+++
author = "Vasav"
categories = ["python"]
date = "2023-05-25"
description = "Python - Holidays Tutorial"
featuredpath = "date"
linktitle = ""
title = "Working with holiday package in python"
type = "post"
+++

## Introduction
In today's blog I am going to provide details on python holidays package which simplifies time-based functions and also proves invaluable in the realm of machine learning projects. In this post, we'll showcase the basic use case of Python holidays and highlight its significance in the world of machine learning. So, let's dive in and unlock the potential of Python holidays for your projects.

## Tutorial

As a part of this tutorial, we are going to generate data using python's `date_range` function and then detect holiday based on the desired region. Let's get started by installaing desired libraries:
___
### Installing libraries

```
pip install holidays
pip install pandas
```
___
### Import

The first step is to import desired python libraries using the following code snippet:

```
from datetime import date
import holidays
```
___
### Create a dataframe
We will create a dataframe using `date_range` method using the following code snippet:

```
start_date = "2020-01-01"
end_date = "2024-01-01"

df = pd.DataFrame(pd.date_range(start_date, end_date), columns=["ts"])
```

In the code above, we are setting `start_date` and `end_date` to a random date value which can be anything. In the next step, we are creating a dataframe from that date range having a single column `ts`. 
___
### Basics of holidays
In order to use holidays, you can create an object based on the desired region and check if a perticular date is a holiday or not. Here is a small example for the same:

```
import holidays
# getting India holidays
india_holidays = holidays.India(subdiv="GJ")
date(2020, 1, 14) in india_holidays
```

Above code snippet will give us `true` as 14th janulary is a holiday in `GJ` region of `India`.  
___
### Creating a function to detect holidays
Based on the above example, we will create a function and then use `apply` method to create a new column with the name of the holiday. 

```
def detect_holiday(desired_date, country_code="US", sub_dev=None):
    holiday = CountryHoliday(country_code, subdiv=sub_dev)
    if(desired_date in holiday):
            return holiday.get(desired_date)

df["holiday_usa"] = df["ts"].apply(lambda x: detect_holiday(x))
df["holiday_india"] = df["ts"].apply(lambda x: detect_holiday(x, "IN"))
df["holiday_india_gj"] = df["ts"].apply(lambda x: detect_holiday(x, "IN", "GJ"))
```

Based on the use case, you can alter the return statement of the function. 

## Conclusion

In conclusion, the Python holidays package proves to be a powerful tool for handling holiday information in your projects. By creating holiday objects based on country codes and subdivisions, you can effortlessly retrieve holiday data and integrate it into your code. In this blog post, we explored the basics of the package, including creating holiday objects for different countries and checking if a specific date is a holiday. We also demonstrated practical use cases by creating a DataFrame and populating it with holiday information for the United States and India, using different subdivisions within India. Whether you're building scheduling applications, analyzing time-series data, or working on machine learning projects that require accurate time-based computations, the Python holidays package can significantly simplify your workflow. So go ahead, leverage this powerful package, and make your projects holiday-ready!