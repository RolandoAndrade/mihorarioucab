from django.db import models
from subject.models import Subject


# Create your models here.

class Career(models.Model):
    career_id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 50)
    subjects = models.ManyToManyField(Subject, blank = True, null = True, related_name = "career")
