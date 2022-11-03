+++
author = "Vasav"
categories = ["miscellaneous"]
date = "2022-11-03"
description = "VS Code Way of Adding quote and comma in multiline string"
featuredpath = "date"
linktitle = ""
title = "Create a comma separated string from text in VS Code"
type = "post"

+++


## Introduction
There are cases when you are copying a column data from excel or other tool in a text editor and you want to format it to be used in SQL in clause or any other usecase. In this article, I am providing a way to do it in VS code. 

## Steps

1. First of all copy the content from excel/ghsset in VS code. It should look something like this:

```
asda
sdf
sfsfsf
sfsfsf
ty
erty
wwa
yyb
dddd
```

We want to have it converted into something like this: 
```
'asda',
'sdf'
```
2. Press ```cmd``` + ```F```, and click on ```.*``` to use regular expression. 
3. In the first input insert ```^(.+)$```. This will select all the lines in the document. 
4. In the 2nd input, enter ```'$1',```. Important thing to note is ```'``` before ```$1``` will be placed before every word while ```',``` will be placed after the text. 
5. Click on ```replace all``` button. 
6. You will see the result. 

```
'asda',
'sdf',
'sfsfsf',
'sfsfsf',
'ty',
'erty',
'wwa',
'yyb',
'dddd',
```

