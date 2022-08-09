+++
author = "Vasav"
categories = ["scala"]
date = "2022-08-09"
description = "Basics of Scala - 3"
featuredpath = "date"
linktitle = ""
title = "Scala - Base classes and Enum"
type = "post"
+++

## Introduction
In this article, we are going to cover other topics. Basics of Scala was covered in the earlier article which was found at this [link](https://vasav.co.in/blog/scala/). In these series, I am mostly going to provide code snippets which can help me revise what I have learnt and act as a cheatsheet. For better and in-depth understanding, feel free to visit the reference section at the very end, it lists all the documents/articles I have referred to for creating this blog post.

We will be covering the following topics in this post.

1. Case Classes
2. Enum

## Case Classes
Case classes can be used for data modelling. An example below will provide a better understanding on that.

```
case class Student(id:Int, fname: String, lname: String)

val student1 = Student(id = 1, fname = "Vasav", lname = "A")
println(student1.id)
println(student1.fname)
println(student1.lname)
```

We can use these case classes in in functions as shown below: 

**Function Definition**

```
def get_student_info(student: Student): Unit = {
  println(s"Student ${student.fname}, ${student.lname} has id - ${student.id}")
}

```

**Function Usage**

```
get_student_info(student1)
```

Another important thing to notice is that, case classes are immutable. So the value can not be reassigned. 

```
student1.fname = "Tom"
```

If we try to assign the value to a field, in our case fname, we will get an error ```Reassignment to val fname```.

In order to change the value, we have to make 2 changes. We can use ```copy``` method to alter a field in the case class. Another thing that we need to do is to use ```var``` instead of ```val```.  At a very high level, ```val``` can not be changed. It is similar to the ```final``` in ```Java```. In contrast to that value assigned to ```var``` can be changed. 

```
var student1 = Student(id = 1, fname = "Vasav", lname = "A")

student1 = student1.copy(fname = "Tom")
get_student_info(student1)
```

The above changes will let you change the field in a case class. 


## Enums
Enums are used when we have finite set of options. For instance day in a week, month in a year etc. If you are from Java background this should be a familiar topic for you. Here is the code snippet for enum. 

```
enum DaysOfWeek:
    case Mon, Tue, Wed, Thu, Fri, Sat, Sun

def get_day_no(day: DaysOfWeek):Int = day match
    case DaysOfWeek.Mon => 1
    case DaysOfWeek.Tue => 2
    case DaysOfWeek.Wed => 3
    case DaysOfWeek.Thu => 4
    case DaysOfWeek.Fri => 5
    case DaysOfWeek.Sat => 6
    case DaysOfWeek.Sun => 7
```

Here we have an enum named ```get_day_no```. It has 7 options starting Monday to Sunday. Now we have a function ```get_day_no``` which accepts the enum as a parameter. This function returns int ```1 to 7``` representing days of week. Now we are going to call above function using the following syntax:

```
get_day_no(day = DaysOfWeek.Wed)
//  println(get_day_no(day = DaysOfWeek.Wed))
```

Here the function will return ```3``` based on the function definition.

We can also use enums with parameters. Here's how you do it:

```
enum WhiteBalance(val temp: Int):
    case ClearSkyBlue extends WhiteBalance(10000)
    case Daylight extends WhiteBalance(5500)
    case Flash extends WhiteBalance(4000)

def get_temp(wb: WhiteBalance): Int = wb match
    case clearsky@WhiteBalance.ClearSkyBlue => clearsky.temp
    case daylight@WhiteBalance.Daylight => daylight.temp
    case flash@WhiteBalance.Flash => flash.temp
```

Here we have an emun ```WhiteBalance``` which accepts a parameter ```temp```. The case statement will be different than what we used earlier. So here we are extending the value with ```WhiteBalance``` and passing the parameter. When we call the function ```get_temp``` we will get the tempreture associated with the white balance. 

Example Usage:

```
print(get_temp(WhiteBalance.Flash))
```

The above call will print ```4000```. 

## References
1. https://stackoverflow.com/questions/1791408/what-is-the-difference-between-a-var-and-val-definition-in-scala


