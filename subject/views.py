from django.shortcuts import render
from rest_framework import generics
from subject import serializers
from .models import Subject


# Create your views here.

class CreateASubject(generics.CreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = serializers.SubjectCreateSerializer


class ChangeASubject(generics.UpdateAPIView):
    queryset = Subject.objects.all()
    serializer_class = serializers.SubjectCreateSerializer


class ViewASubject(generics.RetrieveAPIView):
    queryset = Subject.objects.all()
    serializer_class = serializers.SubjectViewSerializer


class ViewAllSubjects(generics.ListAPIView):
    queryset = Subject.objects.all()
    serializer_class = serializers.SubjectViewSerializer


class DeleteSubject(generics.DestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = serializers.SubjectViewSerializer
