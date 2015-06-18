# -*- coding: utf-8 -*-
from django.conf.urls import patterns, include, url
from django.contrib import admin
from views import index, album, albums_list, videos_list
from django.views.generic.simple import direct_to_template

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'arinabodina.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', index),
    url(r'^album/(\d+)/?$', album),
    url(r'^albums/?$', albums_list),
    url(r'^videos/?$', videos_list),
    url(r'^robots\.txt$', direct_to_template, {'template': 'robots.txt', 'mimetype': 'text/plain'})
)