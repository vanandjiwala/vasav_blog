+++
author = "Vasav"
categories = ["spark","python"]
date = "2023-01-08"
description = "Datetime manipulation methods in pyspark"
featuredpath = "date"
linktitle = ""
title = "Data Manipulation in pyspark - Part 2"
type = "post"
+++

## Introduction
This article with cover various datetime transformations in spark dataframe. For the demo, we are going to use [Store Sales dataset](https://www.kaggle.com/competitions/store-sales-time-series-forecasting/data) available from kaggle.

Code is available on my [github](https://github.com/vanandjiwala/pyspark-examples). Feel free to download and play around with it.

Here I am trying to list down variations of the code which can be used based on the scenario. Use this as a reference and also refer to the github notebook for better understanding of the code snippets.

## Creating a dataframe

```
df = spark.read.format("csv").option("header", True).\
load("/FileStore/tables/store_sales/test.csv")
```

## Converting string to date

```
df = df.withColumn("Last_Updated", f.lit(f.current_timestamp()))
```

## date_add and date_sub

```
df.withColumn("next_date", f.date_add(f.col("date"), 1)).show()

# We can also use negative value with date_add
df.withColumn("previous_date", f.date_add(f.col("date"), -1)).show()

# Variation of column object being passed
df.withColumn("next_date", f.date_add(df.date, 1)).show()


# Applying function on timestamp column
df.withColumn("next_date_timestamp", f.date_add(df.Last_Updated, 1)).show()

df.withColumn("previous_date", f.date_sub(f.col("date"), 1)).show()

df.withColumn("previous_date", f.date_sub("date", 1)).show()

df.withColumn("previous_date", f.date_sub(df["Last_Updated"], 1)).show()

```

## datediff
Important think to remember is the seq of arguments. First one is end while the 2nd one is start as stated in the documentation.

```
df.withColumn("days_ago", f.datediff(df.Last_Updated, df.date)).show(5)

df.withColumn("days_ago", f.datediff(df.date, df.Last_Updated)).show(5)

# Using kwargs to make sure function is well read and performs as expected
df.withColumn("days_ago", f.datediff(start=df.date, end=df.Last_Updated)).show(5)

df.withColumn("days_ago", f.datediff(start=df["date"], end=df["Last_Updated"])).show(5)
```

## add_months

```
df.withColumn("next_month", f.add_months(f.col("date"), 1)).show()

df.withColumn("next_month", f.add_months("date", 1)).show()

df.withColumn("next_month", f.add_months(df.date, 1)).show()

df.withColumn("next_month", f.add_months(df["date"], 1)).show()

df.withColumn("next_month", f.add_months(f.col("date"), -1)).show()
```

## months_between
Returns a ```float``` value. We are using ```round``` function to round the value provided by ```months_between```.

```
df.withColumn("months_between", f.months_between(df.Last_Updated, df.date)).show(5)

df.withColumn("months_between", f.round(f.months_between(df.Last_Updated, df.date))).show(5)

df.withColumn("months_between", f.round(f.months_between(df.Last_Updated, df.date), 2)).show(5)
```

## next_day

```
df.withColumn("next_day", f.next_day(df.date, "Thu")).show(5)

df.withColumn("next_day", f.next_day(df["date"], "Sun")).show(5)
```

## trunc and date_trunc funtions
These functions are perticulely useful when we want to get beginning of the year, week, month etc. These functions are perticulerly important for reporting.

```
df.withColumn("first_day_month", f.trunc(df["date"], "MM")).show(5)

df.withColumn("first_day_week", f.trunc(df["date"], "week")).show(5)

df.withColumn("first_day_quarter", f.trunc(df["date"], "quarter")).show(5)

df.withColumn("first_day_year", f.trunc(df["Last_Updated"], "yy")).show(5)

df.withColumn("first_day_quarter", f.trunc(df["Last_Updated"], "quarter")).show(5)

df.withColumn("first_day_month", f.date_trunc("month", "date")).show(5)

df.withColumn("first_day_month", f.date_trunc("mm", "date")).show(5)

df.withColumn("first_day_week", f.date_trunc("week", "date")).show(5)

df.withColumn("hour", f.date_trunc("hour", "Last_Updated")).show(5)

df.withColumn("min", f.date_trunc("minute", "Last_Updated")).show(5)

df.withColumn("min", f.date_trunc("second", "Last_Updated")).show(5)
```

## Extract various data and time info

```
df.withColumn("year", f.year(df["Last_Updated"]))\
.withColumn("month", f.month(df["Last_Updated"]))\
.withColumn("day", f.dayofmonth(df["Last_Updated"]))\
.withColumn("day of week", f.dayofweek(df["Last_Updated"]))\
.withColumn("day of year", f.dayofyear(df["Last_Updated"]))\
.withColumn("week of year", f.weekofyear(df["Last_Updated"]))\
.withColumn("hour", f.hour(df["Last_Updated"]))\
.withColumn("min", f.minute(df["Last_Updated"]))\
.withColumn("sec", f.second(df["Last_Updated"]))\
.show(5)
```

## to_date and to_timestamp

```
## adding for demo
df = df.withColumn("constant_date", f.lit("2022-05-22"))

df.withColumn("constant_date_converted", f.to_date("constant_date","yyyy-mm-dd")).show(5)

df.withColumn("constant_date_converted", f.to_timestamp("constant_date","yyyy-mm-dd")).show(5)
```

## date_format
Converting date/timestamp to a desired date format

```
df.withColumn("date_formatted", f.date_format("Last_Updated","yyyy")).show(5)

df.withColumn("date_formatted", f.date_format("Last_Updated","yyyyMMdd")).show(5)

df.withColumn("date_formatted", f.date_format("Last_Updated","HH")).show(5)
```
## unix_timestamp and from_unixtime

```
df.withColumn("unix", f.unix_timestamp("Last_Updated")).show(5)

df.withColumn("Unix", f.lit(1673199219)).withColumn("unix_date", f.from_unixtime("Unix")).show(5)
```
