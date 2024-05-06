+++
author = "Vasav"
categories = ["sql"]
date = "2024-05-06"
description = "Setting up PostgreSQL using docker"
featuredpath = "date"
linktitle = ""
title = "PostgreSQL docker"
type = "post"
+++

## Introduction
PostgreSQL stands out as one of the top choices among open-source relational databases in today's market. As a data engineer, SQL is a language I constantly engage with. Whether it's crafting quick prototypes using Streamlit or whipping up dashboards with tools like Metabase or Apache Superset, having a local database to load datasets is essential.

In this article, I'll guide you through setting up PostgreSQL on your local machine using Docker. Docker proves invaluable, particularly when exploring various open-source tools locally to gain hands-on experience. So, let's jump right into configuring PostgreSQL.

## Prerequisites
Before diving in, make sure you have Docker Desktop installed on your machine, and ensure that the Docker daemon is up and running.

I'll be walking through the steps on a Mac, but fear not! With some slight adjustments, you can follow along on Windows or Linux OS as well.

## Steps to setup postgresql
Open terminal and execute the following commands:
1. `docker pull postgres` - Downloads the latest PostgreSQL Docker image from the Docker Hub repository.
2. `docker volume create postgres_data_volume` - Creates a Docker volume named postgres_data_volume to persistently store PostgreSQL data.
3. ```docker run --name postgres_local_db -e POSTGRES_PASSWORD=P0stGr3s -e POSTGRES_USER=postgres_user -d -p 5432:5432 -v postgres_data_volume:/Users/user/Documents/myDir/postgres/data postgres``` - Runs a Docker container named postgres_local_db with specified environment variables for password and username, exposing PostgreSQL on port 5432, and attaching the created volume for data persistence.
4. Validate the container running using either `docker ps` command or docker desktop.

## Testing the connection
To test the connection, we'll use [DBeaver](https://dbeaver.io/), a powerful database tool. But feel free to use any tool that supports PostgreSQL.

1. Open Dbeaver
2. Click on `Connect to a database` button
3. Select `PostgreSQL`
4. Insert the username and password specified in the `step 3` from above section. 
5. Click on `Test Connection` button on the wizard

With the correct setup, you should be able to connect to the postgres database.

## Next Steps
There are many data sources available to import in the database to start practicing upon SQL on Dbeaver. Here is a suggested article that you can try to get started with it. 

- [IMDB DATASET ON POSTGRES](https://dbastreet.com/?p=1426)

Happy querying!


## References
1. https://www.dbvis.com/thetable/how-to-set-up-postgres-using-docker/
2. https://hub.docker.com/_/postgres
3. https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/
