from rest_framework import serializers
from .models import Subject


class SubjectViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('subject_id', 'career', 'name', 'semester', 'nrc', 'teacher', 'name',
                  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',)


class SubjectCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('career', 'name', 'semester', 'nrc', 'teacher', 'name',
                  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',)
