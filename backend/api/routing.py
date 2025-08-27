from django.urls import re_path

from .consumers import poll

websocket_urlpatterns = [
    re_path(r'ws/poll/$', poll.PollConsumer.as_asgi(), name=''),   
]