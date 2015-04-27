# -*- coding: utf-8 -*-
from django.conf.urls import patterns, include, url
from django.contrib import admin
from arinabodina.views import index, album, albums_list, videos_list

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'arinabodina.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', index),
    url(r'^album/(\d+)', album),
    url(r'^albums', albums_list),
    url(r'^videos', videos_list)
)