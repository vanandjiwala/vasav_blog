+++
author = "Vasav"
categories = ["python","devops"]
date = "2022-07-23"
description = "Docker for python developers"
featuredpath = "date"
linktitle = ""
title = "Docker Tutorial"
type = "post"
+++


## Introduction
Docker is used widely among software development teams across the globe. It has become a norm for software developers to use docker for rapid application development. In this article I will be covering basics of docker, commonly used terms and concepts around docker. I will be doing the steps/commands on macos and python project. But the concepts can be applied to other projects as well.

## Prerequisites
Docker must be installed on your machine. The instructions for the same can be found [here](https://docs.docker.com/engine/install/). For this tutorial we are going to use ```docker desktop```. 

## Why Docker
- Provides consistency
- Provides isolation
- Light weight as compared to VMs
- Helps deploying apps faster
- Good for scaling the application
- Large community

## Virtual Machines(VM) VS. Containers
VMs are around for some time in order to deploy and manage applications. How container are different than VM is covered in this section. 

VM usually emulates a complete system which includes both the hardware and software components. If we want to run 2 apps in isolation then we need to have 2 guest operating systems. Every virtual machine with their own set of operating system is **heavy**. So it becomes tricky to keep adding new application without hitting the performance bottleneck. Below image, shows the basics

![alt text](https://drive.google.com/uc?export=view&id=11fjpqpGq2U_XF7W48wTCywTVoaAmlKGm)

In contrast to the VM, the container only virtualizes the software later. In case of docker, we have a docker daemon running on the host operating system which takes care of all the operations. Docker daemon run the images which contains all the required components to run an application. These running images are called as containers. Container are lightweight as compared to VM. Docker containers share resources with the host operating system. 

![alt text](https://drive.google.com/uc?export=view&id=1rBHYQtjoc-JTk0l1mraT4-8gmOvIBnLV)


## Docker Terminology

### Docker Images
Docker images are executable packages which contains everything to run an application. Docker image typically contains the following:
1. Application
2. Dependancies
3. Env variables
4. Configuration

### Docker Containers:
Container runs the docker images which shares resources with the host os. 

### Docker File:
Docker file is used to build docker images. 

## How it works
As covered in the section above, ```docker deamon``` is a very important element which runs as a background process in the machine which can be a desktop or server. Docker deamon acts as a ```server``` and serves verious client requests. ```Docker CLI``` is the client application which communicates with the server in order to manage the following:

1. Container
2. Image
3. Volume
4. Network

[This article](https://docs.docker.com/get-started/overview/) contains more detailed explaination of the same. 

## Docker Hub
Similar to github, docker hub is a central repository to find various docker images. Most of the popular platforms, os images will be available on docker hub. In order to explore various images for python, navigate to ```https://hub.docker.com/```. On the search, type ```python```, you should be able to see the following webpage. 

![alt text](https://drive.google.com/uc?export=view&id=1UXvNYfQo9gWWAFlXqE_EMgvTkymr6B7c)

## Creating an image and running containers
We will start with an easy use case of running a python script and gradually add more layers to our image. Docker builds images by reading from the docker file. So based on the instructions given in the docker file, an image will be created. After that we are going to run these images as a container. 

### Sceario 1 : Running a python script

First, create a new directory on your machine. Open that directory in your choice of editor. I am using ```vs code```. Now create a python script that we want to run and name it ```sample.py```. Insert the following code in the file.

```
print("Python with docker part 1")
```

We are just printing a single line in this python file. Once this is done, we can run it in the editor to make sure it works fine on the local.

Now we are going to execute this script in a container. In order to do that, we will create a ```dockerfile``` in the same directory. Put the following content in the dockerfile. 

```
FROM python:3.7-slim
WORKDIR /app
COPY . /app
CMD ["python", "sample.py"]
```

Once this is done, use ```docker build -t part1 .``` to build an image. Make sure to have your docker desktop running. 

Now, once the process is completed successfully, you can fire ```docker image ls``` command to verify. ```part1``` should be available in the list.

Now we have our image, ready we can run the container using command ```docker container run part1```. You can verify the result in the console, you will see the print statement that we had in the python script. 

```
% docker container run part1
Python with docker part 1
```

### Sceario 2 : Adding dependancies

To go to the next level, we will add ```pandas``` with the current setup. We will read the file and print the shape of the dataframe. We will make a small change to the dockerfile we created in the last scenario.

Since we want to use python pandas, we are going to use ```RUN``` to install the pandas using ```pip```. 

```
FROM python:3.7-slim
WORKDIR /app
COPY . /app
RUN pip install pandas
CMD ["python", "sample.py"]
```

Once this is done, place a csv in the same directory. It can be any csv file. Once these steps are done, use the following commands:

1. ```docker build -t part2 .```
2. ```docker image ls```
3. ```docker container run part2```

After running the command, you should be able to see the result when you run the container. Here tuple (23,22) is the shape of the dataframe. It will depend on the csv that you used. 

```
% docker container run part2
(23, 22)
```

Note: If you want to add more libraries then you can use ```&&``` to club everthing in a single command. 

Ex:
```
RUN pip install pandas && \
    pip install PyMySQL && \
    pip install fastapi && \
```

### Sceario 3 : Setting a virtual env and running an app

In this section we will create a virtual environment and then setup a sample webapp using docker. We are going to use ```fast api``` for this demo.

Let us start by creating an app which will have one api end point and for that we will use tutorial available on the fast api documentation. 

Follow the [documentation](https://fastapi.tiangolo.com/tutorial/) and test the hello world program on your local machine. 

Now create a requirements.txt file using command ```pip freeze > requirements.txt```. In case you run into any issue, just copy and paste the following content in the requirements.txt file. 

```
anyio==3.6.1
click==8.1.3
fastapi==0.79.0
h11==0.13.0
httptools==0.4.0
idna==3.3
pydantic==1.9.1
python-dotenv==0.20.0
PyYAML==6.0
sniffio==1.2.0
starlette==0.19.1
typing_extensions==4.3.0
uvicorn==0.18.2
uvloop==0.16.0
watchfiles==0.16.0
websockets==10.3
```

Now it's time to create a docker file.

```
FROM python:3.7-slim

WORKDIR /app

ENV VIRTUAL_ENV=/opt/venv
RUN python -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY . /app

RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Once this is done then fire the following set of commands:

1. ```docker build -t part3 .```
2. ```docker image ls```
3. ```docker container run -d -p 8000:8000 part3```


Once this is done, you can navigate to your web browser and check ```localhost:8000```. You should be able to get the hello world response based on the example we created. 

```
{"message":"Hello World"}
```


### References docker file commands

| Command | Description                                                                                                         |
|---------|---------------------------------------------------------------------------------------------------------------------|
| FROM    | This command will be used to define the base image. By default the base image is obtained from dockerhub repository |
| WORKDIR | Defines working dir for subsequent sections                                                                         |
| COPY    | This will copy file from local to the docker container                                                              |
| CMD     | Command to be executed - running the script/app in our case. Single entry in a file                                 |
| RUN     | Execute command - bash/system updates/lib install etc. Can be multiple enteries in a file                           |                                                          |
## Conclusion
I have tried to cover basics around docker with python in this article. Based on the use case, the flow or commands can be altered to serve your needs. I will try to keep adding new things around docker as I learn it.

## References
1. [https://www.docker.com/resources/what-container/](https://www.docker.com/resources/what-container/)
2. [https://geekflare.com/docker-vs-virtual-machine/](https://geekflare.com/docker-vs-virtual-machine/)
3. [https://dev.to/aws-builders/understanding-the-dockerfile-format-3cc6](https://dev.to/aws-builders/understanding-the-dockerfile-format-3cc6)
4. [https://devhints.io/docker](https://devhints.io/docker)
5. [https://pythonspeed.com/articles/activate-virtualenv-dockerfile/](https://pythonspeed.com/articles/activate-virtualenv-dockerfile/)