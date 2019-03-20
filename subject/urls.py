from .views import CreateASubject, ViewASubject, ViewAllSubjects, DeleteSubject, ChangeASubject
from django.urls import path

urlpatterns = [
    path('create', CreateASubject.as_view()),
    path('view/<pk>', ViewASubject.as_view()),
    path('delete/<pk>', DeleteSubject.as_view()),
    path('change/<pk>', ChangeASubject.as_view()),
    path('all', ViewAllSubjects.as_view()),
]