from .views import CreateASubject, ViewASubject, ViewAllSubjects
from django.urls import path

urlpatterns = [
    path('create', CreateASubject.as_view()),
    path('view/<pk>', ViewASubject.as_view()),
    path('all', ViewAllSubjects.as_view()),
]