from rest_framework import serializers
from .models import Article, Comment
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('vote', 'voted_by')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

        extra_kwargs = {'password':{
            'write_only': True,
            'required': True
        }}
    
    def create(self, validated_data):
        user  = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
    