from django.urls import path, include
from .views import ArticleViewSet, UserViewSet, register, user_login, CommentCreateView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('articles', ArticleViewSet, basename='articles')
router.register('users', UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', register, name='register'),
    path('api/user-login/', user_login, name='user-login'),
    path('api/articles/<int:article_id>/comments/create/', CommentCreateView.as_view(), name='comment-create'),
]
