from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from dajaxice.core import dajaxice_config
from solid_i18n.urls import solid_i18n_patterns
admin.autodiscover()

urlpatterns = solid_i18n_patterns('',
    url(r'^$', include('home.urls')),
    url(r'^user', include('security.urls')),
    url(r'^causes', include('cause.urls')),
    url(r'^ambassador', include('celebrity.urls')),
    url(r'^partner', include('partner.urls')),
    url(r'^philosophy', include('philosophy.urls')),
    url(r'^heybees', include('heybees.urls')),
    url(r'^investors', include('investors.urls')),
    url(r'^awards', include('award.urls')),
    url(r'^bee', include('bee.urls')),
    url(r'^post', include('post.urls')),
    url(dajaxice_config.dajaxice_url, include('dajaxice.urls')),
)
urlpatterns += staticfiles_urlpatterns()
