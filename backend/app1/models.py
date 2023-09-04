from django.db import models


# Create your models here.

class User(models.Model):
    username = models.CharField(unique=True, max_length=200)
    email = models.EmailField(max_length=150)
    password = models.CharField(max_length=30)
    
    def __str__(self):
        return self.username
