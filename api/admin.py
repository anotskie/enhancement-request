from django.contrib import admin
from .models import Article

# Register your models here.

#admin.site.register(Article)

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'vote', 'author')
    list_filter = ('title', 'description', 'vote', 'author')
