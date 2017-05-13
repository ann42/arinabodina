from googleapiclient.discovery import build
from arinabodina.models import Video

def getPlaylistVideos(playlistId, maxVideos = 25):
    service = build('youtube', 'v3', developerKey='AIzaSyBsYsrHdL8CV55wJrgdKAFPfHY-QiUIl7o')
    list_streams_response = service.playlistItems().list(
        playlistId=playlistId,
        part='snippet',
        maxResults=maxVideos,
    ).execute()
    videos = []
    for result in list_streams_response.get('items', []):
        videos.append(Video(
            result['snippet']['resourceId']['videoId'],
            result['snippet']['title'],
            result['snippet']['thumbnails']['high']['url']))
    return videos