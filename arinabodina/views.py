from django.shortcuts import render
from arinabodina.models import Album, AlbumImage, Video

def index(request):
    albums = Album.objects.all()
    videos = Video.objects.all()

    return render(request, 'index.html', {'albums': albums, 'videos':  videos})