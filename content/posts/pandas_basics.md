---
author: ["Vasav Anandjiwala"]
title: "Pandas using jupyter notebook"
date: "2023-10-30"
description: "Basics of python pandas to get started with the library and jupyter notebook"
summary: "Pandas using jupyter notebook"
tags: ["Pandas"]
categories: ["Pandas"]
series: ["Pandas"]
cover:
  image: images/pandas-python.webp
ShowToc: true
TocOpen: true
social:
fediverse_creator: "@vanandjiwala@mastodon.social"
---

# Pandas using jupyter notebook

### Prerequisites and basic setup

1. [Install anaconda on your machine](https://problemsolvingwithpython.com/01-Orientation/01.03-Installing-Anaconda-on-Windows/)
2. Open command prompt
3. Navigate to your desired directory
4. use command `jupyter notebook` to start the server
5. In a web browser, hit `http://localhost:8888/` url to access jupyter notebook

---

### Import statements

1. Import `pandas` and `numpy` to get started with basic data analysis

```
import numpy as np
import pandas as pd
```

2. Import data visualization libraries

```
import matplotlib.pyplot as plt
import seaborn as sns
%matplotlib inline
```

3. Import a csv file as a dataframe

```
df = pd.read_csv('file.csv')
df = pd.read_csv('/path/file.csv')
```

4. Get [data types and other information about the dataframe](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.info.html)

```
df.info()
```

5. [View few initial rows from a dataframe](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.head.html)

```
df.head()
df.head(5) #returns top 5 rows
```

6. [Obtain value count for a column/series](https://www.geeksforgeeks.org/python-pandas-series-value_counts/)

```
df['column name'].value_counts()
df['column name'].value_counts().head(5) #gives top 5 values with max counts
```

7. Find unique count in a series. There are 2 ways to achieve this. One way is to use len method and other is to use nunique method.

```
count = len(df['column name'].unique())
count = df['column name'].nunique()
```

8. Create a new column of an existing column using lambda expression

```
# assume we have data as reason: text and we want to obtain reason from existing col.
df['new col'] = df['exising col'].apply(lambda x: x.split(':')[0])
df['new col'] #print the new column
```

---

### Data Visualization

[seaborn cheat sheet](https://www.datacamp.com/community/blog/seaborn-cheat-sheet-python)
