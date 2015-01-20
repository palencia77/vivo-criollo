from django.conf.urls import patterns, include, url
from django.contrib import admin
from views import *


urlpatterns = patterns('',
   
    url(r'^$', post_init),
    url(r'^/show' , show_post, name='show_post')
)
