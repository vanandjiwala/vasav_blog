---
author: ["Vasav Anandjiwala"]
title: "Creating pyspark dataframes using python data structures"
date: "2022-07-25"
description: "Pyspark dataframe basics"
summary: "Pyspark dataframe basics"
tags: ["data engineering"]
categories: ["data engineering"]
series: ["data engineering"]
cover:
  image: images/apache_spark.png
ShowToc: true
TocOpen: true
social:
fediverse_creator: "@vanandjiwala@mastodon.social"
---

## Introduction

In this spark series, I will continue to add more details on the spark dataframe. This post will specifically cover various aspects of dataframe creation. I am going to include how a python datastructure can be converted into a spark dataframe and how to specify the data type/schema associated with the spark dataframe.These series will have more code snippets and less explaination as most of the things are self explanatory.

## Creating Dataframe

```
from pyspark.sql.types import IntegerType, StringType
from pyspark.sql import Row
```

### 1. Creating a dataframe using list

```
list_int = [1,2,3,4]
list_str = ['str1', 'str2', 'str3']
```

```
df_int1 = spark.createDataFrame(list_int)
```

Output:

```
TypeError: Can not infer schema for type:
```

When passing a list to create a dataframe, we must specify the schema/datatype associated with the column. It can be done using the following syntax:

```
df_int1 = spark.createDataFrame(list_int, 'int')
df_int2 = spark.createDataFrame(list_int, IntegerType())
df_str1 = spark.createDataFrame(list_str, 'string')
df_str2 = spark.createDataFrame(list_str, StringType())
```

Here we have imported `IntegerType` from `pyspark.sql.types`.

Use `show` method to display the dataframe. `show` is not a transformation function, it is an action.

```
df_int1.show()
```

Output:

```
+-----+
|value|
+-----+
|    1|
|    2|
|    3|
|    4|
+-----+
```

### 2. Creating a dataframe using list of tuples

```
tuple_list1 = [(1, ), (2, ), (3, ), (4, )]
tuple_list2 = [(1, 'Room1'), (2, 'Room2'), (3, 'Room3'), (4, 'Room4')]
```

In contrast to list, we do not need to explicitely specify the datatype when we use list of tuples.

```
df_tuple1 = spark.createDataFrame(tuple_list1)
df_tuple2 = spark.createDataFrame(tuple_list1, 'room_id int')
df_tuple2 = spark.createDataFrame(tuple_list2, 'id int,desc string')
```

In the above example for the `df_tuple2`, we are specifying the column name `room_df` having type `int`. For `df_tuple3`, we have 2 columns named `id` and `desc` which have `int`and `string` datatype respectively.

When we do not specify the datatype, we will have

### 3. Creating a dataframe using list of lists

This works the same way as list of tuples.

```
list_list1 = [[1,2],[2,2],[1,3]]
df_list1 = spark.createDataFrame(list_list1)
df_list2 = spark.createDataFrame(list_list1, 'col1 int, col2 int')
```

### 4. Creating a dataframe using list of Row

`Row` is a part of `pyspark.sql`. We are going to use the list of tuples and list of list used in the above sections, convert them to list of rows. We can create a dataframe from list of rows.

```
from pyspark.sql import Row

row_list = [Row(*x) for x in tuple_list2]
df_row1 = spark.createDataFrame(row_list)
df_row2 = spark.createDataFrame('id int,desc string')

row_list1 = [Row(*x) for x in list_list1]
df_row3 = spark.createDataFrame(row_list1)
df_row4 = spark.createDataFrame('col1 int,col2 int')
```

### 5. Creating a dataframe using list of dictionaries

```
dict_list = [
    {'col1': 1,'col2':2},{'col1': 3,'col2':4},{'col1': 5,'col2':6},{'col1': 7,'col2':8}
]

df_dict = spark.createDataFrame(dict_list)
```

Another approach is to convert this to a list of rows and create a dataframe.

```
dict_rows_list = [Row(**x) for x in dict_list]
df_dict1 = spark.createDataFrame(dict_rows_list)
df_dict2 = spark.createDataFrame(dict_rows_list,'col1 int,col2 int')
```

Note the `**` here as we are passing kwargs.

## Conclusion

These are some ways of creating a dataframe using python data structures in spark. In future we will see how to read other data sources like csv, DB, AWS S3 etc.
