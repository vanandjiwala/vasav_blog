+++
author = "Vasav"
categories = ["python","gis"]
date = "2023-01-27"
description = "Installing rasterio on Mac"
featuredpath = "date"
linktitle = ""
title = "Installing rasterio"
type = "post"
+++

## Introduction
Welcome to our guide on installing the ```Rasterio``` package on a Mac. Rasterio is a powerful library for handling geospatial raster data in Python. In this tutorial, we will walk you through the steps of installing Rasterio on your Mac, including any necessary dependencies. Whether you're a GIS professional or a data scientist working with geospatial data, this guide will help you get started with using Rasterio in your projects. Let's get started!

## Creating a virtual env
Use the following commands to create and activate virtual environment. Here is a quick reference to virtual environment if you are not aware about it (A Python virtual environment is a tool used to create isolated environments for Python projects, allowing for specific versions of packages to be installed and managed without interfering with the system's or other projects' dependencies).

```
python3 -m venv venv-gis
source venv-gis/bin/activate
```

after activating the virtual environment, you should be able to see something like this on the terminal ```(venv-gis) user@users-MacBook-Pro```

## Install dependency

```
brew install gdal
```
This is a requirement to install rasterio. Without this the [pip install command will fail](https://stackoverflow.com/questions/44898463/unable-to-install-gdal-in-python-3-6-1-in-macos-sierra). 

## Installing required packages

Use the following commands to install required packages.

```
pip install jupyterlab
pip install pandas
pip install rasterio
pip install geopandas
```

## Starting jupyter lab

On the active virtual env, use the following command to open jupyter lab. 

```
jupyter-lab
```

## Import rasterio to verify

```
import rasterio
from rasterio.plot import show
```

If above commands works without an error then you are all set to use rasterio. 

## Next steps
I will be covering basic tutorials on the same topic in near future. 