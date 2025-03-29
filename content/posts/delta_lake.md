---
author: ["Vasav Anandjiwala"]
title: "What is delta lake in databricks?"
date: "2025-03-20"
description: "Understanding Delta Lake"
summary: "Understanding Delta Lake Basics"
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

## What is a data lake?

Data lake is a oraganization wide repository of various forms of data which includes structured, semi-structured and unstructured data sources. Comapnies can perform various operations on top of this data lake which includes driving dashboards/BI applications, running ML algorightms or any LLM related use cases like RAG. In constract to a data warehouse which can store structured data sources, data lake can hold multiple types of data like photos, video feeds, IOT data, csv files etc. Typically these data lakes are build on cloud storage like AWS s3 or azure blob storage.

Since data lakes hold raw form of data, in order to make data more usable and easy to manage we need to have provision of a catalog which can help organize the data in a better and structured way. Catalog also allows better control over the access and governance. Unity catalog provided by databricks is one such example.

Data lake allows a seperation between the storage and the compute. These is very beneficial in terms of cost. Until the data is used for computation, only storage cost will be applied which is becoming cheaper and cheaper over time. Data lakes are used as a staging area for the data warehouse (ELT approach) where data is first stored in the data lake and post that it is processed and pushed to a data warehouse. Due to loosely structured nature of data lake, the data can be malformed or corruput which is knows as "data swamp". Another common issue with data lakes is that there is no isolation between reads and writes. There is no concept of transactions which can lead to inconsistent results.

## What is a data warehouse?

It is a central repository of structured data within an organization. This central repository helps driving various analytics and BI use cases within an organization. In the traditional approach there was no isolation between compute and storage. So as the data grow, the cost associated with managing the warehouse infrastructure also increases significantly. Data warehouse is built for reliability and supports schema enforcement, type safety, user and group level permissions. Due to the limitation of not able to store unstructured data, the ML/AI data sources like images, video feeds etc needs to be pushed to a data lake.

## Dual - Tier Architecture (Accomodating both the DWH and Data Lake)

Due to increasing use cases in ML and AI, organizations has to manage both the data lake and data warehouses simultaniously. It is a seperate task/effort to make sure the data lake and the data warehouse remains in sync all the times. Consider the following diagram to understand the dual tier architecture:

![alt text](https://vasav.co.in/images/2-tier-architecture.png)

Here is how data flows throught the architecture:

1. From the source system which can be another DB/File/reast api, data is pushed to the data lake (S3). This can be done using a tool like airbyte, custom code scheduled using mage or airflow.
2. Once data lands in data lake, it can be transformed and stored in a staging location on the same data lake.
3. Another job will pick that staging data and push it to the data warehouse.

Here data lake can support ML use cases while DWH can support BI/Analytics use cases.

## Lakehouse architecture

It combines best of both the worlds - data warehouse and data lake. These architecture allows one standard single system which can be utilized across the team based on the use case. Having a single system means there is just single source of truth. Pain associated with syncing the data lake and data warehouse no longer exists which is huge in terms of development and maintainance efforts.

Here are some high level features of lakehouse as specified in "Delta lake the definitive guide":

- Transaction support
- schema enforcement and governance
- BI support through sql and JDBC support
- Separate storage and compute
- Open API and open data format
- Streaming support
- SQL to deeplearning workloads supported

## Delta lake

Delta lake is an open source storage layer. It comes with databricks run time and the default format. Delta lake make it possible to build a single data platform which can perform high performance query for BI or streaming workloads.

![alt text](https://www.databricks.com/wp-content/uploads/2020/01/data-lakehouse-new.png)

Here are some high level points which can help you understand the delta lake in a better way:

- Bring in consistency with ACID transactions and audit trail
- It is a part of databricks eco-system
- Delta log keeps track of every transaction that happens on a delta table
- Log is a json file with information on each and every operation that happens (all CRUD operations)
- Data is stored in parquet format

## Summary

In this article I explained the concepts around data lake, data warehouse and data lakehouse. Delta lake is a storage layer which is primarily used along side databricks. In the next blog, I am going to provide some hands on code to showcase the features of delta lake which will make things more clear.

Delta lake, unity catalog used with medallion architecture will make a very powerful, well organized and well governed data system which is very flexible and scalable.

## References

- [Delta lake - The definitive guide](https://www.databricks.com/resources/ebook/delta-lake-the-definitive-guide-by-oreilly)
- [Lakehouse: A New Generation of Open Platforms that Unify
  Data Warehousing and Advanced Analytics](https://www.cidrdb.org/cidr2021/papers/cidr2021_paper17.pdf)
