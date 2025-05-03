"""
URL configuration for backend_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
    http post http://127.0.0.1:8000/api/token/ username=admin password=admin
    http post http://127.0.0.1:8000/api/vendors/"Authorization:Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyNTA3MjQyLCJpYXQiOjE3MjI1MDY5NDIsImp0aSI6ImMwYzRkNTIyYTU1YTRjMTBiMGFiYmI5NTk2NjE4NThlIiwidXNlcl9pZCI6Mn0.MNmgJiFqBTQmPCbbX9CEMCnbtN5wReG8PEXWeyJA4mU
    http post http://127.0.0.1:8000/api/token/refresh/ refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjU5Mjg1MCwiaWF0IjoxNzIyNTA2NDUwLCJqdGkiOiI4NzZiY2Q3NDg1M2Q0MWMwOTUzOWJkODRiNTNlMDIyZSIsInVzZXJfaWQiOjF9.RjQ-zg9HbUPZgftDj5AVcl2AiKGjOwvNAwuyczz-sos
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
from rest_framework_simplejwt import views as jwt_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('main.urls')),
    path('api/token/',jwt_views.TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('api/token/refresh/',jwt_views.TokenRefreshView.as_view(),name='token_refresh'),
    path('api-auth/', include('rest_framework.urls')),  
    
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

