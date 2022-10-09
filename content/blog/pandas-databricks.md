+++
author = "Vasav"
categories = ["pandas"]
date = "2022-10-09"
description = "Workaround to read csv from DBFS using pandas"
featuredpath = "date"
linktitle = ""
title = "Create Pandas Dataframe on Databricks"
type = "post"
+++

## Introduction
I had some issue reading a csv directly on the databricks community edition. So after going through some articles, I finally found the workaround. Databricks has disabled to use csv directly for pandas as you may encounter ```
FileNotFoundError: [Errno 2] No such file or directory:```.

___

## Workaround

You need to copy the file from ```dbfs``` to a ```temp``` directory and after that you should be able to create a pandas dataframe. Here is a code snippet for the same. 

```
dbutils.fs.cp("/FileStore/tables/games/vgsales.csv", "file:///tmp/vgsales.csv")

pandas_df = pd.read_csv("file:///tmp/vgsales.csv")
```

```cp``` command will copy the file from ```dbfs``` to ```temp``` and then you can leverage pandas on the databricks platform. 

___

## References
1. https://stackoverflow.com/questions/63552922/not-able-to-cat-dbfs-file-in-databricks-community-edition-cluster-filenotfounde