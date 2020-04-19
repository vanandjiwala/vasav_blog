+++
author = "Vasav"
categories = ["python","data-analysis"]
date = "2020-04-15"
description = ""
featuredpath = "date"
linktitle = ""
title = "Python Notations Quick Reference"
type = "post"
+++

## Quick Overview and Tips
___
### Resources
1. [stackoverflow - slice notation](https://stackoverflow.com/questions/509211/understanding-slice-notation)
2. [slice and indexing for lists in python](https://railsware.com/blog/python-for-machine-learning-indexing-and-slicing-for-lists-tuples-strings-and-other-sequential-types/)
___
### Syntax

- ```a[start:stop]```  #items start through stop-1
- ```a[start:]```      # items start through the rest of the array
- ```a[:stop]```       # items from the beginning through stop-1
- ```a[:]```           # a copy of the whole array
___
### Python basics
- **Lists:** Mutable. Value in a list can be changed with bracket notation.
- **Tuple:** Imutable. Value in a tuple can not be changed with bracker notation
- **Dictionary:** Similar to hashset which holds key value pairs. Values can be accessed with bracket notation and key. Dictionary does not maintain ordering.\
```dict = {'k1':'key1','k2':'key2'}```\
```print(dict['k1'])``` will print ```key1```
- **Set:** Holds unique values. Useful when getting unique items from a list.\
```list = [1,2,2,3,4,5,2,1]```\
```unique = set(list)```\
```print(unique)```\
will print ```{1,2,3,4,5}```
___
### Enable intellisense in jupyter notebook
```%config IPCompleter.greedy=True```\
[Reference](https://winsmarts.com/enable-intellisense-in-jupyter-notebooks-45cf4c98b29b)

___
- **map** Used to make an iterator. So a function can be applied to each element of the list. 
- **lambda function** A lambda function is a small anonymous function.A lambda function can take any number of arguments, but can only have one expression.


```
def times2(var):
    return var*2

map(times2,seq)

list(map(lambda var: var*2,seq))
```

___

### Tuple Unpacking

- Many functions in python will return list of tuples. In order to avoid using indexes to grab data in a tuple, tuple unpacking is used. An example will make it more clear. 

**Without Tuple Unpacking**
```
for item in x:
    print(item[0])
```
**Output**
```
1
3
5
```
**With Tuple Unpacking**
```
for (a,b) in x:
    print(a)
```    
**Output**
```
1
3
5
```