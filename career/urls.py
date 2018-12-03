from .views import CreateACareer, ViewACareer, ViewAllCareers, ViewAllCareersCut
from django.urls import path

urlpatterns = [
    path('create', CreateACareer.as_view()),
    path('view/<pk>', ViewACareer.as_view()),
    path('all', ViewAllCareers.as_view()),
    path('all/cut', ViewAllCareersCut.as_view()),
]
