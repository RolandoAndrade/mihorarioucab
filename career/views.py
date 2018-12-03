from django.shortcuts import render
from rest_framework import generics
from career import serializers
from .models import Career


# Create your views here.

class CreateACareer(generics.CreateAPIView):
    queryset = Career.objects.all()
    serializer_class = serializers.CareerCreateSerializer


class ViewACareer(generics.RetrieveAPIView):
    queryset = Career.objects.all()
    serializer_class = serializers.CareerViewSerializer


class ViewAllCareers(generics.ListAPIView):
    queryset = Career.objects.all()
    serializer_class = serializers.CareerViewSerializer


class ViewAllCareersCut(generics.ListAPIView):
    queryset = Career.objects.all()
    serializer_class = serializers.CareerViewCut
