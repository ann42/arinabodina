# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '%9*x1svtuk8vz&099jve=n7!i*soz-qgfurs!g&t%nnwfeo)kh'

DEBUG = True

TEMPLATE_DEBUG = DEBUG

ROOT_URLCONF = 'arinabodina.urls'

TEMPLATE_DIRS = ('/home3/byronles/webapps/arinabodina/templates',)

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
    'arinabodina',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'HOST': 'localhost',
        'PORT': '',
        'NAME': 'byronles_arinabodina',
        'USER': 'byronles_arbo',
        'PASSWORD': '(ks3r#wb7x)*',
    }
}

#MIDDLEWARE_CLASSES = ()
STATIC_ROOT = '/home3/byronles/arina_html/static'

STATIC_URL = '/static/'

MEDIA_ROOT = '/home3/byronles/arina_html/static/media'

MEDIA_URL = '/static/media/'

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

#raise Exception(MEDIA_URL)