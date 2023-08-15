from django.urls import path, include
from .views import ArticleViewSet, UserViewSet, register, user_login, CommentCreateView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# router.register('articles', ArticleViewSet, basename='articles')
router.register(r'users', UserViewSet)
router.register(r'articles', ArticleViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', register, name='register'),
    path('api/login/', user_login, name='login'),
    path('api/articles/<int:article_id>/comments/create/', CommentCreateView.as_view(), name='comment-create'),
]
