from django.conf.urls import patterns, include, url
from django.contrib import admin
from views import *


urlpatterns = patterns('',
   
    url(r'^$', bee_init),
    url(r'^/ranking', bee_ranking),
    url(r'^/profile', profile, name="profile"),
    url(r'^/edit_profile' , edit_person_profile, name='edit_person_profile')
)
