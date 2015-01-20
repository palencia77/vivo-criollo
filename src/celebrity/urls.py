from django.conf.urls import patterns, include, url
from django.contrib import admin
from views import *


urlpatterns = patterns('',
   
    url(r'^$', celebrity_init, name='celebrity'),
    url(r'^/profile' , show_celebrity, name='show_celebrity')
)
