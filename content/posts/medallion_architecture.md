---
author: ["Vasav Anandjiwala"]
title: "Medallion Architecture"
date: "2024-07-02"
description: "Lakehouse data design pattern"
summary: "Lakehouse data design pattern"
tags: ["Data Engineering", "Apache Spark", "Databricks"]
categories: ["Data Engineering", "Apache Spark", "Databricks"]
series: ["Data Engineering"]
cover:
  image: images/apache_spark.png
ShowToc: true
TocOpen: true
social:
fediverse_creator: "@vanandjiwala@mastodon.social"
---

## Introduction

Efficient data organization and management are crucial for reducing maintenance efforts and enhancing data usability. In this article, part of my Delta Lake series, I will introduce you to the Medallion Architecture, a data design pattern used to structure data in a lakehouse environment. This procedural framework provides various tiers, starting from data ingestion to downstream consumption, allowing data to be organized in a structured, progressive manner.

![alt text](https://www.databricks.com/sites/default/files/inline-images/building-data-pipelines-with-delta-lake-120823.png?v=1702318922)

`Delta Lake Medallion Architecture By Databricks`

There are primarily 3 tiers associated in the **medallion architecture**.

1. Bronze
2. Silver
3. Gold

it's important to note that there can be more than three tiers depending on the nature of the data and specific use cases. This architecture enables data engineers to adapt to changing requirements and perform data recovery as needed. By using the Medallion Architecture, data engineers can create a flexible and scalable framework that enhances the efficiency and reliability of their data management processes.

## Bronze Layer

The Bronze layer is the initial stage of the Medallion Architecture, acting as a landing zone for raw data. In real-world scenarios, obtaining clean and high-quality data consistently is challenging. Addressing data quality issues is crucial for data engineers to maintain the data system's functionality. The Bronze layer is vital in such cases.

Here are the primary characteristics of the bronze layer:

- Minimal transformations are applied to the data.
- Transformations typically ensure type compatibility for storage in Delta tables.
- The raw form of the data provides flexibility for reprocessing when requirements change.
- Data ingestion should be automated.
- Type-safe data sources like RDBMS require minimal effort and can be easily stored in Bronze layers.

## Silver Layer

The Silver layer is responsible for performing transformations, filtering, and joining operations on top of the Bronze/Silver tables. Initial cleaning and filtering help data teams achieve consistency and enhance data quality.

Here are the primary characteristics of the silver layer:

- Transformations are performed on Bronze layer tables to create Silver layer tables.
- Silver tables can also be obtained by joining multiple Silver tables, not necessarily derived directly from Bronze tables.
- Provides consistency and quality over raw data.
- Can be used by various downstream consumers within or outside the organization for diverse use cases.
- It is common to drop or filter columns to derive a clean Silver layer table.
- It is good practice to set mergeSchema to false to prevent additional columns from sneaking into the data.
- Results in more consistent and reliable data for downstream users.
- Represents the first stable layer in the architecture.

## Gold Layer

The Gold layer is the most refined and mature data layer, typically used for reporting, machine learning, and business intelligence (BI) use cases. Gold tables are usually derived for specific use cases to solve particular problems.

Here are the primary characteristics of the gold layer:

- It is the most mature layer in the architecture.
- Usually goes through multiple transformations.
- Remains consistent and does not change significantly over time.
- Suddent changes in the gold table can impact existing reporting, BI or even accuracy of ML models

### Referneces:

1. https://www.databricks.com/glossary/medallion-architecture
2. [Delta Lake: The Definitive Guide](https://www.databricks.com/resources/ebook/delta-lake-the-definitive-guide-by-oreilly)
3. [dataengineering.wiki](https://dataengineering.wiki/Concepts/Medallion+Architecture)
