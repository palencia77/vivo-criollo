"""
Django settings for heybeesweb project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
from os.path import dirname
import os.path


#BASE_DIR = os.path.dirname(os.path.dirname(__file__))
PATH_ROOT=os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(__file__)),os.pardir))

#URL base to flask restful services
URL_SERVICES = "http://localhost:5000"

#Public access token 
PUBLIC_ACCESS_TOKEN = "fCAGaSTwyhROyjoCfcTYgkqaZOVwdaujTt9J64gsRf3sy8hDxl4NnptjwyeWeNwnMvL4yxwTTJHemdvFH3jJMOhgDuTbeyoAneyaZd67SnXpfP2WRm2V67JW9RNkRue2t1Y1t0Yl1fLQGuXGtmOFJgb9w95m3aDOm2BuhEahETJNfE2cEZCm3MRoGsZYBwh606mN1BMHZB0F2erpGPjYNUux7gv8JJ19ZjGIyJx139PpWeCgAaDOH7I0tf4Fa1dNcNRNSDh50EXXESDN4geJ9SFR3yS3wRQ7iYeRBFaItWOypxxsQqDKwQSC9FemlI1SCWBnUN6GyKIBQX210kjsUlpb959FsEEUj2Kit3JQ0bV2agU8WrC0Xy9enU2aithd6PorZaujUF2JGaloNN2c6Pj1BOBknUXpJIcaNaaCBoTerZjVZxcHHZwvOuZkwJyuf"

#App type:
APP_TYPE = "LANDINGPAGE"
APP_TYPE_S = "SOCIAL"

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'sf&e@1lwlw*pkn&fb^nrp25pxrmnpo#g*dbf)diidxcbxra8g#'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = DEBUG

ALLOWED_HOSTS = []


# Application definition
INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'dajax',
    'dajaxice',
    'heybeesweb',
    'security',
    'cause',
    'partner',
    'home',
    'operation',
    'post',
    'resource',
    'award',
    'celebrity',
    'bee',
    'person',
    'comment',
    'notification',
    'tools',
)


ROOT_URLCONF = 'heybeesweb.urls'

WSGI_APPLICATION = 'heybeesweb.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': '',       # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': '',                      # Or path to database file if using sqlite3.
        # The following settings are not used with sqlite3:
        'USER': '',
        'PASSWORD': '',
        'HOST': '',         # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        'PORT': '',         # Set to empty string for default.
    }
}

# LANGUAGE CONFIG:
# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/
LANGUAGE_CODE = 'es'

TIME_ZONE = 'UTC'

# supported languages
LANGUAGES = (
    ('en', 'English'),
    ('es', 'Spanish'),
)

# Option settings.SOLID_I18N_USE_REDIRECTS is added (False by default). If it is True,
# then redirects will be used with following rules:
# 1. On request to url without language prefix, for example '/', language will be determied
#    from user preferences. If that language is not equal to default (settings.LANGUAGE_CODE),
#    then he will be redirected to corresponding url with prefix. But if it is equal, then
#    url without prefix will be shown.
# 2. On request to url with language prefix behaviour remains the same, i.e. language from prefix is used.
SOLID_I18N_USE_REDIRECTS = False

LOCALE_PATHS = (
    os.path.join(dirname(os.path.abspath(__file__)), 'locale'),
)

USE_I18N = True

USE_L10N = True

USE_TZ = True

SITE_ID = 1 

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/public/'

STATICFILES_DIRS = (
    os.path.join(PATH_ROOT, "public"),
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)
TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(PATH_ROOT, 'templates')
)

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
    'django.template.loaders.eggs.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.cache.UpdateCacheMiddleware',                      
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'solid_i18n.middleware.SolidLocaleMiddleware',
    'django.middleware.common.CommonMiddleware', 
    'django.middleware.cache.FetchFromCacheMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'dajaxice.finders.DajaxiceFinder',
#    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.debug',
    'django.core.context_processors.media',
    'django.core.context_processors.static',
    "django.core.context_processors.tz",
    'django.contrib.messages.context_processors.messages',
    'django.core.context_processors.request',
    'django.core.context_processors.i18n',
    'heybeesweb.context_processors.solid_i18n',
)

#===============================================================================
# CACHES = {
#     'default': {
#         'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
#         'LOCATION': 'localhost:11211',
#         #'LOCATION': 'unix:/run/memcached-sock/memcached.sock',
#     }
# }
#===============================================================================

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/var/www/example.com/static/"
STATIC_ROOT = ''
# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/var/www/example.com/media/"
MEDIA_ROOT = ''

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://example.com/media/", "http://media.example.com/"
MEDIA_URL = ''

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}