+++
author = "Vasav"
categories = ["python","devops"]
date = "2020-06-02"
description = ""
featuredpath = "date"
linktitle = ""
title = "Vagrant server setup for django rest"
type = "post"
+++

## Installing Vagrant server

There are 2 requirements to setup vagrant server
* Install [vagrant](https://www.vagrantup.com/)
* Install [Virtualbox](https://www.virtualbox.org/)

youtube reference for the same can be found [here](https://www.youtube.com/watch?v=IzGO9t6cNk8).
___

## Setting up vagrant box
* Navigate to root of the django project
* Copy the vagrant file provided in the [github repo](https://github.com/LondonAppDev/profiles-rest-api/blob/master/Vagrantfile)
* Use command ```vagrant up``` to set up the virtual box
* Once processing is done then you are all set to test your app on virtual box
* Use command ```vagrant ssh``` to ssh into the newly created virtual box
* Naviagate to vagrant directory using command ```cd /vagrant/```. This directory will always sync with the project directory. This is a 2 way sync sp file added on your system will show up in virtual machine and similarly file added to VM will be displayed in your project. 
___

## Create virtual environment on vagrant box
* Use command ```python -m venv ~/env``` to create a new virtual environment
* Use command ```source ~/env/bin/activate``` to activate the virtual environment.
* Once you are in the virtual environment, use command ```deactivate``` to get out of virtual environment.

## Installing django and drf
* Make sure to activate virtual environment before performing this step.
* From the project folder run command python ``` pip install -r requirements.txt``` to install required python libraries.
* Once libraries are installed, django app can be tested using VM. 

## Final Step
Run the server using command ```python manage.py runserver``` and it will setup a VM for you. From chrome it can be accessed on ```localhost:8000```.








