from django.db import models
from sorl.thumbnail import ImageField


class Album (models.Model):
    title = models.CharField(max_length=33)
    preview = models.ImageField(upload_to='albumtumb')
    indexOnMain = models.IntegerField(default=None, null=True, blank=True)
    date = models.DateField()

#    def image_tag(self):

#        return u'<img src="%s" />' % self.preview.url

#    image_tag.allow_tags = True

#    def __unicode__(self):

#        return self.title

    def __unicode__(self):
        return u'{0} - {1} ({2})'.format(self.title, self.id, len(self.images.all()))

    class Meta:
        db_table = "arinabodina_album"


class AlbumImage(models.Model):
    album = models.ForeignKey(Album, related_name='images')
    image = ImageField(upload_to='albumphotos')

    def __unicode__(self):
        return u'{0} - {1} ({2})'.format(self.album.title, self.album.id, self.image.url)

    class Meta:
        db_table = "arinabodina_albumimage"


class Video:
    def __init__(self, youtubeVideoId, videoTitle, thumbnailUrl):
        self.youtubeVideoId = youtubeVideoId
        self.videoTitle = videoTitle
        self.thumbnailUrl = thumbnailUrl

    def getEmbedUrl(self):
        return u'http://www.youtube.com/embed/{0}'.format(self.youtubeVideoId)

    def getDirectUrl(self):
        return u'http://www.youtube.com/watch?v={0}'.format(self.youtubeVideoId)

    class Meta:
        db_table = "arinabodina_video"


class Class (models.Model):
    title = models.CharField(max_length=35)
    subTitle = models.CharField(max_length=40)
    shortTitle = models.CharField(max_length=15)
    classDesc = models.TextField(max_length=300)
    preview = models.ImageField(upload_to='classesthumb')
    indexOnMain = models.IntegerField(default=None, null=True, blank=True)
    isChildish = models.BooleanField()

    def __unicode__(self):
        classTitle = 'Children' if self.isChildish else 'Adults'
        return u'{0} ( {1} )'.format(self.title, classTitle)

    class Meta:
        db_table = "arinabodina_class"


class Metro (models.Model):
    title = models.CharField(max_length=20)

    def __unicode__(self):
        return self.title

    class Meta:
        db_table = "arinabodina_metro"


class WeekDay (models.Model):
    title = models.CharField(max_length=15)

    def __unicode__(self):
        return self.title

    class Meta:
        db_table = "arinabodina_weekDay"


class ClassSchedule (models.Model):
    weekDay = models.ForeignKey(WeekDay, related_name ='scheduledClasses')
    metro = models.ForeignKey(Metro, related_name ='scheduledClasses')
    scheduledClass = models.ForeignKey(Class, related_name ='scheduledClasses')
    startTime = models.TimeField(auto_now=False)
    endTime = models.TimeField(auto_now=False)

    class Meta:
        db_table = "arinabodina_classSchedule"
