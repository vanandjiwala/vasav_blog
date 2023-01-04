+++
author = "Vasav"
categories = ["spark","python"]
date = "2023-01-04"
description = "Data manipulation methods in pyspark"
featuredpath = "date"
linktitle = ""
title = "Data Manipulation in pyspark - Part 1"
type = "post"
+++

## Introduction
This article with cover various string transformations in spark dataframe. For the demo, we are going to use [Store Sales dataset](https://www.kaggle.com/competitions/store-sales-time-series-forecasting/data) available from kaggle.

Code is available on my [github](https://github.com/vanandjiwala/pyspark-examples/blob/main/select-example-pyspark.ipynb). Feel free to download and play around with it.

Here I am trying to list down variations of the code which can be used based on the scenario. Use this as a reference and also refer to the github notebook for better understanding of the code snippets.

## Creating a dataframe

```
df = spark.read.format("csv").option("header", True).load("/FileStore/tables/store_sales/holidays_events.csv")
```

## Imports

```
import pyspark.sql.functions as f
```

Here we are importing ```pyspark.sql.function``` and using an alias ```f``` so we can access all functions with ```.``` notation. 

## Concat string using concat

```
df.withColumn("concat_col", f.concat("type", f.lit("-"), "locale")).select("*").show()

df.withColumn("concat_col", f.concat(f.col("type"), f.lit("-"), f.col("locale"))).select("*").show()

df.withColumn("concat_col", f.concat(df["type"], f.lit("-"), df["locale"])).select("*").show()

df.withColumn("concat_col", f.concat("type", f.lit("-"), df["locale"])).select("*").show()

df.withColumn("concat_col", f.concat(f.col("type"), f.lit("-"), "locale")).select("*").show()
```

### Concat String using concat_ws
Here we are going to perform the same operation as above but the only difference being, ```lit``` is not used. ```concat_ws``` allows us to specify the separator which needs to be used for concatinating columns into a single column. As you can see from the below cell, the first argument is going to be the separator while the following arguments will be a valid column names/column objects. 

```
df.withColumn("concat_col", f.concat_ws("-", "type","locale")).select("*").show()

df.withColumn("concat_col", f.concat_ws("**", df["type"],df["locale"])).select("*").show()

df.withColumn("concat_col", f.concat_ws("**", *["locale","type"])).select("*").show()

df.withColumn("concat_col", f.concat_ws("**", *[df["locale"],df["type"]])).select("*").show()

df.withColumn("concat_col", f.concat_ws("**", "locale",df["type"])).select("*").show()
```

## lower

Converts a column to lower case. 

```
df.withColumn("lower_locale_name", f.lower("locale_name")).select(["locale_name","lower_locale_name"]).show()

df.withColumn("lower_locale_name", f.lower(f.col("locale_name"))).select(["locale_name","lower_locale_name"]).show()

df.withColumn("lower_locale_name", f.lower(df["locale_name"])).select(["locale_name","lower_locale_name"]).show()
```

## upper

Converts a column to upper case.

```
df.withColumn("upper_locale_name", f.upper("locale_name")).select(*["locale_name","upper_locale_name"]).show()

df.withColumn("upper_locale_name", f.upper(f.col("locale_name"))).select(*["locale_name","upper_locale_name"]).show()

df.withColumn("upper_locale_name", f.upper(df["locale_name"])).select(["locale_name","upper_locale_name"]).show()
```

## Chaining lower/upper to be applied on multiple columns

```
df.withColumn("type", f.upper("type")).\
withColumn("locale_name", f.upper("locale_name")).\
withColumn("locale", f.lower("locale")).\
select("*").\
show()
```

## initcap

```
df.withColumn("description_initcap", f.initcap("description")).select("description","description_initcap").show()

df.withColumn("description_initcap", f.initcap(f.col("description"))).select("description","description_initcap").show()

df.withColumn("description_initcap", f.initcap(df["description"])).select("description","description_initcap").show()
```

## length

```
df.withColumn("locale_name_len", f.length("locale_name")).select("locale_name", "locale_name_len").show()

df.withColumn("locale_name_len", f.length(df["locale_name"])).select("locale_name", "locale_name_len").show()

df.withColumn("locale_name_len", f.length(f.col("locale_name"))).select("locale_name", "locale_name_len").show()
```