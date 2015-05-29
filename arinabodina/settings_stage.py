from settings_prod import *

DEBUG = False

TEMPLATE_DEBUG = DEBUG

ROOT_URLCONF = 'arinabodina_stage.urls'

TEMPLATE_DIRS = ('/home3/byronles/webapps/arinabodina_stage/templates',)


INSTALLED_APPS = (
    'django.contrib.contenttypes',
    'django.contrib.auth',
    'django.contrib.sessions',
    #'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.admin',
    #Dirty hack for Mochahost
    #'django.contrib.staticfiles',
    'sorl.thumbnail',
    'arinabodina_stage',
)

STATIC_ROOT = '/home3/byronles/arina_stage_html/static'