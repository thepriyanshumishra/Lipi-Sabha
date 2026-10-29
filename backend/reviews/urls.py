from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReviewTaskViewSet

router = DefaultRouter()
router.register(r'reviews', ReviewTaskViewSet, basename='review')

urlpatterns = [
    path('', include(router.urls)),
]
