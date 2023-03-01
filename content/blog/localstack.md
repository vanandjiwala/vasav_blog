+++
author = "Vasav"
categories = ["aws","ETL"]
date = "2023-03-01"
description = "AWS On Local Machine !!"
featuredpath = "date"
linktitle = ""
title = "How to Set Up and Test AWS S3 on a Windows Machine using LocalStack"
type = "post"
+++

## Introduction

S3 (Simple Storage Service) is one of the most widely used cloud storage solutions, allowing users to store and retrieve large amounts of data with high durability and availability. Setting up S3 while learning ETLs can be a bit challenging and can also be a costly as well as time-consuming. In order to overcome this issue, we have **LocalStack** - an open source tool which can mimic amazon cloud services on your local machine. 

In this section, I will be restricting myself to S3 only. In future, I am planning to experiment this with pyspark. If that works then it can help practice spark locally without worrying about higher cost associated with cloud computing and storage. We will cover everything from installing LocalStack and configuring the AWS CLI to creating an S3 bucket on LocalStack and uploading and downloading objects.

## Setting up Localstack 

There are 2 ways to achieve this. I am going to cover both the approaches. I recommend taking the 2nd option as it is more convenient and easy to use. 

### Manual Process

1. Install docker desktop
2. Start docker desktop application (Required to run localstack)
3. Create a virtual env using command `python -m venv analytics-project-venv`
4. Activate virtual environment using command `analytics-project-venv\Scripts\activate`
5. Install localstack using command `pip install localstack`.  
6. Start localstack using command `localstack start`

This will start the `localstack` container. 

### Using docker-compose.yml file

1. Create a directory.
2. Open the directory in VS code. 
3. Create a file `docker-compose.yml` and put the following content inside the file
```
version: '3.1'


services:


  localstack:
    image: localstack/localstack:latest
    container_name: local-aws
    environment:
      - AWS_DEFAULT_REGION=us-east-1
      - EDGE_PORT=4566
      - SERVICES=lambda,s3
    ports:
      - '4566-4583:4566-4583'
    volumes:
      - "${TEMPDIR:-/var/lib/localstack}:/var/lib/localstack"
      - "/var/run/docker.sock:/var/run/docker.sock"
```
4. In the file, based on the desired services modify the value under `environment > SERVICES` section.
5. All available services can be obtained from this [link](https://docs.localstack.cloud/user-guide/aws/feature-coverage/).
6. Use command ```docker-compose up``` to start the service.


This will start the `local-aws` container.

## Testing LocalStack:
Navigate to url - `http://localhost:4566/health` from a web browser. Depending on the services selected, you should be able to see a response provided below:
```
{"features": {"initScripts": "initialized"}, "services": {"acm": "available", "apigateway": "available", "cloudformation": "available", "cloudwatch": "available", "config": "available", "dynamodb": "available", "dynamodbstreams": "available", "ec2": "available", "es": "available", "events": "available", "firehose": "available", "iam": "available", "kinesis": "available", "kms": "available", "lambda": "available", "logs": "available", "opensearch": "available", "redshift": "available", "resource-groups": "available", "resourcegroupstaggingapi": "available", "route53": "available", "route53resolver": "available", "s3": "running", "s3control": "available", "secretsmanager": "available", "ses": "available", "sns": "available", "sqs": "available", "ssm": "available", "stepfunctions": "available", "sts": "available", "support": "available", "swf": "available", "transcribe": "available"}, "version": "1.4.1.dev"}
```

## Setting up aws cli
1. Install aws cli by following the instructions provided in the official documentation (https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. Configure aws cli using the following commands:
```
aws configure
```
```
AWS Access Key ID [None]:test
AWS Secret Access Key [None]: test
Default region name [None]:us-east-1
Default output format [None]: json
```
Make sure to use the same value displayed above as they are specific to local host. If you are working with AWS, then create an additional profile for using localstack. 

## Working with localstack

1. We need to create a bucket to start. So first step is to create a bucket. Use the following command to create a bucket (We are using aws cli commands so if you have worked with it then the only difference being the --endpoint).

```
aws --endpoint-url=http://localhost:4566 s3 mb s3://data-sources
aws --endpoint-url=http://localhost:4566 s3 mb s3:/processed-data
```

2. Let's list the buckets we just created.

```
aws --endpoint-url=http://localhost:4566 s3 ls
```

3. The next step is to upload a file to make sure it works as expected.

```
aws --endpoint-url=http://localhost:4566 s3 cp C:\Users\vasav\Downloads\sample.png s3://data-sources
```

4. Verify the file in the bucket ```data-sources```. 
```
aws --endpoint-url=http://localhost:4566 s3 ls s3://data-sources/
```
## Conclusion
In this blog, we saw how can we interact with s3 which is setup on a local machine. Going forward, I will create a simple ETL and a data pipeline to process raw data from s3 and insert it in a database. I have listed down resources I referred to while creating this blog post which you can refer to get more details. 


## References:
1. https://onexlab-io.medium.com/localstack-s3-e28ad393c09
2. https://docs.localstack.cloud/user-guide/aws/s3/