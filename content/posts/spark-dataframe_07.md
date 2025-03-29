---
author: ["Vasav Anandjiwala"]
title: "Dropping columns in pyspark"
date: "2023-01-08"
description: "Pyspark dataframe basics"
summary: "Pyspark dataframe basics"
tags: ["Data Engineering"]
categories: ["Data Engineering"]
series: ["Data Engineering"]
cover:
  image: images/apache_spark.png
ShowToc: true
TocOpen: true
social:
fediverse_creator: "@vanandjiwala@mastodon.social"
---

## Introduction

Working with large datasets in PySpark can be challenging, especially when it comes to cleaning and preprocessing the data. One of the most common tasks in data preprocessing is dropping unnecessary columns from a DataFrame. In this blog post, we will explore how to drop columns from a PySpark DataFrame using the drop() method.

For the demo, we are going to use [Store Sales dataset](https://www.kaggle.com/competitions/store-sales-time-series-forecasting/data) available from kaggle.

Code is available on my [github](https://github.com/vanandjiwala/pyspark-examples). Feel free to download and play around with it.

## Imports

```
from pyspark.sql.functions import col
```

## Creating a dataframe

```
df = spark.read.format("csv").option("header", True).\
load("/FileStore/tables/store_sales/test.csv")

df1 = spark.createDataFrame(
    [
        (1, "val1"),
        (2, "val2"),
        (3, "val3"),
        (4, "val4"),
        (2, "val2"),
        (5, "val5"),
        (6, "val6"),
        (6, "val7"),
    ],
    ["id", "value"]
)
```

## Drop a single column

It's important to keep in mind that if a specified column name is not present in the DataFrame, the function will ignore it and take no action.

```
df.drop("store_nbr").printSchema()

df.drop(col("store_nbr")).printSchema()

df.drop(df.store_nbr).printSchema()

df.drop(df["store_nbr"]).printSchema()

df.drop(col("my_col")).printSchema()
```

## Drop multiple column

When attempting to drop multiple columns on a DataFrame using column objects, an exception will be thrown as it is not a supported operation.

```
df.drop("date", "store_nbr").printSchema()

# Column object does not work with multiple column deletion
df.drop(col("date"), col("store_num")).printSchema()

df.drop("date", "store_nbr", "something").printSchema()
```

## Dropping multiple columns using \*args

```
columns_to_drop = ["date", "store_num"]
df.drop(*columns_to_drop).printSchema()
```

## Dropping Duplicates

We will use `df1` for this.

```
df1.drop_duplicates().show()

df1.drop_duplicates(subset=["id"]).show()

df1.drop_duplicates(subset=["id", "value"]).show()
```
