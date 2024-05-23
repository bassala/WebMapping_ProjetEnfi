from django.urls import path
from . import views


urlpatterns = [
    path('webmapping/', views.webmapping, name='webmapping'),
    
]
