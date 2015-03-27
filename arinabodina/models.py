from django.db import models

class Album (models.Model):
    title = models.CharField(max_length = 33)
    preview = models.ImageField(upload_to = 'albumtumb')
    indexOnMain = models.IntegerField(default = None, null = True)
    date = models.DateField()

#    def image_tag(self):
#        return u'<img src="%s" />' % self.preview.url
#    image_tag.allow_tags = True

#    def __unicode__(self):
#        return self.title

    def __str__(self):
        return '{0} ({1})'.format(self.title, len(self.images.all()))

class AlbumImage(models.Model):
    property = models.ForeignKey(Album, related_name ='images')
    image = models.ImageField(upload_to = 'albumphotos')

    def __str__(self):
        return self.property.title + self.image.url

class Video(models.Model):
    videoUrl = models.URLField()
    indexOnMain = models.IntegerField(default = None, null = True)
    date = models.DateField()

