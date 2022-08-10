+++
author = "Vasav"
categories = ["scala"]
date = "2022-06-15"
description = "Pattern Matching, Tuples, Option and Functions"
featuredpath = "date"
linktitle = ""
title = "Scala - Pattern Matching, Tuples, Option and Functions"
type = "post"
+++

## Introduction
In this article, we are going to cover other topics. Basics of Scala was covered in the earlier article which was found at this [link](https://vasav.co.in/blog/scala/). In these series, I am mostly going to provide code snippets which can help me revise what I have learnt and act as a cheatsheet. For better and in-depth understanding, feel free to visit the reference section at the very end, it lists all the documents/articles I have referred to for creating this blog post. 

We will be covering the following topics in this post. 

1. Pattern Matching
2. Tuples
3. Option
4. Functions


## Pattern Matching
Pattern matching in scala is very similar to ```switch-case``` in java. The syntax for the same is shown below. An important thing to notice here is ```_```. It represents the default case. When any of the mentioned cases are not matched, the default case will be executed. 

```
var airline = "Air India"
airline match{
    case "Air India" => println("India")
    case "Emirates" => println("Dubai")
    case "British Airways" => println("UK")
    case _ => println("Others")
}
```

Above code will give the following output:
```
India
```
In the above example, chage the value of variable ```airline``` to ```Air India1```. The change will make the ```default``` case execute. So the output will be ```Others```. 

We can return the result from pattern matching using the following syntax. With a minimal change, we should be able to return the value from the ```match``` block. 

```
var airline = "Emirates"
val country = airline match{
    case "Air India" => "India"
    case "Emirates" => "Dubai"
    case "British Airways" => "UK"
    case _ => "Others"
}
println(country)
```
The above code will give ```Dubai``` as output. 

Scala allows us to use perform multiple pattern matching in the same case statement. Here is an example about the same:

```
var airline = "Indian Airlines"
val country = airline match{
    case "Air India" | "Indian Airlines" => "India"
    case "Emirates" => "Dubai"
    case "British Airways" => "UK"
    case _ => "Others"
}
println(country)
```

Pattern maching can not only be done on the value but also the types. Here is an example around the same: 

```
var price: Any = "10"
val price_type = price match {
    case value: Int => "Type is Int"
    case value: Float => "Type is Float"
    case value: Double => "Type is Double"
    case value: String => "Type is String"
}
println(price_type)
```

The above example will give ```Type is String``` as output. Pattern matching is a powerful tool and as I explore more, I am going to include those details in the upcoming articles. Feel free to check the references at the end which contains more in-depth explaination of the topic.

## Tuples
Tuples are an **immutable** data structure in scala which has a **fixed length** and is capable of **storing elements of different types**. Tuples are handy when we want to return more than one value from a method.

**Creating a tuple**
```
val student = ("John Doe", 13)
```

**Accessing a tuple**

The above syntax will create a tuple containing the name of type ```String``` and age of type ```Int```. In order to access these elements, we use the following syntax.

```
//Method1
val name = student._1
val age = student._2
println(name)
println(age)
//Method2
val (myname,myage) = student
println(myname)
println(myage)
```

## Option
Option in scala can either contain a single element or no element. In other words, the option can be either ```Some``` or ```None```. An example below will make things a bit more clear.

```
var a:Option[String] = Some("Myval")
println(f"Value of a is ${a.get}%s")
```
Since ```String``` is wrapper in ```Option```, we have to use ```a.get``` to obtain the value. 

```
var b:Option[String] = None
println(s"Value of a is ${b.get}")
```
In the above example, since we have set the value of ```b``` to ```None```, we are going to get ```java.util.NoSuchElementException```. In this case we can replace the ```get``` with ```getOrElse``` as shown below. ```getOrElse``` will allow us to pass a default value. 

```
var b:Option[String] = None
println(s"Value of a is ${b.getOrElse("Default")}")
```
Above block will provide ```Value of a is Default``` as output. We can also utilize pattern matching with ```Option``` as shown in the example below.

```
var b:Option[String] = None
b match {
    case Some(myvalue) => println(s"Value of b is = $myvalue")
    case None       => println(s"None")
}
```
Here the output will be ```None```. If we change the value of b to ```Some("Scala")``` then the output will be ```Value of b is = Scala```.

## Functions

Functions are important part of any programming languages. Any code that gets repeated should be ideally traslated to a function. Creating a function is done using the keyword ```def```. There are multiple ways of creating a function in scala. Since scala supports functional programming and the functions are the first class citizens in the programming language, there are many other concepts which needs to be covered under ```Function```. That will be done in some other article. The scope of this article to just understand basic function syntax and how to use it. Here is an example which will make things more clear.



```
def addition(x: Int, y: Int): Int = {
    return x + y;
}

def addition1(x: Int, y: Int): Int = {
    x + y
}

def addition2(x: Int, y: Int): Int = x + y;

def addition3(x: Int, y: Int)= x + y;

var mySum = (x: Int, y: Int) => x + y;
print(mySum(5,6))
```

We have created add method which accepts 2 ```Int``` type parameters and return ```sum``` of both the parameters. 

There are multiple ways of creating a function in scala. The first one ```addition``` is the standard and very similar to the other programming languages. In the ```addition1```, there is a small change, we are not using ```return```. In scala, the last statement by default gets returned. So no need to explicitly specify that. In the ```addition2```, we are going with even shorter syntax. We have emilimated ```{}``` and have writted the logic directly in the same line. ```addition3``` is the same but we are relying on scala to infer the return type as we are certain that the return type is going to be ```Int```. 

The last ```mySum``` variable is representing ```anonymous function```. The reference video i have in the bottom explains it in a very good manner which is available on ```ProgramminKnowledge``` youtube channel. Usage is using variable name followed by the arguments required for the function ```mySum(5,6)``` in our case. 

## References
1. http://allaboutscala.com/
2. https://www.baeldung.com/scala/pattern-matching
3. https://docs.scala-lang.org/cheatsheets/index.html
4. https://docs.scala-lang.org/tour/tuples.html
5. https://www.youtube.com/watch?v=Tadg1OVTH5E&list=PLS1QulWo1RIagob5D6kMIAvu7DQC5VTh3&index=14




