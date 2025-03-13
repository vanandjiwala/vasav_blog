---
author: ["Vasav Anandjiwala"]
title: "Postgres Cheatsheet for date and time handling"
date: "2025-03-11"
description: "Postgres datetime cheatsheet"
summary: "Postgres datetime cheatsheet"
tags: ["data engineering"]
categories: ["data engineering"]
series: ["data engineering"]
ShowToc: true
TocOpen: true
social:
fediverse_creator: "@vanandjiwala@mastodon.social"
---

Below is a markdown-formatted cheatsheet for handling dates and datetimes in PostgreSQL—covering common syntax and examples for both the SELECT and WHERE clauses.

---

# PostgreSQL Date and Datetime Cheatsheet

## 1. Basic Date & Datetime Data Types

- **DATE:** Stores a calendar date (year, month, day).
- **TIMESTAMP:** Stores both date and time (without time zone).
- **TIMESTAMPTZ:** Stores both date and time with time zone.

---

## 2. SELECT Clause Examples

### Casting a Timestamp to Date

To display only the date part from a timestamp:

```sql
SELECT some_timestamp_column::date AS date_only
FROM your_table;
```

### Formatting Datetime with `to_char`

Customize the output format:

```sql
SELECT to_char(some_timestamp_column, 'YYYY-MM-DD HH24:MI:SS') AS formatted_datetime
FROM your_table;
```

### Extracting Date Parts

You can extract specific parts (year, month, day) using the `EXTRACT` function:

```sql
SELECT
    EXTRACT(YEAR FROM some_date_column) AS year,
    EXTRACT(MONTH FROM some_date_column) AS month,
    EXTRACT(DAY FROM some_date_column) AS day
FROM your_table;
```

---

## 3. WHERE Clause Examples

### Filtering by an Exact Date

When comparing a date column:

```sql
SELECT *
FROM your_table
WHERE some_date_column = '2023-01-01';
```

### Filtering Using BETWEEN

To find dates within a range:

```sql
SELECT *
FROM your_table
WHERE some_date_column BETWEEN '2023-01-01' AND '2023-01-31';
```

### Filtering on the Date Part of a Timestamp

If your column is a timestamp and you want to compare just the date:

```sql
SELECT *
FROM your_table
WHERE some_timestamp_column::date = '2023-01-01';
```

### Using Date Functions in WHERE

#### Date Truncation

To filter by day, truncating time:

```sql
SELECT *
FROM your_table
WHERE date_trunc('day', some_timestamp_column) = '2023-01-01'::date;
```

#### Using Intervals

Filter records within a relative time period (e.g., last 7 days):

```sql
SELECT *
FROM your_table
WHERE some_timestamp_column >= now() - interval '7 days';
```

---

## 4. Practical Example

Suppose you have an `orders` table with a `created_at` timestamp. You can format and filter the data as follows:

```sql
-- Display order ID with a formatted creation date
SELECT id, to_char(created_at, 'YYYY-MM-DD') AS created_date
FROM orders
WHERE created_at::date = '2023-02-14';
```

---

This cheatsheet should help you quickly reference the essential date and datetime operations in PostgreSQL. Adjust the examples as needed for your specific use cases.
