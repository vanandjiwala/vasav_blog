+++
author = "Vasav"
categories = ["scala"]
date = "2022-08-22"
description = "Code snippets of scala for quick reference"
featuredpath = "date"
linktitle = ""
title = "Scala - Notes"
type = "post"
+++

## Introduction
This article will have basic code snippets for quick reference.


## Filters

```
val a = List(1,2,3,4,5)
val b = List(1,2,3,7,8,9)

//Find elements from b which are not present in  a
println(b.filter(x => !a.contains(x)))

//Find elements from b which are present in  a
println(b.filter(x => a.contains(x)))
```

**Ouput:**
```
List(7, 8, 9)
List(1, 2, 3)
```

## Creating stream using recurssion
Stream is a lazy list so evaluated when needed. 
```
def get_number(n: Int): Stream[Int] = {
    n #:: get_number(n + 1)
}

def get_number1(n: Int): Stream[Int] = {
    Stream.cons(n, get_number1(n+1))
}

val st1 = get_number(1)
val st2 = get_number(1)

println(st1)
println(st2)

get_number(1).take(10).foreach(x => println(x))
```

**Ouput:**
```
Stream(1, ?)
Stream(1, ?)

1
2
3
4
5
6
7
8
9
10
```

## Finding min and max from a List

```
val b = List(1,2,3,7,8,9)
val dateList: List[String] = List("2022-01-15", "2022-01-25", "2022-02-17", "2021-01-15")
println(b.max)
println(dateList.max)
println(dateList.min)
```
**Ouput:**

```
9
2022-02-17
2021-01-15
```

## String representation of array

```
val b = List(1,2,3,7,8,9)
println(b.mkString("--"))
```

**Ouput:**

```
1--2--3--7--8--9
```

## Meaning of :_* in scala

https://stackoverflow.com/questions/62623349/what-does-mean-in-scala-when-using-a-list-to-filter-a-dataframe

## createDataframe() vs toDF()

https://blog.knoldus.com/spark-createdataframe-vs-todf/


