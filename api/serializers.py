from rest_framework import serializers
from .models import Article, Comment
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token
from rest_framework.permissions import IsAuthenticated

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        permission_classes = [IsAuthenticated]
        fields = ['id', 'title', 'description', 'vote', 'author']
# class ArticleSerializer(serializers.ModelSerializer):
#     created_by = serializers.ReadOnlyField(source='created_by.username')
    
#     class Meta:
#         model = Article
#         fields = '__all__'
#         read_only_fields = ('vote', 'voted_by', 'created_by')



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
    