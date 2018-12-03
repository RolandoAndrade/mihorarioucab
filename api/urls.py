from django.conf.urls import include
from django.urls import path

urlpatterns = [
    path('career/', include('career.urls')),
    path('subject/', include('subject.urls')),
]