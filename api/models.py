from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    vote = models.PositiveIntegerField(default=0)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
# class Article(models.Model):
#     title = models.CharField(max_length=100)
#     description = models.TextField()
#     vote = models.IntegerField(default=0)
#     voted_by = models.ManyToManyField(User, related_name='articles_voted')
#     created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

#     def __str__(self):
#         return self.title

class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on '{self.article.title}'"