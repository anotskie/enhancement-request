from django.shortcuts import render, HttpResponse
from .models import Article, Comment
from .serializers import ArticleSerializer, UserSerializer, CommentSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework. decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework import generics
from rest_framework import mixins
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.authtoken.models import Token

# Create your views here.

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    @action(detail=True, methods=['POST'])
    def vote(self, request, pk=None):
        article = self.get_object()
        article.vote += 1
        article.save()
        return Response({'message': 'Vote added successfully'})

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = Article.objects.all()
        queryset = queryset.prefetch_related('author')  # Prefetch author to avoid N+1 query
        return queryset

    def create_article(self, request):
        title = request.data.get('title')
        description = request.data.get('description')
        user = request.user  # This will give you the current authenticated user
    
        # Create and save the article with the user as the author
        article = Article(title=title, description=description, author=user)
        article.save()
    
        # Return the serialized article data
        serialized_article = ArticleSerializer(article)
        return Response(serialized_article.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def create_article(request):
    title = request.data.get('title')
    description = request.data.get('description')
    user = request.user  # This will give you the current authenticated user
    
    # Create and save the article with the user as the author
    article = Article(title=title, description=description, author=user)
    article.save()
    
    # Return the serialized article data
    serialized_article = ArticleSerializer(article)
    return Response(serialized_article.data, status=status.HTTP_201_CREATED)
# class ArticleViewSet(viewsets.ModelViewSet):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer

#     @action(detail=True, methods=['put'])
#     def update_article(self, request, pk=None):
#         article = self.get_object()
#         serializer = ArticleSerializer(article, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
#     def vote(self, request, pk=None):
#         article = self.get_object()
#         user = request.user

#         if user not in article.voted_by.all():
#             article.vote += 1
#             article.voted_by.add(user)
#             article.save()
#             return Response({'votes': article.vote})
#         else:
#             return Response({'detail': 'You have already voted for this article.'}, status=status.HTTP_400_BAD_REQUEST)
        

#     # Modify the list method to include vote counts
#     def list(self, request, *args, **kwargs):
#         queryset = self.filter_queryset(self.get_queryset())
#         serializer = self.get_serializer(queryset, many=True)
#         return Response(serializer.data)
    
#     def create(self, request, *args, **kwargs):
#         request.data['created_by'] = request.user.username
#         serializer = ArticleSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Function-based view for user registration
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response('User created successfully', status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'message': 'Logged in successfully',
                'token': token.key,
                'user_id': user.id,
                'username': user.username
            })
        else:
            return Response({'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_user_details(request, user_id):
    user = User.objects.get(pk=user_id)
    user_data = {
        'id': user.id,
        'username': user.username,
        # Include other user fields as needed
    }
    return Response(user_data)
        
class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        article_id = self.kwargs.get('article_id')
        article = Article.objects.get(id=article_id)
        serializer.save(user=self.request.user, article=article)