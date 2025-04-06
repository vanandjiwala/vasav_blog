---
author: ["Vasav Anandjiwala"]
title: "Databricks Certified Associate Developer for Apache Spark"
date: "2025-04-06"
description: "Databricks Certified Associate Developer for Apache Spark - Resources"
summary: "Articles, blogs and doumentation list for apache spark - Resources"
tags: ["Data Engineering", "Apache Spark", "Certification Guide"]
categories: ["Data Engineering", "Apache Spark", "Certification Guide"]
series: ["Data Engineering"]
cover:
  image: images/apache_spark.png
ShowToc: true
TocOpen: true
social:
fediverse_creator: "@vanandjiwala@mastodon.social"
---

## The Ultimate Guide to Databricks Associate Spark Developer Certification: How to Ace the Exam

I recently cleared databricks associate spark developer certification. In this article, I am going to list down the resources I used in for the exam preparation. Here is the [curriculum for the exam](https://www.databricks.com/learn/certification/apache-spark-developer-associate)

Following are the topics which needs to be studied to pass the exam:

- Spark architecture
- Adaptive Query Execution (AQE)
- DataFrame API for manipulation task
  - selecting columns
  - renaming columns
  - manipulating columns
  - filtering rows
  - dropping rows
  - sorting rows
  - aggregating rows
- joining dataframes
- reading dataframes
- writing and partitioning dataframes
- working with User defined functions (UDFs)
- Spark SQL functions

## Preparations

Based on the official website, here is the distribution of the questions you can expect in the exam:

1. Apache Spark Architecture Concepts – 17% (10/60)
2. Apache Spark Architecture Applications – 11% (7/60)
3. Apache Spark DataFrame API Applications – 72% (43/60)

As you can see from the above distribution, you can see that the dataframe API is the most important section for the exam. You need to get at least 70% to clear the exam. In other words, 42/60 questions should be correct.

### Dataframe API

As described, this is the most important section. In the exam, you can use the PDF version of the documentation without the search functionality. So in order to practice dataframe API, first create a databricks community edition account and then start practicing code in the notebook.

Make sure to use the documentation to understand the syntax associated with the API. Try different parameters to gain more clarity on how methods work and what is expected in the parameters.

I have been uploading pyspark practice code on this [github repo](https://github.com/vanandjiwala/pyspark-examples). I'll keep updating this repo to include more examples.

### Spark Architecture

I relied heavily on the books and online resources to gain more understanding of apache spark architecture. I have also used chatgpt to gain more clarity on few topics which were unclear after reading the book.

I am going to list down all the resources I have used for preparation. I recommend to use these resources in the following order:

1. Books
2. Online Resources
3. Databricks documentation and API practive
4. Mock exam available on the databricks exam
5. (Optional) - Udemy course for mock databricks exam

## Books

1. Spark – The Definitive Guide: Big data processing made simple
2. Learning Spark: Lightning-Fast Data Analytics, Second Edition

## Online Resources

1. https://towardsdatascience.com/ultimate-pyspark-cheat-sheet-7d3938d13421
2. https://medium.com/free-code-camp/deep-dive-into-spark-internals-and-architecture-f6e32045393b
3. https://spark.apache.org/docs/3.0.0/api/python/pyspark.sql.html
4. https://www.rakirahman.me/spark-certification-study-guide-part-1/#tasks
5. https://mageswaran1989.medium.com/spark-jargon-for-starters-af1fd8117ada
6. https://shrutibhawsar94.medium.com/study-guide-for-clearing-databricks-certified-associate-developer-for-apache-spark-3-0-69377dba0107
7. https://www.databricks.com/session/deep-dive-into-monitoring-spark-applications-using-web-ui-and-sparklisteners
8. https://selectfrom.dev/spark-performance-tuning-spill-7318363e18cb
9. https://medium.com/data-arena/databricks-certified-associate-developer-for-apache-spark-tips-to-get-prepared-for-the-exam-cf947795065b
10. https://towardsdatascience.com/10-mcqs-to-practice-before-your-databricks-apache-spark-3-0-developer-exam-bd886060b9ab
11. https://jaceklaskowski.gitbooks.io/mastering-spark-sql/content/spark-sql-Column.html
12. https://jaceklaskowski.gitbooks.io/mastering-spark-sql/content/spark-sql-bucketing.html
13. https://jaceklaskowski.gitbooks.io/mastering-spark-sql/content/spark-sql-SparkSession.html?q=
14. https://mungingdata.com/apache-spark/dates-times/
15. https://github.com/spark-examples/pyspark-examples
16. https://www.youtube.com/watch?v=d9Mt67UKSio

## Documentation

1. https://www.webassessor.com/zz/DATABRICKS/Python_v2.html

## Mock Exams

1. https://files.training.databricks.com/assessments/practice-exams/PracticeExam-DCADAS3-Python.pdf
2. https://www.udemy.com/course/databricks-certified-developer-for-apache-spark-30-practice-exams/
