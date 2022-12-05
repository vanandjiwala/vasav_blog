+++
author = "Vasav"
categories = ["python","data-analysis"]
date = "2022-12-05"
description = "Manipulating datetime columns in pandas"
featuredpath = "date"
linktitle = ""
title = "Pandas Datetime"
type = "post"
+++

This post explains how to work with date and time in pandas. Date and time are very common for a dataset to have. Based on the use case, the column should be transformed. 

## Creating a simple dataset
We are going to generate dates using pandas ```date_range``` function and then create a dataframe out of it. For this demo, we are going to have a single column dataframe. 

```
import pandas as pd
df = pd.DataFrame(pd.date_range(start="2022-12-05", end="2022-12-06", freq='30S') , columns=["my_time"])
```

|   | my_time             |
|--:|---------------------|
| 0 | 2022-12-05 00:00:00 |
| 1 | 2022-12-05 00:00:30 |
| 2 | 2022-12-05 00:01:00 |
| 3 | 2022-12-05 00:01:30 |
| 4 | 2022-12-05 00:02:00 |

We are creating a daterange from ```2022-12-05``` to ```2022-12-06``` at the frequency of 30 seconds. We will get 2881 records in the dataset. 
___
## Extracting Year, Month, Day, Hour, Minutes, Seconds from the column

```
df['year'] = df['my_time'].dt.year
df['month'] = df['my_time'].dt.month
df['day'] = df['my_time'].dt.day
df['hour'] = df['my_time'].dt.hour
df['minute'] = df['my_time'].dt.minute
df['seconds'] = df['my_time'].dt.second
```

|   |             my_time | year | month | day | hour | minute | seconds |
|--:|--------------------:|-----:|------:|----:|-----:|-------:|--------:|
| 0 | 2022-12-05 00:00:00 | 2022 |    12 |   5 |    0 |      0 |       0 |
| 1 | 2022-12-05 00:00:30 | 2022 |    12 |   5 |    0 |      0 |      30 |
| 2 | 2022-12-05 00:01:00 | 2022 |    12 |   5 |    0 |      1 |       0 |
| 3 | 2022-12-05 00:01:30 | 2022 |    12 |   5 |    0 |      1 |      30 |
| 4 | 2022-12-05 00:02:00 | 2022 |    12 |   5 |    0 |      2 |       0 |

___

## Extracting Day of the week

```
df['day_name'] = df['my_time'].dt.day_name()
df['day_of_week'] = df['my_time'].dt.dayofweek
```

|   |             my_time | day_name | day_of_week |
|--:|--------------------:|---------:|------------:|
| 0 | 2022-12-05 00:00:00 |   Monday |           0 |
| 1 | 2022-12-05 00:00:30 |   Monday |           0 |
| 2 | 2022-12-05 00:01:00 |   Monday |           0 |
| 3 | 2022-12-05 00:01:30 |   Monday |           0 |
| 4 | 2022-12-05 00:02:00 |   Monday |           0 |

Here ```day_name()``` will provide the name of the day while ```dayofweek``` will provide the number associated with the day. Here Monday is 0 while sunday is 6.

___

## Detecting Weekend 

```
df["Is Weekend"] = df['day_of_week'] > 4
```
|   |             my_time | day_of_week | Is Weekend |
|--:|--------------------:|------------:|-----------:|
| 0 | 2022-12-05 00:00:00 |           0 |      False |
| 1 | 2022-12-05 00:00:30 |           0 |      False |
| 2 | 2022-12-05 00:01:00 |           0 |      False |
| 3 | 2022-12-05 00:01:30 |           0 |      False |
| 4 | 2022-12-05 00:02:00 |           0 |      False |

Here we are using the column we derived in the earlier section. The condition ```df['day_of_week'] > 4``` will return true only for values 5 and 6 which represent Saturday and Sunday respectively. 

___

## Extracting Name of the Month

```
df['month_name'] = df['my_time'].dt.month_name()
```

|   |             my_time | month_name |
|--:|--------------------:|-----------:|
| 0 | 2022-12-05 00:00:00 |   December |
| 1 | 2022-12-05 00:00:30 |   December |
| 2 | 2022-12-05 00:01:00 |   December |
| 3 | 2022-12-05 00:01:30 |   December |
| 4 | 2022-12-05 00:02:00 |   December |

___

## Extracting week of the year

```
df['week_of_year'] = df['my_time'].dt.isocalendar().week
```
|   |             my_time | week_of_year |
|--:|--------------------:|-------------:|
| 0 | 2022-12-05 00:00:00 |           49 |
| 1 | 2022-12-05 00:00:30 |           49 |
| 2 | 2022-12-05 00:01:00 |           49 |
| 3 | 2022-12-05 00:01:30 |           49 |
| 4 | 2022-12-05 00:02:00 |           49 |

___

## Extracting quarter

```
df['quarter'] = df['my_time'].dt.quarter
```

|   |             my_time | quarter |
|--:|--------------------:|--------:|
| 0 | 2022-12-05 00:00:00 |       4 |
| 1 | 2022-12-05 00:00:30 |       4 |
| 2 | 2022-12-05 00:01:00 |       4 |
| 3 | 2022-12-05 00:01:30 |       4 |
| 4 | 2022-12-05 00:02:00 |       4 |

## Working with timezones

```
# Setting timezone for the series
df['my_time'] = df['my_time'].dt.tz_localize('Asia/Calcutta')
df['timezone_source'] = "Asia/Calcutta"

# Converting timezone info of the series
df['est'] = df['my_time'].dt.tz_convert('America/New_York')
df['timezone_dest'] = "America/New_York"
```

|   |                   my_time | timezone_source |                       est |    timezone_dest |
|--:|--------------------------:|----------------:|--------------------------:|-----------------:|
| 0 | 2022-12-05 00:00:00+05:30 |   Asia/Calcutta | 2022-12-04 13:30:00-05:00 | America/New_York |
| 1 | 2022-12-05 00:00:30+05:30 |   Asia/Calcutta | 2022-12-04 13:30:30-05:00 | America/New_York |
| 2 | 2022-12-05 00:01:00+05:30 |   Asia/Calcutta | 2022-12-04 13:31:00-05:00 | America/New_York |
| 3 | 2022-12-05 00:01:30+05:30 |   Asia/Calcutta | 2022-12-04 13:31:30-05:00 | America/New_York |
| 4 | 2022-12-05 00:02:00+05:30 |   Asia/Calcutta | 2022-12-04 13:32:00-05:00 | America/New_York |

___

## Next Steps
In this post, I have covered the most basic datetime transformation that happens using pandas. In most of the projects having datetime data, these transformation can be useful. These are some of the common transformations I have to perform as a data engineer. 

In future, I will try to cover some more details associated with pandas date and time.

## References

1. https://stackoverflow.com/questions/68149831/find-if-date-is-weekend-or-weekday-in-pandas-dataframe




