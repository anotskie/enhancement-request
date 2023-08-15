from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    vote = models.IntegerField(default=0)
    voted_by = models.ManyToManyField(User, related_name='articles_voted')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
