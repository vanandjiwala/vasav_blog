---
author: ["Vasav Anandjiwala"]
title: "Why Databricks?"
date: "2025-03-24"
description: "What databricks offers as a platform and how it fits in the data eco system?"
summary: "What databricks offers as a platform and how it fits in the data eco system?"
tags: ["Data Engineering", "Databricks"]
categories: ["Data Engineering", "Databricks"]
series: ["Data Engineering"]
cover:
  image: images/databricks.png
ShowToc: true
TocOpen: true
social:
fediverse_creator: "@vanandjiwala@mastodon.social"
---

## TL;DR

This post introduces Databricks, a data intelligence platform that combines the best features of data warehouses and data lakes in a lakehouse architecture. It covers Databricks' key components, underlying architecture, Apache Spark integration, and provides guidance on how to get started using the Databricks Community Edition.

## Introdunction

I have been using the Databricks platform for almost five years. I feel this is a great opportunity to share valuable information for anyone interested in understanding Databricks, its use cases, and why it is rapidly gaining popularity among data professionals.

Databricks is a **data intelligence platform** that provides enterprise-grade data solutions designed to address challenges associated with traditional data systems. Databricks uses a lakehouse architecture, overcoming limitations associated with traditional data warehouses and data lakes. I've described this architecture in detail in an [earlier blog post](http://localhost:1313/posts/delta_lake/).

The lakehouse architecture provided by Databricks offers the best of both worlds—data warehouses and data lakes. Organizations can efficiently store, manage, and leverage various types of data to generate insights and maximize the value of their data.

## High Level Architecture

Databricks architecture has 4 primary components:

1. **Cloud Infrastructure** - A multi-cloud platform enabling users to leverage their own cloud accounts for data storage and compute resources.
2. **Databricks Runtime** - Includes essential libraries such as Apache Spark, Delta Lake, and DBFS for data processing.
3. **Data Goverenence** - Managed by Unity Catalog, responsible for data governance. More information can be found in my blog [here](https://vasav.co.in/posts/unity_catalog_01/).
4. **Workspace** - Provides comprehensive tools for data engineers, AI/ML engineers, and data scientists. This includes notebooks, workflows (job orchestration), serverless query engines, dashboards, and more.

These components can be categorized into two groups:

1. **Control Plane** - Components managed by Databricks, such as the web application, cluster management, job orchestration, REST APIs, CLI, etc.
2. **Data Plane** - Contains compute resources (clusters running Databricks Runtime) and primary storage. Since the data plane resides in the client's cloud infrastructure, clients maintain and manage their data and associated policies effectively. DBFS and Unity Catalog reside within the data plane.

![alt text](https://vasav.co.in/images/databricks_architecture.png)

## Apache Spark

pache Spark is a distributed computing engine developed at UC Berkeley, which processes data in-memory. Databricks was created by the original developers of Apache Spark, addressing infrastructure and maintenance challenges associated with Spark through a unified platform.

Apache Spark itself is an extensive topic. Databricks simplifies Spark usage by providing an easy-to-use ecosystem for processing data. I have a separate series about apache spark which you can find [here](http://localhost:1313/tags/data-engineering/).

## Getting started with databricks

In my opinion, the easiest way to begin is by signing up for the [Databricks Community Edition](https://community.cloud.databricks.com/login.html?tuuid=e067da4d-1773-433e-a660-06a75e5c7663). Community edition does not have all the features available in the enterprise vesion but it is a good starting point. Here are my recommendations for getting started:

1. Pick a dataset that you like from websites like kaggle or APIs.
2. Upload the data in dbfs.
3. Process the data using spark and create a bronze/raw delta table.
4. Perform some transformation to create silver layer delta table.
5. Prepare the analytics ready delta table.

## Next steps

I will be covering various topics in greater detail in upcoming posts. These will provide further clarity on how to effectively use Databricks and integrate it into your architecture or data solutions.

## References

1. [docs.databricks.com](https://docs.databricks.com/aws/en/getting-started/overview)
