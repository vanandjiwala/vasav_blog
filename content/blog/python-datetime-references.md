+++
author = "Vasav"
categories = ["python"]
date = "2022-10-12"
description = "Python data and time notes"
featuredpath = "date"
linktitle = ""
title = "Working with Data and Time in python"
type = "post"
+++

## Introduction
I had some issue reading a csv directly on the databricks community edition. So after going through some articles, I finally found the workaround. Databricks has disabled to use csv directly for pandas as you may encounter ```
FileNotFoundError: [Errno 2] No such file or directory:```.

___

## Assign timezone while converting string to datetime object in python

```
from datetime import datetime
import pytz

my_datetime = datetime(2015, 6, 11, 13, 30)
my_tz = pytz.timezone('America/Chicago')    
good_dt = my_tz.localize(my_datetime)

print(good_dt)
```


## Converting one time zone to the other

```
def convert_to_utc(time_to_process, time_zone, time_format = "%Y-%m-%d %H:%M", output_format = "%Y-%m-%d"):
    local_dt = datetime.strptime(time_to_process, time_format)    
    my_tz = pytz.timezone(time_zone)    
    good_dt = my_tz.localize(local_dt)
    utc_dt = good_dt.astimezone(pytz.utc)
    return utc_dt.strftime(output_format)
```

___

## References
1. https://stackoverflow.com/questions/35462876/python-pytz-timezone-function-returns-a-timezone-that-is-off-by-9-minutes