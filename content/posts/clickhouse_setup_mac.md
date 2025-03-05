---
author: ["Vasav Anandjiwala"]
title: "Setup Clickhouse on Mac"
date: "2024-07-28"
description: "Setup datawarehouse on local machine for development and testing"
summary: "Setup datawarehouse on local machine for development and testing"
tags: ["data engineering"]
categories: ["data engineering"]
series: ["data engineering"]
cover:
  image: images/clickhouse.png
ShowToc: true
TocOpen: true
social:
fediverse_creator: "@vanandjiwala@mastodon.social"
---

## Introduction

In this article, we are going to look into setting up a datawarehouse(Clickhouse). This is perticularly useful for someone who is getting started with analytics,data engineering or sql. Clickhouse has good documentation and it also provides some sample datasets to explore the datawarehouse. I am going to cover the following in this article:

1. Setting up Clickhouse using docker
2. Create a connection with Clickhouse local instance using DBeaver
3. Loading a sample dataset

## prerequisite

- You should have docker desktop setup on your machine.
- Docker daemon should be up and running.
- DBeaver should be installed on your machine.

## Steps to setup Clickhouse

1. `docker pull clickhouse/clickhouse-server` -
   Download the ClickHouse server Docker image from the repository.
2. `mkdir ~/Documents/<User>/Volumes/clickhouse` - Create a directory in your Documents folder to store ClickHouse data and logs.
3. `cd ~/Documents/<User>/Volumes/clickhouse` - Navigate to the newly created directory.
4. `mkdir -p clickhouse_data` - Make a subdirectory to store ClickHouse data files.
5. `mkdir -p clickhouse_logs` - Make another subdirectory to store ClickHouse log files.
6. `docker run -d -v /Users/<user>/Documents/Experiment/clickhouse/clickhouse_data:/var/lib/clickhouse -v /Users/<user>/Documents/Experiment/clickhouse/clickhouse_logs:/var/log/clickhouse-server -p 8123:8123 -p 9000:9000 --name clickhouse-server --ulimit nofile=262144:262144 clickhouse/clickhouse-server` - Run the ClickHouse server in a Docker container, mapping your data and log directories to the container, and setting the necessary ports and file limits.
7. `docker ps` - Validate if the container is running.

## Establish Connection in DBeaver

- Open DBeaver and Create a new connection:
  - Click on `Database > New Database Connection`.
  - Select `ClickHouse` from the list of available database drivers.
  - Click `Next`.
- Configure the Connection:
  - Click on connect by `URL` option and provide `jdbc:clickhouse://localhost:8123/default` in the input
  - database: `default`
  - user: `default`
  - password: We have not provided it so leave it blank. This is for local development and testing. Not meant for production setup.
- Test the Connection:
  - Click on Test Connection to ensure that the connection to the ClickHouse server is successful.
  - If the connection is successful, click Finish to save the connection.

## Setup Sample Data

- For importing the data, change the `socket_timeout` property under `driver properties` in dbeaver. It is available under `edit connection` menu. Set the value to `300000` to make sure import works as expected.

We are going to import `NYC taxi data` and it is [documented](https://clickhouse.com/docs/en/getting-started/example-datasets/nyc-taxi) on the official site as well.

- Create a new sql script on DBeaver and use the following commands in the same order as below:

```
CREATE TABLE trips (
    trip_id             UInt32,
    pickup_datetime     DateTime,
    dropoff_datetime    DateTime,
    pickup_longitude    Nullable(Float64),
    pickup_latitude     Nullable(Float64),
    dropoff_longitude   Nullable(Float64),
    dropoff_latitude    Nullable(Float64),
    passenger_count     UInt8,
    trip_distance       Float32,
    fare_amount         Float32,
    extra               Float32,
    tip_amount          Float32,
    tolls_amount        Float32,
    total_amount        Float32,
    payment_type        Enum('CSH' = 1, 'CRE' = 2, 'NOC' = 3, 'DIS' = 4, 'UNK' = 5),
    pickup_ntaname      LowCardinality(String),
    dropoff_ntaname     LowCardinality(String)
)
ENGINE = MergeTree
PRIMARY KEY (pickup_datetime, dropoff_datetime);
```

```
INSERT INTO trips
SELECT
    trip_id,
    pickup_datetime,
    dropoff_datetime,
    pickup_longitude,
    pickup_latitude,
    dropoff_longitude,
    dropoff_latitude,
    passenger_count,
    trip_distance,
    fare_amount,
    extra,
    tip_amount,
    tolls_amount,
    total_amount,
    payment_type,
    pickup_ntaname,
    dropoff_ntaname
FROM gcs(
    'https://storage.googleapis.com/clickhouse-public-datasets/nyc-taxi/trips_{0..2}.gz',
    'TabSeparatedWithNames'
);
```

Validate the insertion using the following query:

```
SELECT count()
FROM trips;
```

## Next Steps

- You can use this datawarehouse to perform ETL.
- Ingest data from a data lake created on cloud.
- Practice SQL using any avaialble dataset.

I am going to cover few other features as i explore more. Happy learning.

## References:

1. https://clickhouse.com/docs/en/install
2. https://hub.docker.com/r/clickhouse/clickhouse-server/
3. https://clickhouse.com/docs/en/getting-started/example-datasets/nyc-taxi
