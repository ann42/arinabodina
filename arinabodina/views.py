from django.shortcuts import render
from arinabodina.models import Album, AlbumImage, Class
from arinabodina.youtubeApiHelper import getPlaylistVideos

def index(request):
    slidesPhotos = Album.objects.get(title__exact = 'MainAlbum').images.all()
    albums = Album.objects.filter(indexOnMain__isnull = False ).exclude(title__exact = 'MainAlbum').order_by('indexOnMain')
    videos = getPlaylistVideos('PLIN1isMX7oL31ZB4sU5GVfQO3iVTKtmIy', 4)
    childClasses = Class.objects.filter(isChildish = True).order_by('indexOnMain')
    adultClasses = Class.objects.filter(isChildish = False).order_by('indexOnMain')

    return render(request, 'index.html', {'albums': albums, 'videos':  videos, 'slidesPhotos': slidesPhotos, 'childClasses': childClasses, 'adultClasses': adultClasses})

def albums_list(request):
    albums = Album.objects.exclude(title__exact = 'MainAlbum').order_by('indexOnMain')

    return render(request, 'albums-list.html', {'albums': albums})

def album (request, albumId):
    album = Album.objects.get(id = albumId)
    photos = album.images.all()

    return render(request, 'album.html', {'photos': photos, 'album': album})

def videos_list(request):
    return render(request, 'videos-list.html', {'videos': getPlaylistVideos('PLIN1isMX7oL2sPEspn6WPKwpt7UzhjcQ-')})