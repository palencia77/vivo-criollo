'''
Created on 01/09/2014

@author: heybees
'''
from django.conf.urls import patterns, include, url
from django.contrib import admin
from views import *


urlpatterns = patterns('',

    url(r'^$', home, name='home'),
      
)