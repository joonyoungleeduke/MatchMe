"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include
from Accounts import urls as accounts_urls
from . import views as server_views
from Profiles import urls as profiles_urls
from Posts import urls as posts_urls 
from Groups import urls as groups_urls
from django.conf.urls.static import static 
from django.conf import settings 

urlpatterns = [
    path('api/', server_views.api_root),
    path('api/', include(groups_urls)),
    path('admin/', admin.site.urls), 
    path('api/', include(posts_urls)), # did this b/c of post id / comment id diff
    path('api/auth/', include(accounts_urls)),
    path('api/users/', include(profiles_urls)),
    path('api/browsable/', include('rest_framework.urls')),
] 

urlpatterns += static (settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
