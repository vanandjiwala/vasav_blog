---
author: ["Vasav Anandjiwala"]
title: "How Delta Lake Works?"
date: "2025-03-22"
description: "Hands on with delta lake with databricks."
summary: "Hands on with delta lake with databricks."
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

## TL;DR

How delta lake operates behind the scenes. Walk through of CRUD operations and the associated changes in the delta table data and delta log.

## Introduction

This blog post is going to cover some more details on how delta lake works. I am going to provide some code snippets and explaination of that code snippet which can potentially help you understand the delta lake operations. In the delta lake series i have already created 1 blog which is on the general introduction of delta lake architecture and it's evaluation. You can read that article [here](https://vasav.co.in/posts/delta_lake/).

## Understanding Delta Lake Tables

Delta lake tables consists of multiple components:

1. **data files (parquet)** - Actual data files in parquet format store typically on a distibuted storage system on cloud (Azure blog storage or S3).
2. **transaction logs/Delta logs** - Keeps track of every transaction performed on the delta table. Helps assuring ACID properties for delta table. Every transaction is represented by a separate json file. Includes a detailed audit trail on what operation was performe, what file was added/removed along with schema details.
3. **metadata** - Includes schema, partitioning and other configuration details. Metadata is part of the transaction log.
4. **schema** - Information of table structure, column types and names. Delta lake ensures consistency in the data and also allows schema evaluation to accomodate change in data over time.
5. **checkpoints** - Periodic snapshot of the transaction log which helps in the recovery process. By default every 10 transaction will produce a checkpoint file. Checkpoints are parquet files and are created by delta lake.

## Prerequisites

1. You should have either a paid or community edition access to databricks (I have used community edition so anyone without the paid account can also follow along)
2. You should have a cluster configured and a notebook created to get started.
3. Basic SQL, distributed computing concepts and spark understanding is recommended.

## Notebook Code

Code explained in this article can be found on [github](https://github.com/vanandjiwala/python_notebooks/tree/main/delta-lake).

## Creating a delta table

We are going to use hive metastore which is a legacy feature post the introduction to unity catalog but conceptually it will not be an issue to use it. You can still learn and understand the delta tables using hive merastore. Let's get started:

We have one default schema in hive metastore and we are going to use it for our demo.

### Creating a delta table

First let us create a **managed delta lake table** using the following command:

```
USE default;

CREATE TABLE IF NOT EXISTS point_of_sale (
  sale_id INT,
  product STRING,
  quantity INT,
  price DECIMAL(10,2),
  sale_date DATE
)

ALTER TABLE point_of_sale SET TBLPROPERTIES ('delta.checkpointInterval' = '5');
```

Data lifecycle in managed delta table is taken care by the delta lake. We created a `point_of_sale` table which includes sales information. We are setting the `delta.checkpointInterval` property value to 5. Based on [this article](https://community.databricks.com/t5/data-engineering/delta-log-checkpoints-not-being-created/td-p/37042), default values databricks has changed to 100 it seems so in order to see the behavior we are setting up this property to a lower number.

### Inserting data in delta table

Now let us insert some data in the table and see what delta lake does:

```
INSERT INTO point_of_sale VALUES
  (1, 'Apple', 10, 1.50, '2025-03-15'),
  (2, 'Banana', 5, 0.75, '2025-03-15'),
  (3, 'Orange', 20, 0.90, '2025-03-16'),
  (4, 'Milk', 2, 2.50, '2025-03-17'),
  (5, 'Bread', 3, 1.80, '2025-03-17');
```

Let us first check the location of the delta table. In that location, we should be able to see how data is inserted. Use the following command to obtain the location of the delta table in the storage (In production environment/real-world scenario these location resides on s3/blob storage etc.)

```
DESCRIBE DETAIL point_of_sale;
```

Above command will provide you details about the table then locate the `location` column and copy the content. In my case it was `dbfs:/user/hive/warehouse/point_of_sale`. This location holds the table data and the delta log. Let us examine the content of this directory using the following command:

Here `%python` is a magic command as our notebook language is `SQL`.

```
%python
display(dbutils.fs.ls("dbfs:/user/hive/warehouse/point_of_sale/"))
```

| path                                                                                                        | name                                                                | size | modificationTime |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---- | ---------------- |
| dbfs:/user/hive/warehouse/point_of_sale/\_delta_log/                                                        | \_delta_log/                                                        | 0    | 0                |
| dbfs:/user/hive/warehouse/point_of_sale/part-00000-88f41715-0637-4a85-9aab-4e4561a9ba34-c000.snappy.parquet | part-00000-88f41715-0637-4a85-9aab-4e4561a9ba34-c000.snappy.parquet | 1748 | 1742622840000    |

As you can see in the directory we have one directory to store `_delta_log` which accomodates the delta log and one data file which is a parquet file. Parquet allows efficintly storing and querying data.

Let us check the history of the delta table which gives us a clear picture on what operations happened on the delta table using the following command:

```
DESCRIBE HISTORY point_of_sale;
```

| version | timestamp                     | operation         | operationParameters                                                                                                 |
| ------- | ----------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| 2       | 2025-03-22T05:54:01.000+00:00 | WRITE             | {"mode":"Append","statsOnLoad":"false","partitionBy":"[]"}                                                          |
| 1       | 2025-03-22T05:53:58.000+00:00 | SET TBLPROPERTIES | {"properties":"{\\"delta.checkpointInterval\\":\\"5\\"}"}                                                           |
| 0       | 2025-03-22T05:53:56.000+00:00 | CREATE TABLE      | {"partitionBy":"[]","clusterBy":"[]","description":null,"isManaged":"true","properties":"{}","statsOnLoad":"false"} |

As you can see from the result, we had 3 operations so far which is **creating the table, setting the table property and inserting the data**. `operationParameters` column will give you a detailed view of the operation.

### Updating the delta table and check the table history

Let us update the record.

```
UPDATE point_of_sale
SET quantity = 25,
    price = 1.00
WHERE sale_id = 3;

DESCRIBE HISTORY point_of_sale;
```

**What actually happens on an update operation**

1. Delta Lake starts by reading the delta log.
2. Delta Lake determines which Parquet files contain the records that match the update condition.
3. Delta Lake determines which Parquet files contain the records that match the update criteria.
4. Delta Lake writes new Parquet file(s) containing the updated records and may also combine unaffected records if needed.
5. Once the new Parquet files are written, Delta Lake appends a new JSON entry to the Delta log and reference the newly created parquet file as the latest file which makes the older file irrelevant (Important thing to note is that delta lake does not update or remove the parquet data file. Commit happens automatically post file rewrite and delta log update)
6. Upon query only the active files are referred and that's how we get results from the latest updated file.

Let us observe the files in the table.
| path | name | size | modificationTime |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---- | ---------------- |
| dbfs:/user/hive/warehouse/point_of_sale/\_delta_log/ | \_delta_log/ | 0 | 0 |
| dbfs:/user/hive/warehouse/point_of_sale/part-00000-88f41715-0637-4a85-9aab-4e4561a9ba34-c000.snappy.parquet | part-00000-88f41715-0637-4a85-9aab-4e4561a9ba34-c000.snappy.parquet | 1748 | 1742622840000 |
| dbfs:/user/hive/warehouse/point_of_sale/part-00000-b71d79b4-1f35-4f2b-86f9-321e1b787b2c-c000.snappy.parquet | part-00000-b71d79b4-1f35-4f2b-86f9-321e1b787b2c-c000.snappy.parquet | 1749 | 1742622855000 |
| dbfs:/user/hive/warehouse/point_of_sale/part-00000-b89992ce-bedd-48be-9ddb-ee74469b366d-c000.snappy.parquet | part-00000-b89992ce-bedd-48be-9ddb-ee74469b366d-c000.snappy.parquet | 1756 | 1742622850000 |

You can see an additional record for update present in the history.

| version | timestamp                         | operation         | operationParameters                                                                                                 |
| ------- | --------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| **4**   | **2025-03-22T05:54:15.000+00:00** | **UPDATE**        | **{"predicate":"[\\"(sale_id#19957 = 3)\\"]"}**                                                                     |
| 3       | 2025-03-22T05:54:10.000+00:00     | WRITE             | {"mode":"Append","statsOnLoad":"false","partitionBy":"[]"}                                                          |
| 2       | 2025-03-22T05:54:01.000+00:00     | WRITE             | {"mode":"Append","statsOnLoad":"false","partitionBy":"[]"}                                                          |
| 1       | 2025-03-22T05:53:58.000+00:00     | SET TBLPROPERTIES | {"properties":"{\\"delta.checkpointInterval\\":\\"5\\"}"}                                                           |
| 0       | 2025-03-22T05:53:56.000+00:00     | CREATE TABLE      | {"partitionBy":"[]","clusterBy":"[]","description":null,"isManaged":"true","properties":"{}","statsOnLoad":"false"} |

### Delete operation

Use the following command to perform delete operation.

```
DELETE FROM point_of_sale
WHERE sale_id = 15;
```

**What actually happens on an delete operation**

1. Delta Lake starts by reading the delta log.
2. Delta Lake determines which Parquet files contain the records that match the delete condition.
3. Delta Lake scans the identified files to isolate records that should be removed based on the delete criteria.
4. Delta Lake writes new Parquet file(s) containing only the records that are not deleted, effectively omitting the removed records.
5. Once the new Parquet files are written, Delta Lake appends a new JSON entry to the Delta log that marks the old files as removed and references the newly created files, ensuring that the commit is atomic and the older files remain unchanged.
6. Upon query, only the active files are read, so the deleted records are no longer visible.

Let us observe the files in the table. All files are intact and new files are added post the delete operation.

| path                                                                                                        | name                                                                | size | modificationTime |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---- | ---------------- |
| dbfs:/user/hive/warehouse/point_of_sale/\_delta_log/                                                        | \_delta_log/                                                        | 0    | 0                |
| dbfs:/user/hive/warehouse/point_of_sale/part-00000-375de16b-98bb-460f-88a5-d1364f7b19ce-c000.snappy.parquet | part-00000-375de16b-98bb-460f-88a5-d1364f7b19ce-c000.snappy.parquet | 1727 | 1742622876000    |
| dbfs:/user/hive/warehouse/point_of_sale/part-00000-5ad05741-a0de-46d9-a287-9f1f56dc9495-c000.snappy.parquet | part-00000-5ad05741-a0de-46d9-a287-9f1f56dc9495-c000.snappy.parquet | 1750 | 1742622862000    |
| dbfs:/user/hive/warehouse/point_of_sale/part-00000-7fd3ada2-a7ce-4840-b9a0-0a7942089279-c000.snappy.parquet | part-00000-7fd3ada2-a7ce-4840-b9a0-0a7942089279-c000.snappy.parquet | 1733 | 1742622869000    |
| dbfs:/user/hive/warehouse/point_of_sale/part-00000-88f41715-0637-4a85-9aab-4e4561a9ba34-c000.snappy.parquet | part-00000-88f41715-0637-4a85-9aab-4e4561a9ba34-c000.snappy.parquet | 1748 | 1742622840000    |
| dbfs:/user/hive/warehouse/point_of_sale/part-00000-b71d79b4-1f35-4f2b-86f9-321e1b787b2c-c000.snappy.parquet | part-00000-b71d79b4-1f35-4f2b-86f9-321e1b787b2c-c000.snappy.parquet | 1749 | 1742622855000    |
| dbfs:/user/hive/warehouse/point_of_sale/part-00000-b89992ce-bedd-48be-9ddb-ee74469b366d-c000.snappy.parquet | part-00000-b89992ce-bedd-48be-9ddb-ee74469b366d-c000.snappy.parquet | 1756 | 1742622850000    |

History associated with the table.

| version | timestamp                     | operation         | operationParameters                                                                                                 |
| ------- | ----------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| 7       | 2025-03-22T05:54:37.000+00:00 | DELETE            | {"predicate":"[\\"(sale_id#22526 = 15)\\"]"}                                                                        |
| 6       | 2025-03-22T05:54:29.000+00:00 | WRITE             | {"mode":"Append","statsOnLoad":"false","partitionBy":"[]"}                                                          |
| 5       | 2025-03-22T05:54:22.000+00:00 | WRITE             | {"mode":"Append","statsOnLoad":"false","partitionBy":"[]"}                                                          |
| 4       | 2025-03-22T05:54:15.000+00:00 | UPDATE            | {"predicate":"[\\"(sale_id#19957 = 3)\\"]"}                                                                         |
| 3       | 2025-03-22T05:54:10.000+00:00 | WRITE             | {"mode":"Append","statsOnLoad":"false","partitionBy":"[]"}                                                          |
| 2       | 2025-03-22T05:54:01.000+00:00 | WRITE             | {"mode":"Append","statsOnLoad":"false","partitionBy":"[]"}                                                          |
| 1       | 2025-03-22T05:53:58.000+00:00 | SET TBLPROPERTIES | {"properties":"{\\"delta.checkpointInterval\\":\\"5\\"}"}                                                           |
| 0       | 2025-03-22T05:53:56.000+00:00 | CREATE TABLE      | {"partitionBy":"[]","clusterBy":"[]","description":null,"isManaged":"true","properties":"{}","statsOnLoad":"false"} |

## Next steps

In the next article I am going to cover some advance features like time travel, optimize, vacuum. These are essential commands to make delta lake healthy and optimized especially for big data.

## Reference

1. [Delta Log checkpoints not being created?](https://community.databricks.com/t5/data-engineering/delta-log-checkpoints-not-being-created/td-p/37042)
