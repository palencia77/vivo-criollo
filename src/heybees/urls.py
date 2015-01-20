from django.conf.urls import patterns, include, url
from django.contrib import admin
from views import *


urlpatterns = patterns('',
   
    url(r'^$', heybees_init, name='heybees'),
    url(r'^/cookies', heybees_privacy, name='cookies'),
    url(r'^/privacy', heybees_privacy, name='privacy'),
    url(r'^/contact', heybees_contact, name='contact'),
)
