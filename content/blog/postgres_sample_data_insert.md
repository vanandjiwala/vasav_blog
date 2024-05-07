
+++
author = "Vasav"
categories = ["sql"]
date = "2024-05-06"
description = "Setting up PostgreSQL for analytics"
featuredpath = "date"
linktitle = ""
title = "Setting a sample database on PostgreSQL"
type = "post"
+++

## Introduction
## Introduction

In our previous article, we set up PostgreSQL on our local machine. Now, we're diving into the exciting task of inserting sample cricket data, which will be instrumental in crafting a dynamic dashboard. The setup process is designed to be straightforward, ensuring everyone can follow along easily. The dataset spans from the inaugural edition of the IPL to the most recent one.

I've made sure to provide the ETL files and process for your convenience, making it accessible for anyone to replicate. Although the ETL process is currently manual, our goal is to automate the entire workflow in the near future.

All raw csv files and data can be found on my [github repo](https://github.com/vanandjiwala/python_notebooks/tree/main/duckdb). 

## Setup DB tables
Based on yesterday's blog, we are going to create a couple of tables. 
1. cricket_match_fact - table contains all the ball by ball information from the cricket matches
2. cricket_match_info - table contains information on match, winner, looser, umpire etc. 

### DDLs

```
CREATE TABLE cricket_match_fact (
    season VARCHAR(255),
    event_match_number VARCHAR(255),
    date DATE,
    team VARCHAR(255),
    power_play VARCHAR(255),
    over INT,
    batter VARCHAR(255),
    bowler VARCHAR(255),
    non_striker VARCHAR(255),
    batter_runs INT,
    extra_runs INT,
    total_runs INT,
    over_ball_no INT,
    over_ball_no_str VARCHAR(255),
    extra_desc VARCHAR(255),
    wicket_kind VARCHAR(255),
    player_out VARCHAR(255),
    wicket_fielders VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) DEFAULT 'system'
);
```

```
CREATE TABLE cricket_match_info (
    event_match_number         VARCHAR(255) NOT NULL,
    date                       DATE NOT NULL,
    event_name                 VARCHAR(255) NOT NULL,
    season                     VARCHAR(255) NOT NULL,
    team_type                  VARCHAR(255) NOT NULL,
    gender                     VARCHAR(255) NOT NULL,
    match_type                 VARCHAR(255) NOT NULL,
    overs                      INT NOT NULL,
    balls_per_over             INT NOT NULL,
    Team1                      VARCHAR(255) NOT NULL,
    Team2                      VARCHAR(255) NOT NULL,
    toss_decision              VARCHAR(255) NOT NULL,
    toss_winner                VARCHAR(255) NOT NULL,
    venue                      VARCHAR(255) NOT NULL,
    city                       VARCHAR(255),
    outcome_type               VARCHAR(255),
    outcome_by_wickets         FLOAT,
    outcome_by_runs            FLOAT,
    outcome_winner             VARCHAR(255),
    outcome_method             VARCHAR(255),
    outcome_result             VARCHAR(255),
    player_of_match            VARCHAR(255) NOT NULL,
    Umpire1                    VARCHAR(255) NOT NULL,
    Umpire2                    VARCHAR(255) NOT NULL,
    officials_match_referees   VARCHAR(255) NOT NULL,
    officials_reserve_umpires  VARCHAR(255),
    officials_tv_umpires       VARCHAR(255) NOT null,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255) DEFAULT 'system'
);
```

From DBeaver, select the desired database and then execute the above statements which will create 2 tables for you. You can use any other SQL tool of your choice as well.


### How to Insert Data

Currently, I'm taking a manual approach to insert data, but I plan to automate this process in the future. Here's how you can insert data for now:

1. Right-click on the table, then select "Import".
2. Choose the CSV option.
3. Select the default settings and choose the file provided in my GitHub repository.
4. Once the wizard is complete, the data will be available in the database.

## Next Steps:

1. Analyze the data using SQL.
2. Prepare the dashboard.

By following these steps, you'll quickly get your data into the system and be ready to analyze it further. Stay tuned for more updates on automating this process!

