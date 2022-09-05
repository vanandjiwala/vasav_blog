+++
author = "Vasav"
categories = ["scala", "spark"]
date = "2022-09-06"
description = "Basics of spark with scala"
featuredpath = "date"
linktitle = ""
title = "scala spark tutorial"
type = "post"
+++

## Introduction
In this article, we will go through the basics of spark with scala. The topics covered are:
1. Databricks community edition
2. Dataframe

## Databricks community edition
Databricks community edition will help you quickly setup the spark environment so it is ideal to start your spark journey. So in this section, I will describe how to setup data for the databricks platform. 

Spark community edition will provide a community optimized instance with around 16GB ram and 2 cores.

First thing is to sign up for databricks community edition.

1. Navigate to url - https://community.cloud.databricks.com/login.html
2. Click on Sign up link. 
3. Complete the registration process and then you are all set to start working on apache spark on databricks platform. 

### UI on databricks
UI on databricks is easy to understand. Not every section will be used especially while learning about apache spark. So in this article, I am going to cover the basics. Refer to the following screenshot for the menu:


![alt text](https://drive.google.com/uc?export=view&id=1IYPRz0iQhnBk15mrBCH32B5DPGh8RLZR)

**Databricks Menu**


1. Create will be used to ```Notebook```, ```Table``` and ```Cluster```.
2. ```Workspace``` will hold all the code/notebooks. 
3. ```Data``` will help you manage the data. 
4. ```Compute``` will be used to create and manage clusters.  

### Creating a cluster

1. Click on ```Compute``` option from the menu. 
2. Click on the ```Create Cluster``` button. 
3. Enter ```Cluster Name```. 
4. Click on ```Create Cluster``` and the cluster is ready to be used. 

### Uploading data
The process can be followed to setup data on the databricks community edition. In the real-world scenario, data will be driven from a datasource like database, AWS S3 etc.

1. naviagate to the  data section. 
2. Click on ```Create New Table``` button. 
3. Under the DBFS Target Directory, provide a name.

![alt text](https://drive.google.com/uc?export=view&id=1yGKS32fdWwNcrUxs6eW8fG-5J28KwGsZ)

**Data Setup**

4. Provide a value under ```DBFS Target Directory```. I have given the value ```Demo1```. This will create a directory under ```FileStore/tables/Demo1```.
5. For the demo, we are using a dataset from kaggle which can be found [here](https://www.kaggle.com/datasets/ruchi798/data-science-job-salaries?resource=download).
6. Download the dataset and extract the file. 
7. Drag and drop the file under the ```Files``` section. 
8. Once you get the green arrow on top of the file uploaded, you  are all set.

### Verifying the upload
1. Create a cluster
2. Create a notebook from workspace
3. In the notebook, use the following command:

```
%fs
ls FileStore/tables/Demo1
```

4. The above command should give you details about the file which we uploaded. 

| path                                         | name            | size  | modificationTime |
|----------------------------------------------|-----------------|-------|------------------|
| dbfs:/FileStore/tables/Demo1/ds_salaries.csv | ds_salaries.csv | 36960 | 1662380553000    |

Now, we are all set to explore apache spark. Feel free to any other dataset. 


## Dataframe
This section, I am going to provide details on spark dataframes. In very simple words, dataframe is collection of rows and columns. The important thing to consider here is that dataframe is a distributed collection which means the data of the dataframe can be present on multiple machines on a cluster. [Here](https://www.databricks.com/blog/2015/02/17/introducing-dataframes-in-spark-for-large-scale-data-science.html) is a blog post by databricks around dataframe to get more understanding on the topic.

**Note:** There are some topics/terms which can be difficult to understand. I will cover the theory around spark in some other post. But for now,you can stick to this article to get basics of how to perform basic spark operations. 

As we are all set with the environment, create a notebook with language ```spark```. 

### Spark Session
Spark session is an entry point in Spark. In the databricks environment it is always available via keyword ```spark```. Type the ```spark``` command in the notebook cell and execute it using any key combination described below.

```(shift + Enter)``` will add a new cell.
```(Ctrl + Enter)``` will have cursor on the same cell. 


```
spark
```

Output

```
res0: org.apache.spark.sql.SparkSession = org.apache.spark.sql.SparkSession@3a80884a
```
This represent that the res0 has type ```SparkSession```.

### Creating a dataframe
Now we will use the csv file that we uploaded to create a new dataframe. 

```
val df_salaries = spark.read.format("csv").load("/FileStore/tables/Demo1/ds_salaries.csv")

val df_salaries1 = spark.read.csv("/FileStore/tables/Demo1/ds_salaries.csv")
```

To breakdown the above statement, we have few things going on here. ```spark``` as mentioned above is the ```spark session```. Now the data source can be read through ```DataFrameReader``` which we are getting by calling the ```read``` method of ```spark session```. The documentation for the same can be found [here](https://spark.apache.org/docs/3.2.1/api/scala/org/apache/spark/sql/SparkSession.html).

We are using 2 different ways of creating a dataframe. From the ```DataFrameReader``` we are  using ```csv``` , ```format``` and ```load``` methods.The documentation for the same can be found [here](https://spark.apache.org/docs/3.2.1/api/scala/org/apache/spark/sql/DataFrameReader.html).

### Displaying the dataframe
In order to check the data, we will use the ```display``` method. 

```
display(df_salaries)
```

|   _c0   |   _c1        |   _c2               |   _c3              |   _c4                         |   _c5     |   _c6              |   _c7            |   _c8                 |   _c9           |   _c10              |   _c11          |
|---------|--------------|---------------------|--------------------|-------------------------------|-----------|--------------------|------------------|-----------------------|-----------------|---------------------|-----------------|
|   null  |   work_year  |   experience_level  |   employment_type  |   job_title                   |   salary  |   salary_currency  |   salary_in_usd  |   employee_residence  |   remote_ratio  |   company_location  |   company_size  |
|   0     |   2020       |   MI                |   FT               |   Data Scientist              |   70000   |   EUR              |   79833          |   DE                  |   0             |   DE                |   L             |
|   1     |   2020       |   SE                |   FT               |   Machine Learning Scientist  |   260000  |   USD              |   260000         |   JP                  |   0             |   JP                |   S             |
|   2     |   2020       |   SE                |   FT               |   Big Data Engineer           |   85000   |   GBP              |   109024         |   GB                  |   50            |   GB                |   M             |
|   3     |   2020       |   MI                |   FT               |   Product Data Analyst        |   20000   |   USD              |   20000          |   HN                  |   0             |   HN                |   S             |
|   4     |   2020       |   SE                |   FT               |   Machine Learning Engineer   |   150000  |   USD              |   150000         |   US                  |   50            |   US                |   L             |


Now if you look at this closely, you can see that the columns names are not considered  while reading the file. In order to change this,we have to use ```option``` while reading the dataframe.

```
val df_salaries = spark.read.format("csv").option("header", true).load("/FileStore/tables/Demo1/ds_salaries.csv")
```

Here, we are telling spark to consider top row as the header. So when we display the dataframe we will have our columns.

|   _c0  |   work_year  |   experience_level  |   employment_type  |   job_title                   |   salary  |   salary_currency  |   salary_in_usd  |   employee_residence  |   remote_ratio  |   company_location  |   company_size  |
|--------|--------------|---------------------|--------------------|-------------------------------|-----------|--------------------|------------------|-----------------------|-----------------|---------------------|-----------------|
|   0    |   2020       |   MI                |   FT               |   Data Scientist              |   70000   |   EUR              |   79833          |   DE                  |   0             |   DE                |   L             |
|   1    |   2020       |   SE                |   FT               |   Machine Learning Scientist  |   260000  |   USD              |   260000         |   JP                  |   0             |   JP                |   S             |
|   2    |   2020       |   SE                |   FT               |   Big Data Engineer           |   85000   |   GBP              |   109024         |   GB                  |   50            |   GB                |   M             |
|   3    |   2020       |   MI                |   FT               |   Product Data Analyst        |   20000   |   USD              |   20000          |   HN                  |   0             |   HN                |   S             |
|   4    |   2020       |   SE                |   FT               |   Machine Learning Engineer   |   150000  |   USD              |   150000         |   US                  |   50            |   US                |   L             |
|   5    |   2020       |   EN                |   FT               |   Data Analyst                |   72000   |   USD              |   72000          |   US                  |   100           |   US                |   L             |

### Database Schema
Schema represnets the column name and data types. It is essential to understand the data before performing transformation operations on the data. ```printschema()``` method is used to get the schema of the dataframe.

```
df_salaries.printSchema()
```

Output:

```
root
 |-- _c0: string (nullable = true)
 |-- work_year: string (nullable = true)
 |-- experience_level: string (nullable = true)
 |-- employment_type: string (nullable = true)
 |-- job_title: string (nullable = true)
 |-- salary: string (nullable = true)
 |-- salary_currency: string (nullable = true)
 |-- salary_in_usd: string (nullable = true)
 |-- employee_residence: string (nullable = true)
 |-- remote_ratio: string (nullable = true)
 |-- company_location: string (nullable = true)
 |-- company_size: string (nullable = true)
```

While creating the datafame, we did not specify the type of columns so spark takes care of the types of those columns. The default value of ```inferSchema``` is ```false``` which is taking all columns as ```String```. But we do not need columns like ```salary``` in ```String```. In order to do so, we have 2 options. 

1. Use inferschema
2. Define schema and assign it to dataframe. 

#### Using Inferschema

We will modify the ```df_salaries``` to use ```inderSchema```.  
```
val df_salaries = spark.read.format("csv").option("header", true).option("inferSchema", true).load("/FileStore/tables/Demo1/ds_salaries.csv")
```

NOTE: Check the available options on [this](https://spark.apache.org/docs/2.0.2/api/java/org/apache/spark/sql/DataFrameReader.html) link.

Now, verify the change in schema using ```df_salaries.printSchema()```.

Output:
```
root
 |-- _c0: integer (nullable = true)
 |-- work_year: integer (nullable = true)
 |-- experience_level: string (nullable = true)
 |-- employment_type: string (nullable = true)
 |-- job_title: string (nullable = true)
 |-- salary: integer (nullable = true)
 |-- salary_currency: string (nullable = true)
 |-- salary_in_usd: integer (nullable = true)
 |-- employee_residence: string (nullable = true)
 |-- remote_ratio: integer (nullable = true)
 |-- company_location: string (nullable = true)
 |-- company_size: string (nullable = true)
```

Now if you observe,the types of several columns have changed from ```String``` to ```integer```. The dataset that we are using is relatively small but in real-world scenario, we need more control over the schema before we transform the data. We will see how to achieve that in the upcoming section. 

#### Specify Schema
In this section, we will see how to assign schema to a dataframe. There are 2 ways we can achieve it.

1. Using DDL

Here we are specifying the DDL string and using it with ```schema``` method.
```
val df_salaries_schema = """
_c0 INT, work_year INT, experience_level STRING,employment_type STRING, job_title STRING, salary LONG, salary_currency STRING, salary_in_usd INT, employee_residence STRING, remote_ratio INT, company_location STRING, company_size STRING                            
""" 

val df_salaries = spark.read.format("csv")
.option("header", true)
.schema(df_salaries_schema)
.load("/FileStore/tables/Demo1/ds_salaries.csv")
```

2. Using structType

```
val structSchema = StructType(
Array(
StructField("_c0",IntegerType,true),
StructField("work_year",IntegerType,true), 
StructField("experience_level",StringType,true), 
StructField("employment_type",StringType,true),
StructField("job_title",StringType,true),
StructField("salary",StringType,true),
StructField("salary_currency",LongType,true), 
StructField("salary_in_usd",IntegerType,true),
StructField("employee_residence",StringType,true),
StructField("remote_ratio",IntegerType,true),
StructField("company_location",StringType,true),
StructField("company_size",StringType,true)
))

val df_salaries = spark.read.format("csv")
.option("header", true)
.schema(structSchema)
.load("/FileStore/tables/Demo1/ds_salaries.csv")
```

Above 2 options to specify the schema will  produce the same result. Any option can be used to specify the schema and both will product the same result. 

**Code to check scema**
```
df_salaries.schema
```


## References
1. https://dbmstutorials.com/pyspark/spark-read-write-dataframe-options.html
2. https://stackoverflow.com/questions/56927329/spark-option-inferschema-vs-header-true
3. https://spark.apache.org/docs/2.0.2/api/java/org/apache/spark/sql/DataFrameReader.html