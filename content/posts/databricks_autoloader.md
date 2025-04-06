---
author: ["Vasav Anandjiwala"]
title: "Databricks Autoloader"
date: "2025-04-06"
description: "Incremental data processing with databricks platform"
summary: "Incremental data processing with databricks platform"
tags: ["Data Engineering", "Databricks", "Apache Spark"]
categories: ["Data Engineering", "Databricks", "Apache Spark"]
series: ["Data Engineering"]
cover:
  image: images/databricks.png
ShowToc: true
TocOpen: true
social:
fediverse_creator: "@vanandjiwala@mastodon.social"
---

## Introdunction

In the last article I covered structured streaming. If you have not read that article, I highly recommend [reading it](https://vasav.co.in/posts/databricks_incremental_data/) as it will help you understand this post. Main focus for the last post was on spark structured streaming. In this article I am going to cover **autoloader and incremental data processing**.

## What's incremental data?

Let us understand incremental data processing with an example. In the businesses, data is closely associated with the business processes, for instance sale happening at a store. In a store, when a customer buys something, an invoice is generated with the list of items which are bought along with their quantities and price.

For a store operating from 10 AM to 10 PM, customers are visiting based on their preferences and purchasing various items. Now the store owner is willing to perform some analysis on _Hourly Transactions_, how many total transactions per hour in real time. Based on this scenario, the data generated through POS/cash register needs to be processed continuously and needs to feed that into the analytical system which is resposnible for reporting and BI/dashboards.

In such scenario, system might be exporting records for past 5 mins and sending it to the cloud. At every 5 mins interval, analytical system should have a new data. As the new data comes, the system must process it so the dashbord stays relevant and management can see insights into what is going on.

Here the nature of data is incremental. As the day progresses, the data keeps arriving at the analytical system which can be consumed for various business use cases.

![alt text](https://vasav.co.in/images/incremental_data.png)

As shown in the above diagram, as new data keeps adding in s3 or any other object storage, that data needs to be processed. In order to process only the unprocessed files, we need to use autoloader or `copy into` command which we are going to cover.

## Loading incremental data

Databricks provides 2 ways to process incremental data.

1. Using `COPY INTO` command
2. Using autoloader

These both approach have their own strength which we will discuss as we move forward in the tutorial. In terms of working, they keep track of the files which are processed. Based on that history it can detect the newly arrived file at the desired location. So it will pick up those files, process them and mark them as processed. So in the next run it will not be processed again.

### COPY INTO

Copy into command will load the data from the provided location to the delta table. It only processes the new files and skips the files which are already processed. According to the official documentation here is the syntax:

```
COPY INTO target_table [ BY POSITION | ( col_name [ , <col_name> ... ] ) ]
  FROM { source_clause |
         ( SELECT expression_list FROM source_clause ) }
  FILEFORMAT = data_source
  [ VALIDATE [ ALL | num_rows ROWS ] ]
  [ FILES = ( file_name [, ...] ) | PATTERN = glob_pattern ]
  [ FORMAT_OPTIONS ( { data_source_reader_option = value } [, ...] ) ]
  [ COPY_OPTIONS ( { copy_option = value } [, ...] ) ]

source_clause
  source [ WITH ( [ CREDENTIAL { credential_name |
                                 (temporary_credential_options) } ]
                  [ ENCRYPTION (encryption_options) ] ) ]
```

### Tutorial

We are going to perform a simple incremental data load on the matches data. We will use the same dataset as the used in the last article which can be downloaded from [this link](https://github.com/vanandjiwala/python_notebooks/tree/main/data-chunking).

Let us first upload the files. The instructions for the same is provided in the last blog post. Make sure to upload few files and not all. We will run `COPY INTO` command once to see what happens and then we will upload another set of data to check the behavior of the command.

List files present in the directory using the following command

```
dbutils.fs.ls("/FileStore/tables/matches/")
```

Let us create a table which acts as a target table using the following command:

```
%sql
CREATE TABLE matches_copy_into;
```

Let us process the first set of files using the following command

```
%sql
COPY INTO matches_copy_into
FROM '/FileStore/tables/matches/'
FILEFORMAT = CSV
FORMAT_OPTIONS ('delimiter' = ',', 'header' = 'true')
COPY_OPTIONS ('mergeSchema' = 'true')
```

- Here we are copying the files from directory - `/FileStore/tables/matches/`.
- Files are csv so `FILEFORMAT = CSV`.
- We have `,` as delimiter and headers are there in file so we use `delimiter` and `header` format options.
- Lastly we specify `mergeSchema` to true for schema evolution.

Run the command will give you `num_affected_rows`, `num_inserted_rows` and `num_skipped_corrupt_files`.

Let us find the max and min date so in next run we can track the file processing. We use the following query to find min and max date from the dataset.

```
%sql
SELECT MIN(date), MAX(date) FROM matches_copy_into;
```

Once we have our min and max date, let us upload another set of files and run the `copy into` command again. Once executed, we check min and max date again.

```
%sql
COPY INTO matches_copy_into
FROM '/FileStore/tables/matches/'
FILEFORMAT = CSV
FORMAT_OPTIONS ('delimiter' = ',', 'header' = 'true')
COPY_OPTIONS ('mergeSchema' = 'true')

SELECT MIN(date), MAX(date) FROM matches_copy_into;
```

Post running the command 2nd time you should be able to see the new data being inserted into the delta table. Min/max/count can be used to track what happened on the table.

There are format specific and general options available based on the use case. In the next section, I have provided the details about these available options.

### COPY INTO command options summary

#### Generic Options - For all time formats

| Option                | Type             | Default Value | Description                                                                                                                                                                            |
| --------------------- | ---------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ignoreCorruptFiles`  | Boolean          | `false`       | Whether to ignore corrupt files. If set to `true`, the Spark jobs will continue to run when encountering corrupted files, and the contents that have been read will still be returned. |
| `ignoreMissingFiles`  | Boolean          | `true`        | Whether to ignore missing files. If set to `true`, the Spark jobs will continue to run when encountering missing files, and the contents that have been read will still be returned.   |
| `modifiedAfter`       | Timestamp String | None          | An optional timestamp to ingest files that have a modification timestamp after the provided timestamp.                                                                                 |
| `modifiedBefore`      | Timestamp String | None          | An optional timestamp to ingest files that have a modification timestamp before the provided timestamp.                                                                                |
| `pathGlobFilter`      | String           | None          | A glob pattern to filter the files to be loaded. Equivalent to `PATTERN` in `COPY INTO`.                                                                                               |
| `recursiveFileLookup` | Boolean          | `false`       | Whether to recursively load files from nested directories.                                                                                                                             |

#### CSV Options

| Option               | Type    | Default Value | Description                                             |
| -------------------- | ------- | ------------- | ------------------------------------------------------- |
| `header`             | Boolean | `false`       | Whether the first line of the CSV files is a header.    |
| `inferSchema`        | Boolean | `false`       | Whether to infer the schema of the CSV files.           |
| `sep` or `delimiter` | String  | `,`           | The character used to separate fields in the CSV files. |

#### JSON Options

| Option               | Type    | Default Value | Description                                       |
| -------------------- | ------- | ------------- | ------------------------------------------------- |
| `multiline`          | Boolean | `false`       | Whether the JSON files are multiline.             |
| `primitivesAsString` | Boolean | `false`       | Whether to infer all primitive values as strings. |

#### Parquet Options

| Option        | Type    | Default Value | Description                                      |
| ------------- | ------- | ------------- | ------------------------------------------------ |
| `mergeSchema` | Boolean | `false`       | Whether to merge schemas from all Parquet files. |

#### Avro Options

| Option        | Type    | Default Value | Description                                          |
| ------------- | ------- | ------------- | ---------------------------------------------------- |
| `avroSchema`  | String  | None          | Optional schema provided by the user in Avro format. |
| `mergeSchema` | Boolean | `false`       | Whether to merge schemas from all Avro files.        |

#### Text Options

| Option      | Type    | Default Value | Description                                          |
| ----------- | ------- | ------------- | ---------------------------------------------------- |
| `wholetext` | Boolean | `false`       | Whether to read the entire input as a single string. |

#### Binary File Options

| Option           | Type   | Default Value | Description                                      |
| ---------------- | ------ | ------------- | ------------------------------------------------ |
| `pathGlobFilter` | String | None          | A glob pattern to filter the files to be loaded. |

### Autoloader

Autoloader is another mechanism to load incremental data. Autoloader uses spark structured streaming behind the scenes to process incremental data. Autoloader uses a checkpoint location and uses RockDB to store metadata around the processed files. autoloader can handle millions of files per hour and can operate seamlessly at the scale of billions of files as per the documentation. So databricks recommends using this over `COPY INTO`. In case of a failure, autoloader can identify the unprocessed files through checkpoint location and based on that it can process the unprocessed files.

Autoloader operates on 2 modes to detect files in the desired location:

1. Directory Listing Mode - Based on the checkpoint and listing, new files are detected.
2. File Notification Mode - New files are detected based on the events triggered and queue services. Based on these, the files are processed.

Directory listing mode is the default mode which is ideal for smaller workloads. For a large scaled operations it is recommended to use file notification mode for better performance.

### Tutorial

We are going to follow the exact same tutorial in case of autoloader. Let us get started with databricks community edition. Make sure to start a cluster and have a notebook ready.

```
dbutils.fs.ls("/FileStore/tables/matches/")

%sql
CREATE TABLE matches_autoloader;

df = spark.readStream.format("cloudFiles").option("cloudfiles.Format", "csv").option("cloudFiles.schemaLocation","/FileStore/tables/schema/matches").load("/FileStore/tables/matches/")

#.trigger(availableNow=True)
df.writeStream.option("checkpointLocation", "/FileStore/tables/checkpoint/matches").option("mergeSchema", "true").table("matches_autoloader").awaitTermination()

%sql
SELECT MAX(date) FROM matches_autoloader;

dbutils.fs.ls("/FileStore/tables/checkpoint/matches")
```

Here we are creating a table first and then reading the data from the desired location. Here is the high level code description

- `format(cloudFiles)` indicates autoloader
- `cloudFiles.schemaLocation` is used to schema
- `load` contains the path from which data needs to be fetched.

High level of explaination for `writeStream`

- `checkpointLocation` - place where autoloader keeps track of the files processed. In case you delete this location or change this, all files will be reprocessed.
- `mergeschema` - set to true for schema evolution

There are multiple `trigger` mechanism which i would like to cover in the next post to restrict the length of the post.

So like streaming, autoloader takes the unprocessed data and then write it to the desired location along with the status of files processed using checkpoint location.

## Conclusion

By using autoloader and copy into command, we can perform incremental data processing on the databricks platform. More or less then work the same way but for better performance and scalability, it is recommended to use the autoloader functionality.

## Next steps

In the next blog post, I will cover the triggers and options associated with structured streaming. Also how these autoloader can fit into Medallion architecture.

## References

1. [COPY INTO](https://docs.databricks.com/aws/en/sql/language-manual/delta-copy-into#format-options)
2. [What is Auto Loader?](https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader)
3. [What is Auto Loader file notification mode?](https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/file-notification-mode)
4. [What is Auto Loader directory listing mode?](https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/directory-listing-mode)
5. [https://aeshantechhub.co.uk/](https://aeshantechhub.co.uk/databricks-autoloader-advanced-techniques-and-best-practices/)
