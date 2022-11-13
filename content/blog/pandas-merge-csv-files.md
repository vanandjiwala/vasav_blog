+++
author = "Vasav"
categories = ["pandas"]
date = "2022-11-13"
description = "Combine multiple csv files in python"
featuredpath = "date"
linktitle = ""
title = "Combine csv files python"
type = "post"
+++


## Combine csv files python

```
import os
import glob
import pandas as pd

path = os.getcwd()
extension = 'csv'

csv_files = glob.glob('*.{}'.format(extension))

df_list = []
for file in csv_files:
    df = pd.read_csv(file)
    df_list.append(df)

pd.concat(df_list).to_csv("combined_file.csv", index=False)

```

**Note:** In order to perform the same with excel, change the value of extension and use ```read_excel``` method instead ```read_csv```.

