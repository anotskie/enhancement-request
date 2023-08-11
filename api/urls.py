
from django.urls import path, include
#from .views import Index
from .views import ArticleViewSet, UserViewSet
#from .views import article_list, article_details, ArticleList, ArticleDetails
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('articles', ArticleViewSet, basename='articles')
router.register('users', UserViewSet)


urlpatterns = [

    path('api/', include(router.urls)),

    # path('articles/', ArticleViewSet.as_view()),
    # path('articles/<int:id>/', ArticleDetails.as_view())


    # path('articles/', article_list),
    # path('articles/<int:pk>/', article_details),
   
]
