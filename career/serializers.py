from rest_framework import serializers
from .models import Career
from subject.models import Subject
from subject.serializers import SubjectViewSerializer


class CareerViewSerializer(serializers.ModelSerializer):
    # subjects=serializers.StringRelatedField(many=True)
    subjects = SubjectViewSerializer(many = True, read_only = True)

    # subject_id = serializers.PrimaryKeyRelatedField(many = True, read_only = True)

    class Meta:
        model = Career
        fields = ('career_id', 'name', 'subjects',)


class CareerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = ('name',)


class CareerViewCut(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = ('career_id', 'name',)
