---
author: ["Vasav Anandjiwala"]
title: Databricks Delta Table Optimization
date: "2024-06-22"
description: "Optimize delta lake tables."
summary: "Optimize delta lake tables."
tags: ["Data Engineering", "Delta Lake"]
categories: ["Data Engineering", "Delta Lake"]
series: ["Data Engineering"]
cover:
image: images/delta_lake.png
ShowToc: true
TocOpen: true
social:
fediverse_creator: "@vanandjiwala@mastodon.social"
---

## Introduction

In the big data eco-system, the data keeps growiing. It is important to manage data efficiently to meet the performance requirements as well as to control the cost associated with storing large amount of data. Most of the data, especailly for analytics and machine learning these days reside on the cloud infrastructure on providers like aws, azure or gcp. As the data grows, it is important to have a solid understanding on optimization to help data teams work efficiently with data with better control over the cloud infrastructure cost.

This article will cover the commonly used delta lake table optimization techniques. Based on the scenario, appropriate techniques should be used. We are going to cover 4 major techniques associated with delta lake optimization:

1. Partitioning
2. Optimize
3. Z-Ordering
4. Vacuum

## Partitioning in Delta Lake

Partitioning is a crucial technique for data storage in Delta Lake. It significantly improves query performance. According to the [official documentation](https://docs.delta.io/latest/best-practices.html), partitions can be created based on a specific column, with `date` being one of the most commonly used columns for partitioning.

### Key Considerations for Partitioning

When selecting a column for partitioning, keep these two key points in mind:

1. Choose a column with low cardinality.
2. Ensure that the amount of data per partition is at least **1 GB**.
3. Partitoning should be only peformed if table size is greater than **1 TB**.

### Code Sample: How Partitioning Works

The following code snippet demonstrates how partitioning works. This example is executed on Databricks Community Edition. Feel free to try it yourself.

```
from pyspark.sql import SparkSession
from pyspark.sql.functions import col
from delta.tables import *

data = [
    ("2024-01-01", "Alice", 34),
    ("2024-01-02", "Bob", 45),
    ("2024-01-02", "Cathy", 29),
    ("2024-01-03", "David", 54),
    ("2024-01-03", "Eve", 40),
]

columns = ["date", "name", "age"]

df = spark.createDataFrame(data, columns)
df.write.format("delta").mode("overwrite").save("/tmp/delta-table-no-partition1")
df.write.format("delta").mode("overwrite").partitionBy("date").save("/tmp/delta-table-partitioned1")
```

### Comparing partitioned vs non partitioned table structure

#### Non-Partitioned Table

To list the files in a non-partitioned table, use:

```
dbutils.fs.ls("/tmp/delta-table-no-partition1")
```

This will return:

```
[FileInfo(path='dbfs:/tmp/delta-table-partitioned1/_delta_log/', name='_delta_log/', size=0, modificationTime=0),
 FileInfo(path='dbfs:/tmp/delta-table-partitioned1/date=2024-01-01/', name='date=2024-01-01/', size=0, modificationTime=0),
 FileInfo(path='dbfs:/tmp/delta-table-partitioned1/date=2024-01-02/', name='date=2024-01-02/', size=0, modificationTime=0),
 FileInfo(path='dbfs:/tmp/delta-table-partitioned1/date=2024-01-03/', name='date=2024-01-03/', size=0, modificationTime=0)]
```

#### Partitioned Table

To list the files in a partitioned table, use:

```
dbutils.fs.ls("/tmp/delta-table-partitioned1")
```

This will return:

```
[FileInfo(path='dbfs:/tmp/delta-table-no-partition1/_delta_log/', name='_delta_log/', size=0, modificationTime=0),
 FileInfo(path='dbfs:/tmp/delta-table-no-partition1/part-00001-81ed50fa-3f1c-4a4d-9aa3-7afc290bcf93-c000.snappy.parquet', name='part-00001-81ed50fa-3f1c-4a4d-9aa3-7afc290bcf93-c000.snappy.parquet', size=1013, modificationTime=1719059544000),
 FileInfo(path='dbfs:/tmp/delta-table-no-partition1/part-00003-018fb58b-b437-4e5b-9d16-eb946ef5fd7b-c000.snappy.parquet', name='part-00003-018fb58b-b437-4e5b-9d16-eb946ef5fd7b-c000.snappy.parquet', size=999, modificationTime=1719059544000),
 FileInfo(path='dbfs:/tmp/delta-table-no-partition1/part-00004-f363f329-5764-4436-9765-9a1e4278af7b-c000.snappy.parquet', name='part-00004-f363f329-5764-4436-9765-9a1e4278af7b-c000.snappy.parquet', size=1013, modificationTime=1719059544000),
 FileInfo(path='dbfs:/tmp/delta-table-no-partition1/part-00006-9e9aa06e-58d6-49ab-ab0b-52b2e6db108f-c000.snappy.parquet', name='part-00006-9e9aa06e-58d6-49ab-ab0b-52b2e6db108f-c000.snappy.parquet', size=1013, modificationTime=1719059544000),
 FileInfo(path='dbfs:/tmp/delta-table-no-partition1/part-00007-96226705-6a45-4de0-a930-4e62e80e4f20-c000.snappy.parquet', name='part-00007-96226705-6a45-4de0-a930-4e62e80e4f20-c000.snappy.parquet', size=999, modificationTime=1719059544000)]
```

As seen in the results, the non-partitioned table contains raw Parquet files, while the partitioned table has directories associated with distinct values from the partition column (in this case, date). This means that when a query is executed against a specific date, only the relevant files are scanned, improving performance. In contrast, for the non-partitioned table, all files must be scanned to retrieve the results.

## Optimizing Delta Tables

Optimization is a crucial process for reducing the number of files in a Delta Lake table. This is particularly useful for streaming workloads, where small data files of a few MBs accumulate over time, creating a "large number of small files" problem that significantly impacts the performance of the Delta table.

The `OPTIMIZE` command creates a list of all active files and their sizes. It then identifies any files that can be combined up to the target size. In other words, optimization is the mechanism that helps avoid the problem of having too many small files.

It is important to note that there is an overhead associated with the optimization process. The `OPTIMIZE` command needs to read files and combine them into larger ones, making it a heavy I/O operation. However, this process can greatly improve the overall read performance of the Delta table.

### Example

To optimize a Delta table, you can use either the path or the schema and table name:

```
## Using Path
spark.sql("OPTIMIZE '/tmp/optimized-table-example'")

## Using Schema and Table
spark.sql("OPTIMIZE schema_name.table_name")
```

## Z-Ordering in Delta Lake

Z-ordering is a data organization technique that groups related data together to improve query performance. For example, if we frequently query a dataset using the `department` column, applying Z-ordering on the `department` column will cause Delta Lake to sort and store `department` level data together. This optimizes query execution.

There are two primary operations performed by Z-order:

1. Data ordering based on the specified column.
2. Updating the metadata statistics for the minimum and maximum values of the column.

Z-ordering helps in performing data skipping and reduces unnecessary data scan operations, enhancing overall query efficiency.

`ZORDER` will change the distribution of the file sizes unlike `Optimize`. This is a desired outcome as the desired data is located close to each other.

### Example

```
## Using Schema and Table
spark.sql("OPTIMIZE schema_name.table_name ZORDER BY (column_name)")
```

## Vacuum

`VACUUM` command will clean up all the deleted files as well as the version of the table which are no longer current. If overwrite is performed on the table then the size of the table on the disk can grow exponentially.

Here are 2 important table properties which helps us control the behavior of `VACUUM`:

```
delta.logRetentionDuration (Default 30 days)
```

```
delta.deletedFileRetentionDuration (Default 1 week)
```

With these 2 properties set based on the requirement, `VACUUM` comand will perform most of the work for us. This is a very important step to keep the delta table tidy and manage the cost associated with data storage.

Depending on the nature of the data, a job must be schedueld to perform the `VACUUM` command on a regular interval.

## Summary

In this article, we explored various optimization techniques for Delta tables. These strategies are designed to be adaptable and should be tailored to the specific characteristics of your data. By implementing these techniques, you can efficiently manage your Delta tables, improving performance and storage efficiency.

References:

1. [Mastering Delta Lake Optimizations: OPTIMIZE, Z-ORDER and VACUUM](https://medium.com/data-reply-it-datatech/mastering-delta-lake-optimizations-optimize-z-order-and-vacuum-f6ca110c9869)
2. [Optimization - official documentation](https://docs.delta.io/latest/optimizations-oss.html)
3. [Delta Lake Optimisation Guide](https://www.linkedin.com/pulse/delta-lake-optimisation-guide-deenar-toraskar)
