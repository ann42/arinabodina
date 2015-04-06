from django.conf.urls import patterns, include, url
from django.contrib import admin
from arinabodina.views import index, albumsPopup

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'arinabodina.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', index),
    url(r'^albumsPopup/(\d+)?', albumsPopup),
)