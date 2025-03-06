---
author: ["Vasav Anandjiwala"]
title: "how to setup apache spark on windows"
date: "2024-05-06"
description: "Setting up apache spark on windows"
summary: "Setting up apache spark on windows using docker"
tags: ["data engineering"]
categories: ["data engineering"]
series: ["data engineering"]
cover:
  image: images/postgres-docker.png
ShowToc: true
TocOpen: true
social:
fediverse_creator: "@vanandjiwala@mastodon.social"
---

## Introduction

As a Spark developer, setting up Apache Spark on Windows is a crucial first step towards building scalable and efficient big data applications. In this blog, we will walk you through the process of setting up Apache Spark on Windows, so you can start harnessing the power of Spark to process large datasets and build data-intensive applications.

Apache Spark is an open-source distributed computing system designed to process large datasets in a highly efficient and scalable manner. It is built to run on a cluster of machines and can handle large amounts of data across multiple nodes. Spark is widely used in big data applications, machine learning, data streaming, and more.

Whether you're new to Spark or a seasoned developer, this blog will provide you with the knowledge and skills you need to get started with Apache Spark on Windows. So, let's dive in!

## Installing Docker Desktop

In order to setup apache spark, we are going to use docker. Docker is a containerization platform that allows developers to package their applications into containers, which can then be deployed on any system that supports Docker. By installing Docker Desktop, you will be able to create a containerized environment on your Windows machine, which will allow you to run Spark and other big data tools in a standardized and reproducible way. This will help ensure that your applications run consistently across different environments and that you can easily share your work with others.

## Setting up spark

We are using docker to setup spark. Follow the following steps to start apache spark on your windows machine. Since we are using docker, these steps may well work with other OS.

1. Start docker desktop.
2. Open command prompt.
3. Run the following command to start apache spark on your machine.

```
docker run -it --rm -p 8888:8888 jupyter/pyspark-notebook
```

4. Once the docker container starts running, navigate to the following url to setup the jupyter lab.

```
http://localhost:8888/
```

5. On the web page, you will be asked for token and new password. The token can be obtained from the command prompt window used in step 3. You will see somethig like this on the command prompt. From the url, you can take the token value and paste it in the web page along with your password.

```
[I 2023-05-06 06:31:12.211 ServerApp] nbclassic | extension was successfully loaded.
[I 2023-05-06 06:31:12.340 ServerApp] nbdime | extension was successfully loaded.
[I 2023-05-06 06:31:12.340 ServerApp] Serving notebooks from local directory: /home/jovyan
[I 2023-05-06 06:31:12.340 ServerApp] Jupyter Server 2.5.0 is running at:
[I 2023-05-06 06:31:12.341 ServerApp] http://5f2e44544831:8888/lab?token=19e9c1op7d370488efe7d433e307a1fcfb9ab92d8838f
[I 2023-05-06 06:31:12.341 ServerApp]     http://127.0.0.1:8888/lab?token=19e9c1op7d370488efe7d433e307a1fcfb9ab92d8838f
```

6. Once that is done, you will be redirected to jupyter lab
7. Now you are all set to experiment with spark.

## First program using pyspark

1. Create a new notebook
2. Use the following code snippet to create a spark session which is the entry point of our application.

```
from pyspark.sql import SparkSession
spark = SparkSession.builder.appName("my demo app").master("local[*]").getOrCreate()
```

3. Now we have our spark session available, we can play with spark's dataframe API. Let's create a small csv file named `dog_list.csv` having following content:

```
id,Dog Names
1,dog1
2,dog2
3,dog3
```

4. Drag and drop the `dog_list.csv` file in the jupyter lab file browser.
5. Add the following code snipper to read the csv file

```
df = spark.read.csv("dog_list.csv")
df.show()
```

The above code snippet will display the dataframe.

## Next steps

By following the steps outlined above, you should now have Spark up and running on your local machine, providing you with a powerful tool for data exploration. While Spark is designed to work in a distributed environment to achieve maximum parallelization, having a local installation can be incredibly useful for learning and gaining a solid understanding of Spark's APIs. By experimenting with Spark on your local machine, you can gain valuable insights into how it works and develop a foundation for more complex distributed processing scenarios.

## Conclusion

In conclusion, Docker provides a convenient way to set up Spark on a local machine, making it easier to get started with development. In future blog posts, we will delve deeper into Spark's structured APIs and explore core concepts related to Apache Spark. Stay tuned for more exciting insights into the world of Spark development!

## Reference:

1. https://hub.docker.com/r/jupyter/pyspark-notebook
