+++
author = "Vasav"
categories = ["spark","python"]
date = "2022-12-29"
description = "Tips and tricks for using databricks platform"
featuredpath = "date"
linktitle = ""
title = "Databricks Notes"
type = "post"
+++


## Using external files in databricks community edition
In this section, I am going to provide information on how to add external files in databricks community edition and then use these files in notebooks. For the demo, we are going to use [Auto-mpg dataset](https://www.kaggle.com/datasets/uciml/autompg-dataset?resource=download)](https://www.kaggle.com/datasets/uciml/autompg-dataset?resource=download). 

1. Download the Auto-mpg dataset dataset from Kaggle. 
2. The donwloaded file will be a zip file so extract it to obtain ```auto_mpg.csv```.
3. Log in to [databricks community edition](https://community.cloud.databricks.com/).
4. After login, click on the **Data** section from the left side navigation bar.
5. In the sub menu, click on the **Create Table** button. 

![alt text](https://drive.google.com/uc?export=view&id=1LH_p0soQk-9klk_EPziwpZ7F-C6VyS2x)

6. You will be navigated to **Create New Table** UI.

![alt text](https://drive.google.com/uc?export=view&id=1n6U2R-QpTWH2FbJqxNt06G2VK_-bjcoH)

7. Insert the directory name and then upload the file(s) that needs to be uploaded. 

![alt text](https://drive.google.com/uc?export=view&id=1oowJn5cmwiCOTJ1dYNkVGx6gewGThqz_)

8. Navigate to a notebook and use the code snippet below to use the uploaded file. 

```
df = spark.read.format("csv").option("header", True).load("/FileStore/tables/auto-mpg/auto_mpg.csv")

display(df)
```

The above command will create a dataframe from the file we uploaded.
