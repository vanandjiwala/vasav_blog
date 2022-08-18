+++
author = "Vasav"
categories = ["scala"]
date = "2022-05-22"
description = "Types, variables, Loops, Conditional Statements"
featuredpath = "date"
linktitle = ""
title = "Basics of Scala"
type = "post"
+++

## Installation

I am performing this on MAC with M1 chip. The process can be a little different for other operatiing system/architecture. 

1. Install Java - JDK from this locatiion (https://www.oracle.com/java/technologies/downloads/#jdk18-mac)

2. Open terminal or command prompt to check the java version and verify that it is installed properly 

java --version

Expected output: Version may vary. 
```
java 18.0.1 2022-04-19
Java(TM) SE Runtime Environment (build 18.0.1+10-24)
Java HotSpot(TM) 64-Bit Server VM (build 18.0.1+10-24, mixed mode, sharing)
```

3. Now it's time to install scala. On mac use the following command to install scala. 
brew install scala

4. Verify scalal version with the following command:
scala -version

```
Scala code runner version 2.13.8 -- Copyright 2002-2021, LAMP/EPFL and Lightbend, Inc.
```

## Basics
### Types
___
Scala does not have built-in/primitive types. It has set of classes to represent supporting types. 

Types in scala:
1. Int
2. Long
3. Short
4. Double
5. Float
6. String
7. Byte
8. Char
9. Unit (Similar to ```void``` in Java)

### Variables
___
In scala, variables can be declared in 3 different ways. 

1. Immutable - Value of such variables can not be altered
```
val count: Int = 5
```
**NOTE**: Changing the value will give error in the ide : ```Reassignment to val```. 

2. Mutable - Value of such variables can be altered
```
var note: String = "Note"
note = "my Note"
```
3. Lazy Initialization - Value initialized at the time of execution
```
lazy val myName: String = "my
```

**Type Inference**
Scala compiler can detect the type of the varibales defined if the type is not mentioned explicitely. 

In such case the above example will look like this:
```
val count = 5
```
Scala compiler will know that the type of count is Int. 

### String Interpolation
___
There are 3 ways to achieve this as per the documentation. 

1. ```s``` string interpolation
```
val name = "vasav"
println(s"my name is $name")
```
2. ```f``` string interpolation (Type Safe)
```
val name = "vasav"
println(f"my name is $name%s")
```
3. ```raw``` string interpolation (It does not do any escaping)
```
println(s"example of \n s-interpolation")
println(raw"example of \n raw-interpolation")
```
**Output**
```
example of 
 s-interpolation
example of \n raw-interpolation
```

### Conditional Statements
___

1. ```if``` statement
```
val myNum = 5
//Syntax1
if (myNum == 5) println("They are equal")
//Syntax2
if (myNum == 5){
    println("They are equal")
}
```
2. ```if - else``` statement
```
//syntax1
if(myNum % 2 == 0) {
    println("even")
} else {
    println("odd")
}

//syntax2
if(myNum % 2 == 0)
    println("even")
else
    println("odd")
```
3. ```else if``` statement
```
var mode = 4
if(mode == 1){
    println("mode1")
}else if(mode == 2){
    println("mode 2")
}else{
    println("mode 3")
}
```

In scala, we can directly assign the value of if else to a variable as per the [documentation](https://docs.scala-lang.org/overviews/scala-book/if-then-else-construct.html).
```
val minValue = if (a < b) a else b
```

### Loops
___

Example of a simple ```for``` loop in scala. 

```
for(i <- 1 to 5){
    println(i)
}
```

Output:
```
1
2
3
4
5
```
Important thing to notice here is that, 5 is also included in the loop. Now in order to run the loop till 4, we'll make a small change. More details on the ```range``` can be found on this [link](http://allaboutscala.com/tutorials/chapter-2-learning-basics-scala-programming/scala-tutorial-learn-use-range-inclusive-exclusive/).

```
for(i <- 1 until  5){
    println(i)
}
```
Output:
```
1
2
3
4
```
Scala for loop allows to filter the values as well. An example for the same is provided here which will make things more clear:
```
var my_list = List("abc","def","ghi","xyz")
for (combination <- my_list if combination == "xyz"){
    println("we have xyz in the list")
}
```
Output:
```
we have xyz in the list
```

Example of ```while``` in scala.

```
var n: Int = 5
while (n > 0){
    println(n)
    n -= 1
}
```
Output:
```
5
4
3
2
1
```
Here we have declared a variable ```n```. Here ```n``` is mutable. In the while we check for the condition, if ```n > 0``` then execute the code block. As we can see from the output, the loop will iterate from ```5 to 1```. When the value on ```n``` becomes 0, the condition ```n > 0``` will not be satisfied, so the while block will not get executed. 

Example of ```do while``` in scala. This is very similar to ```while``` but the main differece being the ```do while``` will execute at least once. 

```
var n1: Int = 0
do{
    println(n1)
    n1 += 1
}while(n1 > 5)
```

Output:
```
0
```


## References
1. http://allaboutscala.com/
2. https://docs.scala-lang.org/overviews/core/string-interpolation.html
3. https://docs.scala-lang.org/overviews/scala-book/if-then-else-construct.html
4. https://docs.scala-lang.org/overviews/scala-book/for-loops.html
5. http://allaboutscala.com/tutorials/chapter-2-learning-basics-scala-programming/scala-tutorial-learn-use-range-inclusive-exclusive/



