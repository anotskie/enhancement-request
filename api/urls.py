from django.urls import path, include
#from .views import Index
from .views import ArticleViewSet, UserViewSet, register, user_login
#from .views import article_list, article_details, ArticleList, ArticleDetails
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('articles', ArticleViewSet, basename='articles')
router.register('users', UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', register, name='register'),  # Endpoint for user registration
    path('api/user-login/', user_login, name='user-login'),  # Endpoint for user login
]
