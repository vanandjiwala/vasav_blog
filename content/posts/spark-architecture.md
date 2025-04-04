---
author: ["Vasav Anandjiwala"]
title: "Apache Spark Architecture"
date: "2022-10-08"
description: "Apache Spark Architecture Overview"
summary: "Apache Spark Architecture Overview"
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

## Introduction

Apache spark is a distributed compute engine used to process large volume/amount of data. In this article I am going to provide information on how it works behind the scenes.

---

## What Spark Does

If you are new to big data eco-system then the information on apache spark can be a bit overwhelming. In this section, I am going to provid a basic scenario which will help understanding the use case of Apache spark in a bit easier way.

Consider a new retail store which is open in your neighborhood. In the early days, the shop owner is keeping track of all the store transactions in a spreadhsheet on a personal computer. With time, the business is also growing so his computer is not performing well as the data is growing. Now the owner upgrades the computer spec (In technical terms vertical scaling). For some time he has solved the issue. After few more years, the owner now has 10 stores in the city and willing to track everything on a single computer. As the computer can can have limited amount of resources (RAM, DISK, CPU), it will take a very long time to process large volume of data and in most cases the spreadhsheet program will crach while handleing such scenario. So a single machine does not have enough capabilities to process large amount of data/information.

In order to counter this issue, we have to use a cluster/group of machines (More than one machine working in harmony to accomplish the task/data processing). A framework which coordinates and make sure the tasks are being performed without issue is required and Apache spark does just that. Cluster of machibes which spark uses to execute tasks are managed by cluster managers like `Yarn` or `Mesos`.

---

## Spark Architecture

Any spark application contains of two major components.

1. driver process
2. executor process

### Driver Process

Driver process runs the application. The driver process is mainly responsible for 3 things:

1. Maintain info about the app
2. Responding to inputs
3. Analyze, disctibute and execute work

### Executor Process

Executors are responsible for performing the task/job. Mainly an executor does 2 things

1. Perform task
2. Report the state of computation to the driver

![alt text](https://spark.apache.org/docs/latest/img/cluster-overview.png)

Here are key points:

1. Spark uses cluster managers to track available cluster resources.
2. Driver process will execute the task/commands across the executers.

---

## Languages Supported By Spark

1. Scala
2. Java
3. Python
4. SQL
5. R

For every programming language, there is a `sparkSession` object available which is the entry point for running the spark code. For non JVM language like python or R, the code written is translated to be run on executor JVMs.

---

## Spark APIs

As menitoned in the previous articles, spark has 2 main sets of API

1. Low-level (Unstructured) API
2. High-level (Structured) API

---

## SparkSession

As we discussed in the architecture section, the spark application can be controlled by a `driver` process called `SparkSession`. There is just one `SparkSession` for every spark application.

---

## Partitions

For performing parallel execution, spark needs to create chunk from the data which is called partitions. Every partition sits on a physical machine. Partitions represents how the data is distributed across the clusters.

In dataframe,we do not need to specify partitions. Spark will take care of doing it. This is important concept when we conver performance optimization.

---

## Transformations and actions

In spark, the core data structures are immutable, in other words they can not be modified after creation. For instance, a spark dataframe once created can not be changed. This may sound a bit weird but after understanding `transfaormations` and `actions` togather, it will be more clear.

Now, any operation that needs to be performed on the dataframe is called `transformation`. This can be filtering the data, performing some arithmetic operation etc. You can perform multiple transformations on a dataframe or any other spark data structure. Since spark is **lazily evaluated** the operations will not be executed immediately. Behind the scene,spark creates a logic plan to execute the transformations.

Actions will trigger the computation. As the transformations create a logical plan, the action will trigger the actual computation. Until we perform an `action`, no actual computation will take place.

Here are some examples of actions which are commonly used:

1. View Data
2. Collect data to native object
3. Write output to some data source

There is another concept associated with transformation which I want to mention here:

1. Narrow transformations - Here one partition on transformation will produce just one output partition `1 -> 1`. In narrow transformation, the operation happens in memory and hence it is faster.
2. Wide transformatons - Here one partion on transform will produce n output partitions `1 -> n`. Wide transformation produces more partitions, so intermediate data needs to be stored in disk so this results in a slower operation. This is also referred to as `shuffling`.

---

## References

1. spark - The definitive guide
2. https://spark.apache.org/docs/latest/cluster-overview.html
3. https://data-flair.training/blogs/how-apache-spark-works/#:~:text=Just%20like%20Hadoop%20MapReduce%2C%20it,in%20its%20own%20Java%20process.
4. https://sparkbyexamples.com/pyspark-tutorial/#features
5. https://www.databricks.com/glossary/what-are-transformations
