from django.db import models


# Create your models here.

class Subject(models.Model):
    subject_id = models.AutoField(primary_key = True)
    semester = models.CharField(max_length = 5)
    nrc = models.CharField(max_length = 10)
    teacher = models.CharField(max_length = 50)
    name = models.CharField(max_length = 50)
    monday = models.CharField(blank = True, null = True, max_length = 4)
    tuesday = models.CharField(blank = True, null = True, max_length = 4)
    wednesday = models.CharField(blank = True, null = True, max_length = 4)
    thursday = models.CharField(blank = True, null = True, max_length = 4)
    friday = models.CharField(blank = True, null = True, max_length = 4)
    saturday = models.CharField(blank = True, null = True, max_length = 4)
    sunday = models.CharField(blank = True, null = True, max_length = 4)

