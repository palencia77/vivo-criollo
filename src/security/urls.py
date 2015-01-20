from django.conf.urls import patterns, include, url
from django.contrib import admin
from views import *


urlpatterns = patterns('',
                       
    url(r'^$', security_base),
    url(r'^/login', login),
    url(r'^/googlepluslogin', google_plus_login),
    url(r'^/facebooklogin', facebook_login),
    url(r'^/linkedinlogin', linkedin_login),
    url(r'^/logout', logout),
    url(r'^/recover/password', recover_password, name="recover_password"),
    url(r'^/recover/update/password', recover_password_update),
    url(r'^/activate/account', user_activate_account),
    url(r'^/inactivate/account', user_inactivate_account),
    url(r'^/user_register', user_register)
)

