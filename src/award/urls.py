from django.conf.urls import patterns, url
from views import *


urlpatterns = patterns('',
   
    url(r'^$', award_init, name='awards')
    #url(r'^/show' , show_award, name='show_award')
)