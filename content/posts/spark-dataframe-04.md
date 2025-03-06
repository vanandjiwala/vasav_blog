---
author: ["Vasav Anandjiwala"]
title: "Renaming columns in pyspark"
date: "2022-12-30"
description: "Pyspark dataframe basics"
summary: "Pyspark dataframe basics"
tags: ["data engineering"]
categories: ["data engineering"]
series: ["data engineering"]
cover:
  image: images/apache_spark.png
ShowToc: true
TocOpen: true
social:
fediverse_creator: "@vanandjiwala@mastodon.social"
---

## Introduction

This article with cover various ways of renaming columns in spark dataframe. For the demo, we are going to use [Auto-mpg dataset](https://www.kaggle.com/datasets/uciml/autompg-dataset?resource=download) available from kaggle.

Code is available on my [github](https://github.com/vanandjiwala/pyspark-examples/blob/main/select-example-pyspark.ipynb). Feel free to download and play around with it.

Here I am trying to list down variations of the code which can be used based on the scenario. Use this as a reference and also refer to the github notebook for better understanding of the code snippets.

## Creating a dataframe

```
df = spark.read.format("csv").option("header", True).load("/FileStore/tables/Auto-mpg/auto_mpg.csv")
```

## Rename using Select

```
#Using alias with select
df.select(df["`car name`"].alias("name")).show()
df.select(col("`car name`").alias("name")).show()
df.select(concat(col("car name"),lit("-"),col("model year")).alias("car_details")).show()

# Changing multiple column names
df.select(col("mpg").alias("mpg1"),col("car name").alias("name")).show()
df.select(df["mpg"].alias("mpg1"),df["car name"].alias("name")).show()
```

## Rename using withColumn

Ideal to use `withColumn` with column transformations.

```
#withColumn usage. Using select to see the result else entire df will be displayed.
df.withColumn("car_details",concat(col("car name"),lit("-"),col("model year"))).select("car_details").show()
df.withColumn("year",col("model year")).select("year","car name").show()

#Expected Error as String is not a valid argument.
df.withColumn("year", "model year")

df.withColumn("year", df["model year"]).show()

#withColumn to perform a transformation on mpg column.
df.withColumn("mpg", col("mpg").cast("int")).withColumn("mpg+2", col("mpg") + 2).select("mpg","mpg+2").show()
```

## Rename using withColumnRenamed

```
df.withColumnRenamed("mpg", "mpg1").show()

#Changing multiple column names using chaining withColumnRenamed
df.withColumnRenamed("mpg", "mpg1").withColumnRenamed("car name", "name").show()
```

## Rename using toDF

Ideal for changing multiple column names

```
df.select(df.columns).toDF(*["car_mpg","car_cylinders","car_displacement","car_horsepower","car_weight","car_acceleration","car_model year","car_origin","car_name"]).show()

# Changing a subset of column names
column_name = ["mpg","cylinders","displacement"]
desired_column_names= ["car_mpg","car_cylinders","car_displacement"]
df.select(column_name).toDF(*desired_column_names).show()
```
