---
author: ["Vasav Anandjiwala"]
title: "Overview Of Unity Catalog"
date: "2025-02-08"
description: "This article describes the basic concepts and terms around unity catalog."
summary: "This article describes the basic concepts and terms around unity catalog."
tags: ["Unity Catalog", "Databricks", "Data Engineering"]
categories: ["Unity Catalog", "Databricks", "Data Engineering"]
series: ["Unity Catalog"]
cover:
  image: images/unity_catalog.png
ShowToc: true
TocOpen: true
social:
fediverse_creator: "@vanandjiwala@mastodon.social"
---

## TL;DR

This article explains the overall concepts and terminologies associated with the **unity catalog**. We will be considering unity catalog associated with **databicks platform** and not the open-source version of unity catalog. Perticularly userful for someone migrating from lagacy hive metastore to unity catalog.

## Primary Features

- Provides cetralized **access control, auditing capabilities, lineage and data discovery capabilities** in a databricks workspace
- Allows **full control over data** across workspaces (Includes row level and column level security)
- Security model is based on **ANSI SQL** so easy to adapt for sql users
- Capures user level **audit logs**
- Helps in **data discovery and data management**
- Allows **monitoring logs, billing etc.** through system tables

## Objects in unity catalog

As I am discovering unity catalog, I have used several of the objects available based on my use case. So I am going to provide more in-depath understanding of those object and I will cover the ones which I have not discovered later as at this stage I have limited understanding of those objects.

In the diagram below, the block color describes the following:

1. **Green** - Used it
2. **Yellow** - Have some idea about it
3. **Red** - Little or no exposure

![alt text](https://vasav.co.in/images/unity_catalog_objects.png)

## Quick Explaination of every objects in the hierarchy

### Metastore

- The **top-level container for metadata**, registering data and AI assets along with their access permissions.
- Each region with workspaces should have one metastore. **​Each reagion can not have more than one meta store.**

### Catalogs

- **Top level entity for data isolation** under metastore.

### Non Data Securable Objects

- They are part of metastore. These objects include storage credentials, external locations, share, providers etc. Depending on the use case they must be used. I am going to conver storage credentials and external locations in the serioes.

### Schemas (Databases)

- Contain tables, views, volumes, AI models, and functions, organizing data and AI assets into logical categories.

### Tables

- Views are saved queries against one or more tables.​

### Functions

- Typically a UDF which returns wither a scalar value or set of rows.

### Models

- AI/ML models packaged by MLFLOW.

## How access works under unity catalog

- **Access can be granted and revoked at any level within the hierarchy**. This includes the metastore as well.
- **Access to an object with automatically grant access to all the children of that object**. For example, if a specific access is given at the schema level, the same access with be applied at the table/view/model level as they are children of the schema.
- By default, unity catalog provides the **least privilage to the non-admin users**. The default access is only restricated to `workspace catalog`. On the other hand **admin users have more privilage** by default.

## Managed Vs. External

![alt text](https://vasav.co.in/images/unity_catalog_table_types.png)

In unity catalog, tables and volumes there are 2 types:

1. Managed - Here unity catalog takes care of the actual data files. Location where data is stored is also managed by the unity catalog and user does not have control over that process. Managed tables can be stored at metastore, catalog or schema level. They only support delta table format.
2. External - Here the data storage, data lifecycle and layouts are managed externally. This is perticularly useful to leverage an existing data lake. These table needs to be registered in the unity catalog and they are ready to be used. Eternal tables can have json, csv, ORC, text etc.

## Setting Up Unity Catalog:

- To use Unity Catalog, a Databricks workspace must be attached to a Unity Catalog metastore.​
- New workspaces may have Unity Catalog enabled automatically, creating a default metastore and catalog.​
- For older accounts, an account admin may need to create the metastore and assign workspaces to it.​

## Referneces

1. [unity-catalog official documentation](https://docs.databricks.com/aws/en/data-governance/unity-catalog/)
