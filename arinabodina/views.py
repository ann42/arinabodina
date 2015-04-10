from django.shortcuts import render
from arinabodina.models import Album, AlbumImage, Video

def index(request):
    slidesPhotos = Album.objects.get(title__exact = 'MainAlbum').images.all()
    albums = Album.objects.filter(indexOnMain__isnull = False, ).exclude(title__exact = 'MainAlbum').order_by('indexOnMain')
    videos = Video.objects.filter(indexOnMain__isnull = False).order_by('indexOnMain')

    return render(request, 'index.html', {'albums': albums, 'videos':  videos, 'slidesPhotos': slidesPhotos})

def albums_list(request):
    albums = Album.objects.exclude(title__exact = 'MainAlbum').order_by('indexOnMain')

    return render(request, 'albums-list.html', {'albums': albums})

def album (request, albumId):
    album = Album.objects.get(id = albumId)
    photos = album.images.all()

    return render(request, 'album.html', {'photos': photos, 'album': album})