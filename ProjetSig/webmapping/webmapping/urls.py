"""
URL configuration for webmapping project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
##########################################  ces deux lignes pour metre d'afficher 
############ mes media sur le navigateur
from django.conf import settings
from django.conf.urls.static import static
##########################################
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('gestionincendie.urls')),
    
]+  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # cette ligne
     # il se trouve dans settings et le dossier media dans le projet 
