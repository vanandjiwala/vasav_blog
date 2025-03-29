---
author: ["Vasav Anandjiwala"]
title: "Using S3 to invoke AWS Lambda"
date: "2022-07-19"
description: "Setting up AWS Lambda Function"
summary: "Setting up AWS Lambda Function"
tags: ["AWS"]
categories: ["AWS"]
series: ["AWS"]
cover:
  image: images/aws_cli.svg
ShowToc: true
TocOpen: true
social:
  fediverse_creator: "@vanandjiwala@mastodon.social"
---

## Introduction

Serverless computing has become very popular in recent years. Serverless computing allows teams/organizations to develop an application without worrying about the server. Official AWS documentation describes it as - **Run Code Without Thinking About Servers**. There are many use cases in which serverless computing can be beneficial over the traditional approach. If done in the right way, it can also help small teams save money on infrastructure.

In this article, I am going to provide basic tutorial on how to setup a lambda function on AWS and add python dependancies as well. To understand the basics of lambda function, please refer to [this](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/begin) link.

## Use case

In this article, we are going to have a simple use case. We want to execute the lambda function when a file is uploaded to S3, then process it using python `pandas` and then store it back to another S3 bucket.

This is a fairly easy scenario but the same concept can be applied to perform various actions like pushing data to DB, sending alerts etc.

## Prerequisite

You should have an AWS account and know python basics to follow this tutorial.

In addition to that, for our use case, we need to create a role with the following policies:

1. AmazonS3ReadOnlyAccess
2. AWSLambdaBasicExecutionRole
3. S3 Put policy (This is not readily available, follow [this youtube](https://www.youtube.com/watch?v=vXiZO1c5Sk0) video to do that.) - This is required to save processed file on S3, if you just want to read file, you can choose not to do this step.

## Developing a lambda function

There are 2 ways to develop a lambda function.

1. Using AWS console/editor
2. Using `SAM`(Serverless Application Model) to develop it on a local machine

In this article we are going to focus on the 1st approach which is easy but for more complex scenarios not an ideal option. The 2nd approach will allow more flexibility as we can develop and test the lambda function locally as well as `SAM` will take care of dependancies as well as deployment.

## Steps to create a lambda function for our use case

1. Create a lambda function which processes a file.
2. Add dependancies (A Layer in the context of lambda function)
3. Process data
4. Create a trigger to invoke lambda function when a file is uploaded in S3.

## Step 1 - Create a lambda function which processes a file:

After loggin in the AWS, search for `lambda` in the top search bar in the AWS console. This will redirect you the `lambda` dashboard. The dashboard contains various stats related to AWS lambda.

From the left menu, click on the `Functions` link to see all the lambda functions associated with the account. On the right hand side, there is a `Create function` button. Click on that button.

We have few options here to get started:

1. Author from Scratch
2. Use blueprint
3. Use Container
4. Browse Serverless App Repository

We are going to create a lambda function from scratch. Here are the required fileds and put values as I have mentioned below:

```
Function Name = My-Test-Function
Runtime = Python 3.8
Architecture = x86_64
Permissions = Use the role created from the Prerequisite section
```

## Step 2 - Add dependancies:

There are multiple ways of doing this but I am going to provide the easiest way here. For the sack of understanding, I am providing details on both the approaches. Let's call them manual process and automated process.

1. Manual Process: This is a bit lengthy process. First thing to notice for this process is the architecture that we selected in **Step1** - `x86_64` and the second thing is **runtime** - `python 3.8` in our case. Here are the steps that needs to be executed to include `pandas`.

- Naviagete to pandas [download page](https://pypi.org/project/pandas/1.3.4/).
- Click on the `Download Files` option present on the left side of the page.
- Now download using this option `pandas-1.3.4-cp38-cp38-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (11.5 MB view hashes)`. Notice the architecture `x86_64` and `cp38` which represents the run time.
- Create a directory named `python`.
- Extract `whl` file, copy the content of the directory to python directory we created in the above step.
- Compress the `python` directory to zip and you are all set.

2. Automated process: This is an easier process. It does identical steps but in an automated way. For this you need docker as the script I am going to use us is using docker. If you do not have docker then use [these steps](https://docs.docker.com/engine/install/) to download and setup docker.

- Script we are going to use can be downloaded from [this](https://gist.github.com/qtangs/69e0db74313e8b97708b88f9a7db9bfb) location.
- Article associated with this link can be found [here](https://medium.com/@qtangs/creating-new-aws-lambda-layer-for-python-pandas-library-348b126e9f3e).
- Create a `requirements.txt` file and mention all the packages required there.

```
pandas==1.3.4
```

- Create a shell script `get_layer_packages` with content provided in the above link. Modify the shell script based on the desired python version.
- Fire the following command (make sure to start docker before this):

```
chmod +x get_layer_packages.sh
./get_layer_packages.sh
```

- A new python folder will be generated in the same directory.
- Create a zip file of that directory and you are all set.

Once we have zip ready then it's time to create a layer. So every dependency should included as a layer. Important thing to note here is there is a [size limit of 250MB](https://aws.amazon.com/blogs/compute/working-with-lambda-layers-and-extensions-in-container-images/#:~:text=You%20can%20include%20up%20to,AWS%20accounts%2C%20or%20shared%20publicly.) and one lambda function can not have more then 5 layers at a time.

Here are the steps to create a layer:

1. Click on the layer from the left menu
2. Provice the following details

```
Name = pandas-layer
description = pandas,numpy
[X] upload a zip file
[X] x86_64
compatible runtimes = python 3.8
```

3. Click on Create button.

Now, we have our layer ready. So we are going to include that layer in the lambda function. Here are the steps to include a layer in the lambda function.

1. Navigate to the created lambda function
2. Select the `code` (Default option when we navigate to lambda function) and scroll to the bottom of the page, you will see the `layers` section.
3. Click on `add layer` button present on the right side of the screen.
4. Select `custom layer` to add the layer we just created.
5. Under the section, `custom layers`, choose the layer `pandas-layer` and select the version (For new layer there will be 1 version).
6. Click on `add` button.
7. Verify the layer added from the UI or from the `layers` section.

## Step 3 - Process data

In this section, we can write the actual script in the editor based on the use case. In our case, we can keep it really simple by just filtering few records and then storing that file back in the S3.

```
import json
import pandas as pd
import boto3
import io
import pymysql

def lambda_handler(event, context):
    client = boto3.client('s3')
    spurce_bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    obj = client.get_object(Bucket=spurce_bucket, Key=key)
    data = obj['Body'].read()
    df = pd.read_excel(io.BytesIO(data), engine='xlrd')
    df = df[df['col'] == 1].copy()
    s3_client = boto3.client('s3')
    with io.StringIO() as csv_buffer:
        result_df.to_csv(csv_buffer, index=False)
        response = s3_client.put_object(
            Bucket='dest-bucket', Key="Processed_file.csv", Body=csv_buffer.getvalue()
        )
    return response
```

The code here is fairly easy to understand. We are reading an excel file and filtering `col` for val `1`. The we are saving the file to the desired location on some other location on S3.

**Note :** Do not use the same bucket for triggering the lambda and saving the file or use proper filters while creating the trigger else the lambda function will be triggered in an infinite loop.

The interesting part here is the `event`. In our case, we are going to trigger the lambda function on `PUT OBJECT` event on S3. So in order to test the above function, we can simulate the trigger. From the UI, navigate to the test section. Provide a name for the `Event` and under the `template` - select `S3 PUT` as shown in the screenshot.

![alt text](https://drive.google.com/uc?export=view&id=1ox1naj0zE1VTfaW4fpvIxkYUr3BE96zC)

Now in the Even Json, alter the values as shown below:

```
"s3": {
"s3SchemaVersion": "1.0",
"configurationId": "testConfigRule",
"bucket": {
    "name": "Input-Bucket",
    "ownerIdentity": {
    "principalId": "EXAMPLE"
    },
    "arn": "arn:aws:s3:::example-bucket"
},
"object": {
    "key": "test.xls",
    "size": 1024,
    "eTag": "0123456789abcdef0123456789abcdef",
    "sequencer": "0A1B2C3D4E5F678901"
}
```

Now we have our lambda function, mock trigger event ready. So upload the file `test.xls` in the above mentioned bucket through `UI` or `AWS CLI`. Once that is done, in the lambda test section, click on the test button with the `event` we just created. You should be able to see the output file in the bucket specified in the code.

## Step 4 - Create Trigger

Now it's time to create an actual trigger to invoke the lambda function. On the UI, you can find a button on the left side `+ Add trigger`. Click on that and you will see the screen as shown below.

![alt text](https://drive.google.com/uc?export=view&id=1JSfL6HeW-Ob_0U-GI2iut2XCr0pBbgN7)

Insert the desired information in the trigger.

1. Select a trigger -> S3 in our case
2. Bucket -> Where file put will happen
3. Prefix -> If you want some specific file prefix to trigger the event.
4. Suffix -> If you want some specific file type to trigger the event.

Once this is done,you are all set. Just upload a file to S3 and you will see the lambda function triggered from the `monitor` section on `UI`.

## Next Steps

Next step is to use SAM to setup the same program on the local machine and then deploy it on AWS. This will be covered in the next blog on `AWS lambda series`.

## References:

1. https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/begin
2. https://medium.com/@qtangs/creating-new-aws-lambda-layer-for-python-pandas-library-348b126e9f3e
3. https://gist.github.com/qtangs/69e0db74313e8b97708b88f9a7db9bfb
4. https://stackoverflow.com/questions/34749806/using-moviepy-scipy-and-numpy-in-amazon-lambda
5. https://www.youtube.com/watch?v=vXiZO1c5Sk0
