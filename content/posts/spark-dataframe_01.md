---
author: ["Vasav Anandjiwala"]
title: "Pyspark Structured APIs - Dataframes"
date: "2022-06-04"
description: "Pyspark dataframe basics"
summary: "Pyspark dataframe basics"
tags: ["Data Engineering", "Apache Spark"]
categories: ["Data Engineering", "Apache Spark"]
series: ["Data Engineering", "Apache Spark"]
cover:
  image: images/apache_spark.png
ShowToc: true
TocOpen: true
social:
fediverse_creator: "@vanandjiwala@mastodon.social"
---

## Introduction to Spark Toolsets

Spark is very popular among data engineering professionals and companies working with large scaled data. Spark enables us to process large volumes of data with ease in a clusted (Distributed) environment.

In this article, I assume that you have some understanding of spark architecture and how it works. I am planning to add those details but I am referring to this apis these days to creating this blog. But there will be more articles on this topic as I move forward with my practice.

Spark ecosystem have main 3 components.

1. Low level API
2. Structured API
3. Libraries

In this article, I am not going in depth around this topic. But going forward I will have few articles around this. We are focusing on the `Dataframe` APIs provided by spark and the language we are going to use is `python`.

For someone who has worked with `pandas` or `r` programming language, `dataframe` must be a familiar term. To simply the concept of `dataframe`, it is nothing more than a spreadsheet which consists of rows and columns. Here `column` contains the same data type while `row` contains the data.

## Environment

I am going to use **Databricks Community Edition** to execute spark code. It is possible to setup spark environment locally but I feel using databricks is a nice and easy way to start things around Apache Spark. Naviagete to [Databricks community edition](https://community.cloud.databricks.com/login.html) website and sign yourself up and you are all set.

## Starting a cluster

In order to run the spark code, you need to setup a cluster on the databricks platform. From the left navigation, select `Compute` option. On click, you should be able to see the page where you can create and maintain clusters. Here are the steps that you need to perform in order to setup the cluster:

1. Click on new cluster button
2. Select Databricks runtime version (Here make sure to select appropriate version for `Apache spark`. If you want to work on spark 2 then you must select that version from the drop down )
3. In the `community` addition you will not get an option to select the type of instance for the cluster. But for production, based on the cloud provider (Databricks supports AWS, GCP and Azure), you will get all the available options.
4. Click on `create cluster` button and then you are all set.
5. Once you have your cluster ready then click on the `Start` button located on the right side of the page.

![alt text](https://drive.google.com/uc?export=view&id=1tYAhqSNASvAtwXpVR7_ZVTrn26Sx6hm7)

## Apache Spark - Loading Data

In this section, we will do just the basics of dataframe API. For that download a [sample CSV file](https://gist.github.com/kevin336/acbb2271e66c10a5b73aacf82ca82784#file-employees-csv).Here are the steps to include the data in the databricks notebook.

1. Navigate to `Data` section from left side of menu
2. Under the ` Upload Section`, drag and drop the CSV file obtained from the link above.
3. Once File is uploaded, use the following command to read it using spark. In the upcoming sections, I will explain this in more details.

```
file_location = "/FileStore/tables/employees.csv"
df = spark.read.csv(file_location, header=True)
display(df)
```

Here, we are storing the location of the uploaded file in the variable `file_location`. On the next step, we are creating a `dataframe` and specifying that the file contains a header so the `header` is set to `True`. `display(df)` will display the dataframe in the notebook.

4. In order to save the dataframe as a table, use the following syntax:

```
df.write.format("parquet").saveAsTable("employees")
```

Here we are writting our dataframe in parquet format and saving this as a table named `employees`. Now, going forward we should be able to use `SQL` to query the data from this table.

5. In order to get more clarity on the `sql` part described above, let's query the table in the notebook.

```
%sql
SELECT * FROM employees LIMIT 5;
```

First line here `%sql` is the magic command. This tells the notebook that the command written in the cell is of type `sql`. The same can be seen from the right side of the cell beside `run` cell button. The command will show 5 rows from the table `employees`.

## Apache Spark - Dataframe Operations

We have already seen how to create a dataframe in the notebook. Spark is capable of loading data from popular formats like `csv, json, text, parquet` etc. For simplicity, we are going to stick with `csv` for now.

#### Creating a dataframe

```
df = spark.read.csv("/FileStore/tables/employees.csv", header=True)
```

#### Inspect dataframe rows

```
df.head(5)
```

The above command will return top 5 rows from the dataframe. Here is the sample output. The output is an list of type `Row`.

```
[Row(DEST_COUNTRY_NAME='United States', ORIGIN_COUNTRY_NAME='Romania', count=15),
 Row(DEST_COUNTRY_NAME='United States', ORIGIN_COUNTRY_NAME='Croatia', count=1),
 Row(DEST_COUNTRY_NAME='United States', ORIGIN_COUNTRY_NAME='Ireland', count=344),
 Row(DEST_COUNTRY_NAME='Egypt', ORIGIN_COUNTRY_NAME='United States', count=15),
 Row(DEST_COUNTRY_NAME='United States', ORIGIN_COUNTRY_NAME='India', count=62)]
```

#### Display dataframe

```
df.show(5)
```

The above command will display the dataframe in tabular format. Here is the sample output.

```
+-----------+----------+---------+--------+------------+---------+--------+------+--------------+----------+-------------+
|EMPLOYEE_ID|FIRST_NAME|LAST_NAME|   EMAIL|PHONE_NUMBER|HIRE_DATE|  JOB_ID|SALARY|COMMISSION_PCT|MANAGER_ID|DEPARTMENT_ID|
+-----------+----------+---------+--------+------------+---------+--------+------+--------------+----------+-------------+
|        198|    Donald| OConnell|DOCONNEL|650.507.9833|21-JUN-07|SH_CLERK|  2600|            - |       124|           50|
|        199|   Douglas|    Grant|  DGRANT|650.507.9844|13-JAN-08|SH_CLERK|  2600|            - |       124|           50|
|        200|  Jennifer|   Whalen| JWHALEN|515.123.4444|17-SEP-03| AD_ASST|  4400|            - |       101|           10|
|        201|   Michael|Hartstein|MHARTSTE|515.123.5555|17-FEB-04|  MK_MAN| 13000|            - |       100|           20|
|        202|       Pat|      Fay|    PFAY|603.123.6666|17-AUG-05|  MK_REP|  6000|            - |       201|           20|
+-----------+----------+---------+--------+------------+---------+--------+------+--------------+----------+-------------+
only showing top 5 rows
```

#### Using Select Expression

Select is very similar to `select` in `SQL`.

```
df.select("FIRST_NAME")
```

Output of the above example will select just the "FIRST_NAME" column. If you wish to see the data then use `show()` as shown in the above example.

Selecting multiple columns is also like this. Instead of one column name, pass other column names as well.

```
df.select("FIRST_NAME","LAST_NAME")
```

Important thing to notice here is that, select returns a dataframe. So the output will look something like this:

```
DataFrame[FIRST_NAME: string, LAST_NAME: string]
```

Another way to achieve the same thing is shown below. We must use either of the approach based on your liking.

```
from pyspark.sql.functions import col,expr

df.select(col("FIRST_NAME"),col("LAST_NAME"))
df.select(expr("FIRST_NAME"),expr("LAST_NAME"))
```

#### Renaming Column Name

We can use `expr`, `alias` and `withColumnRenamed`. You can use any method to rename the column.

```
#Method1
df.select(expr("FIRST_NAME as First"))
#Method2
df.select(expr("FIRST_NAME").alias("First1"))
#Method3
df.withColumnRenamed("FIRST_NAME", "first")
```

#### Adding a column with a constant value

There can be an instance when want to have a column with same value. In such case we have to use `lit`. We can use `select` or `withColumn` in order to introduce a new column. Here is an example for the same.

```
#Method1
df.select("SALARY",lit(95).alias("Conversion_rate"))

#Method2
df.withColumn("conversion_rate", lit(95))
```

Upon `show()`, this will give the following output:

```
+------+---------------+
|SALARY|Conversion_rate|
+------+---------------+
|  2600|             95|
|  2600|             95|
|  4400|             95|
| 13000|             95|
|  6000|             95|
+------+---------------+
only showing top 5 rows
```

#### Add a column using expression

You can use expression to add another column.

```
df.withColumn("Salary_flag", expr("SALARY >= 6000")).show(5)
```

For better demo, I have extracted just a couple of columns.
The output will be as following:

```
df.withColumn("Salary_flag", expr("SALARY >= 6000")).select("SALARY","Salary_flag").show(5)

+------+-----------+
|SALARY|Salary_flag|
+------+-----------+
|  2600|      false|
|  2600|      false|
|  4400|      false|
| 13000|       true|
|  6000|       true|
+------+-----------+
only showing top 5 rows
```

#### Removing a column

Removing a column can be done with the following syntax:

```
df.drop("Salary_flag")
```

Similar to `select` expression, we can pass multiple column names to drop them.

```
df.drop("col1","col2")
```

#### Filtering Rows

Filtering rows is super userful. Based on some criteria, we should be able to filter the results. There are 2 ways to filter rows - `filter` and `where`.

```
#Method 1
df.filter(col("SALARY") == 2600)

#Method 2
df.where("SALARY == 2600").show()
```

#### Getting Unique rows:

Getting unique rows can be done using `distinct`. Using it with `count()` will give the number of unique records.

```
df.select("JOB_ID").distinct()
df.select("JOB_ID").distinct().count()
```

#### Sorting Rows

Similar to other operations there are multiple ways of achieving this. `sort` and `orderBy`. It is shown in the example below:

```
from pyspark.sql.functions desc

df.orderBy(desc("MANAGER_ID"))
df.orderBy("MANAGER_ID")
df.sort(desc("MANAGER_ID"))
```

## References

1. https://github.com/databricks/Spark-The-Definitive-Guide
2. Spark-The definitive Guide
3. https://gist.github.com/kevin336/acbb2271e66c10a5b73aacf82ca82784#file-employees-csv
4. https://spark.apache.org/docs/latest/api/python/getting_started/index.html
