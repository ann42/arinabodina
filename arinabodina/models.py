from django.db import models
from sorl.thumbnail import ImageField

class Album (models.Model):
    title = models.CharField(max_length = 33)
    preview = models.ImageField(upload_to = 'albumtumb')
    indexOnMain = models.IntegerField(default = None, null = True, blank = True)
    date = models.DateField()

#    def image_tag(self):
#        return u'<img src="%s" />' % self.preview.url
#    image_tag.allow_tags = True

#    def __unicode__(self):
#        return self.title

    def __str__(self):
        return '{0} - {1} ({2})'.format(self.title, self.id, len(self.images.all()))

class AlbumImage(models.Model):
    album = models.ForeignKey(Album, related_name ='images')
    image = ImageField(upload_to = 'albumphotos')

    def __str__(self):
        return '{0} - {1} ({2})'.format(self.album.title, self.album.id, self.image.url)

class Video:
    def __init__(self, youtubeVideoId, videoTitle, thumbnailUrl):
        self.youtubeVideoId = youtubeVideoId
        self.videoTitle = videoTitle
        self.thumbnailUrl = thumbnailUrl

    def getEmbedUrl(self):
        return 'http://www.youtube.com/embed/{0}'.format(self.youtubeVideoId)

    def getDirectUrl(self):
        return 'http://www.youtube.com/watch?v={0}'.format(self.youtubeVideoId)