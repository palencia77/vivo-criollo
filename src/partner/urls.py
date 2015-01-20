'''
Created on 01/09/2014

@author: heybees
'''
from django.conf.urls import patterns, include, url
from django.contrib import admin
from views import *


urlpatterns = patterns('',
   
    url(r'^$', partners_init, name='partner'),
    #url(r'^/#id' , show_partner, name='show_partners'),
    url(r'^/profile' , show_partner, name='show_partner')
    
)