from django.urls import path

from . import views

app_name = 'api'

urlpatterns = [
    path('poll/<poll_id:int>/', views.pollmanage, name='pollInterface'),  
]