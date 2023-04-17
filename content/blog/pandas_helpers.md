+++
author = "Vasav"
categories = ["pandas", "python"]
date = "2023-04-16"
description = "Some functions which are useful in EDA or other DE efforts."
featuredpath = "date"
linktitle = ""
title = "Pandas Helper Functions"
type = "post"
+++

## Introduction
In this article, I am going to provide few helper functions which can be used for various data engineering tasks. I will keep appending new functions with time.

## Funding a primary key from a dataframe
I use the following function to look for the primary key. This is perticulary useful when you are trying to understand a new datasource and performing EDA.

```
import pandas as pd
import itertools


def find_primary_key(df):
    """
    This function takes a pandas dataframe as input and returns a primary key for the dataframe.
    If the dataframe does not have a unique key, it returns a composite key made up of multiple columns.
    """
    # Check if any column already has unique values
    for col in df.columns:
        if df[col].is_unique:
            return col
    
    # If no single column has unique values, look for a combination of columns that have unique values
    for i in range(2, len(df.columns)+1):
        for combo in itertools.combinations(df.columns, i):
            if df[list(combo)].apply(lambda x: '_'.join(x.astype(str)), axis=1).is_unique:
                return list(combo)
    
    # If no unique key can be found, return None
    return None
```

## Combine files in a directory in a single dataframe
I use this to combine multiple data files into a combined dataframe which can be used further for ETL or analysis. 

```
import os
import pandas as pd

def combine_dataframes(directory_path, file_format):
    df_list = []

    for file_name in os.listdir(directory_path):
        if file_name.endswith(file_format):
            # Read the file into a pandas dataframe
            file_path = os.path.join(directory_path, file_name)
            if file_format == '.csv':
                df = pd.read_csv(file_path)
            elif file_format == '.xlsx':
                df = pd.read_excel(file_path)
            elif file_format == '.parquet':
                df = pd.read_parquet(file_path)
            else:
                raise ValueError(f"Unsupported file format: {file_format}")

            df_list.append(df)

    combined_df = pd.concat(df_list, ignore_index=True)

    return combined_df
```