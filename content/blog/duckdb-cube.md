+++
author = "Vasav"
categories = ["sql","data-analysis"]
date = "2022-07-23"
description = "Using local duckdb instance with cube js"
featuredpath = "date"
linktitle = ""
title = "Cube js with duckdb"
type = "post"
+++

## Introduction
In this article, I am going to walk you through the process of using duckdb local instance with cube js. For smaller data sets, cube js sementic layer can be employed to drive any supported BI tool. A general workflow would be using excel files to load data in duckdb and using that data with a BI tool can add a lot of value for a small data team. 

## Prerequisites
- Docker must be installed on your machine. The instructions for the same can be found [here](https://docs.docker.com/engine/install/). For this tutorial we are going to use ```docker desktop```.
- Python must be installed on you machine. 
- Create a virtual environment using the command `python3 -m venv venv-cube`.
- Activate virtual environment using the command `sournce venv-cube/bin/activate`.
- Install the required libraries using the command `pip install duckdb pandas`.
- Download a sample dataset from kaggle.

## Setting up a database and docker volume
- Create a directory which we are going to use to mount with the docker container. 

```
cd /Users/user/Documents/Experiments/
mkdir -p my-first-cube-project/cube/conf/model
pwd
```
- Copy the path from the terminal. 
- We are going to use the dataset we downloaded and setup a database which will be used with cube js. 
- Use the following python script to create a duckdb database file. Make sure to change paths and file names based on the dataset downloaded. 
```
import duckdb

con = duckdb.connect(database = "/Users/user/Documents/Experiments/my-first-cube-project/cube/conf/my-cubejs-db.duckdb")
con.execute(f"""
CREATE TABLE my-cubejs-table AS
    SELECT *
    FROM read_csv('my-file.csv');
""")
```
- Navigate to the root of the project to directory - `my-first-cube-project`
- Create a `docker-compose.yml` file with the following content
```
services:
  cube:
    image: cubejs/cube:latest
    ports:
      - 4000:4000
      - 15432:15432
    environment:
      CUBEJS_DEV_MODE: 'true'
      CUBEJS_DB_TYPE: 'duckdb'
      CUBEJS_DB_DUCKDB_DATABASE_PATH: '/cube/conf/my-cubejs-db.duckdb'
    volumes:
      - /Users/user/Documents/Experiments/my-first-cube-project/cube/conf/:/cube/conf
```

#### image: cubejs/cube:latest

This specifies the Docker image that will be used to create the container. The cubejs/cube:latest refers to the latest version of the Cube.js image available on Docker Hub. Cube.js is an open-source analytics API platform.

#### ports

This section maps the container's internal ports to your host machine, allowing you to access the service from outside the container.

1. 4000:4000: Maps port 4000 on the container to port 4000 on the host machine. This is typically where Cube.js serves its API or frontend.
2. 15432:15432: Maps port 15432 on the container to port 15432 on the host machine. This might be used for a database connection or similar service that Cube.js provides.

#### environment
This section defines environment variables that will be available within the container. These variables are crucial for configuring the behavior of the Cube.js service.
1. CUBEJS_DEV_MODE: 'true': This sets Cube.js to run in development mode, enabling features that are useful during development, like auto-reloading.
2. CUBEJS_DB_TYPE: 'duckdb': This tells Cube.js to use DuckDB based on the documentation.
3. CUBEJS_DB_DUCKDB_DATABASE_PATH: '/cube/conf/my-cubejs-db.duckdb': This specifies the path within the container where the DuckDB database file will be stored.

#### volumes

Volumes allow you to mount directories from your host machine into the container, providing persistent storage or configuration.
- `/Users/user/Documents/Experiments/my-first-cube-project/cube/conf/:/cube/conf`: This mounts the local directory /Users/user/Documents/Experiments/my-first-cube-project/cube/conf/ on your host machine to the /cube/conf directory inside the container. This is where the configuration files or the database for Cube.js will be stored. It allows data to persist even when the container is stopped and restarted.

## Starting the docker container
1. Use `docker compose up -d` to start the service.
2. Under `Data Model` navigation, under `Tables` section we can see the duckdb table created.

## Next steps
This will allow you to explore duckdb and cube js along with any open source BI tool for building a quick prototype or a small data system on your own. 

## References
1. [Getting started with Cube Core](https://cube.dev/docs/product/getting-started/core)
2. [DuckDB / MotherDuck](https://cube.dev/docs/product/configuration/data-sources/duckdb)