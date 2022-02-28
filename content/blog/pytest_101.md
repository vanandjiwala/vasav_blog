+++
author = "Vasav"
categories = ["python","automation","qa"]
date = "2022-02-27"
description = "Pytest"
featuredpath = "date"
linktitle = ""
title = "Pytest Basics - 01"
type = "post"
+++

## Introduction

pytest is a testing framework for the python programming language. Based on the official [documentation](https://docs.pytest.org/en/6.2.x/index.html) - ```pytest makes it easy to write small tests, yet scales to support complex functional testing for applications and libraries```.

In this article, I am going to include some basic features of pytest. As I learn more about the framework, I will continue to add more posts around the same topic.

Pytest can be used in a variety of tests which include frontend, backend, unit testing, etc.

## How pytest detects test cases
1. test file starts with ```test_```. Example: ```test_sum.py```
2. test file ends with ```_test```. Example: ```sum_test.py```
* Important thing to note here is, ```pytest``` finds file in the current directory as well as subdirectories. 
3. test files can have ```classes``` or ```functions```.
4. For ```class```, do not include ```__init__()```
5. ```Functions``` should also start with ```test_```
6. For ```class```, the name must start with ```Test``` and the method name must start with ```test_```. 

example:
```
def test_tc01():
    print("my first test case")

def test_tc02():
    print("my second test case")
```

## Running pytest
```pytest <options> testdirectory```
* If you are using [markers](https://docs.pytest.org/en/6.2.x/example/markers.html) (I will cover this in another post)

```pytest -m <marker name>```

In the example below, regression is the marker. So in order to run regression, use the following command:

```pytest -m regression```

example:
```
@pytest.mark.regression
def test_tc01():
    print("my first test case")

@pytest.mark.regression
def test_tc02():
    print("my second test case")
```

## Fixtures
pytest fixtures are used to perform setup and teardown for the automated test cases. Setup usually is responsible for ```obtaining test data, preparing DB connections, starting a web browser/driver, etc```. On the other hand, tear down is responsible for ```closing DB connection, closing web browser/driver, updating test results, etc```.

example:
```
@pytest.fixture
def setup_tc():
    print("setup code goes here")

@pytest.mark.regression
def test_tc01():
    print("my first test case")

@pytest.mark.regression
def test_tc02():
    print("my second test case")
```

In the above example, ```setup_test``` is going to be executed before both the methods ```test_tc01``` and ```test_tc02```.

If we want to execute the setup only once for the entire module then we have to use the argument [```scope```](https://docs.pytest.org/en/6.2.x/fixture.html).

The possible value of scope are:
1. function
2. class
3. module
4. package
5. session

## Reporting
Like most frameworks, pytests provide some options to check the status of the execution. One of the common ways to generate reports is to use [```pytest-html```](https://pypi.org/project/pytest-html/). 

example:
```pytest --html=my_test_report.html```