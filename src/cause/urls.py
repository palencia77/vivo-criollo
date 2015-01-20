from django.conf.urls import patterns, include, url
from django.contrib import admin
from views import *


urlpatterns = patterns('',
   
    url(r'^$', causes_init, name='causes'),
    url(r'^/show' , show_cause, name='show_cause'),
    url(r'^/map' , show_causes_map, name='show_map')
)
