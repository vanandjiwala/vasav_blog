+++
author = "Vasav"
categories = ["spark","python"]
date = "2022-12-28"
description = "Selecting and renaming dataframes in pyspark"
featuredpath = "date"
linktitle = ""
title = "Working with columns in pyspark"
type = "post"
+++

## Introduction
This article with cover various ways of selecting columns in spark dataframe. For the demo, we are going to use [Auto-mpg dataset](https://www.kaggle.com/datasets/uciml/autompg-dataset?resource=download) available from kaggle.

Code is available on my [github](https://github.com/vanandjiwala/pyspark-examples/blob/main/select-example-pyspark.ipynb). Feel free to download and play around with it.

Here I am trying to list down variations of the code which can be used based on the scenario. Use this as a reference and also refer to the github notebook for better understanding of the code snippets. 

## Creating a dataframe

```
df = spark.read.format("csv").option("header", True).load("/FileStore/tables/Auto-mpg/auto_mpg.csv")
```

## Displaying the data

```
df.display() #specific to databricks
df.show()
```

## Getting schema information

```
df.printSchema()
df.columns
df.dtypes
df.schema
```

## Getting information about a method

```
help(df.select)
help(df.selectExpr)
```

## Select

```
df.select("*").show() #Selecting all data
df.select(col("mpg")).show() #Selecting a column using col object
df.select(col("mpg"),"car name").show() #Combination of column object and string column names
df.select(df["mpg"],"car name").show() #using [] to get column and use it with select
df.alias("my_alias").select("my_alias.car name", "my_alias.mpg").show() #Using alias
df.select("model year","origin","car name").show() #Comma separated string
df.select(["model year","origin","car name"]).show() #list of string
df.select([col("car name"),col("model year").alias("year"),col("origin")]).show() #list of columns and using column alias

#using *args
desired_cols = ["car name","model year","mpg"] 
df.select(*desired_cols).show()

df.select("car name","model year", concat(col("car name"),lit("-"),col("model year")).alias("concat_col")).show() #using concat function

```

## SelectExpr

```
"""
Important thing to notice here is that, column names with space will not work as expected with selectExpr. 
"""
df.selectExpr('mpg','cylinders').show()
df.selectExpr("mpg","model year").show() #Expected error
df.selectExpr("mpg","`model year`").show() #Use ` to resolve the error
df.selectExpr(col("mpg"),"model year").show() #Expected error - col can not be used with selectExpr
df.selectExpr(df["mpg"],"model year").show() #Expected error - col can not be used with selectExpr
df.selectExpr("`car name`","`model year`","concat(`car name`,'-',`model year`) as concat_col").show()

#concat with selectExpr
df.alias("my_df").selectExpr("my_df.`car name`","my_df.`model year`","concat(my_df.`car name`,'-',my_df.`model year`) as concat_col").show()
```

## Using SQL to perform SELECT

```
df.createOrReplaceTempView("auto_mpg")
spark.sql("""
SELECT
`car name`, 
`model year`,
concat(`car name`,'-',`model year`) as concat_col
FROM
auto_mpg
;
""").show()
```

## Columns

#### Official Doc: https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.Column.html

Columns are widely used with ```pyspark.sql.functions``` which we will cover later in-depth. 

```
df.select(col("mpg").cast("int"), col("cylinders"), "origin").printSchema() #Casting a columns. mpg changed to int
```