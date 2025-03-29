## Using write.format with parquet

```
%scala
df.write
  .format("parquet")
  .mode("append")
  .option("path", "s3a://bucket/destination")
  .save()
```

## Using write.parquet

```
%scala
df.write
  .mode("append")
  .parquet("s3a://bucket/destination")
```

## Using saveAsTable with parquet

```
%scala
df.write
  .mode("append")
  .option("path", "s3a://bucket/destination")
  .save("s3a://bucket/destination")
```
