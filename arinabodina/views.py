from django.shortcuts import render
from arinabodina.models import Album, AlbumImage, Video

def index(request):
    slidesPhotos = Album.objects.get(title__exact = 'MainAlbum').images.all()
    albums = Album.objects.filter(indexOnMain__isnull = False)
    videos = Video.objects.filter(indexOnMain__isnull = False)

    return render(request, 'index.html', {'albums': albums, 'videos':  videos, 'slidesPhotos': slidesPhotos})

def albumsPopup(request, albumId):
    if albumId is not None:
        slidesPhotos = AlbumImage.objects.filter(album_id = albumId)
    else:
        slidesPhotos = Album.objects.latest('date').images.all()

    albums = Album.objects.exclude(title__exact = 'MainAlbum')

    return render(request, 'albums-popup.html', {'slidesPhotos': slidesPhotos, 'albums': albums})