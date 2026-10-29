from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LearningQuestViewSet, LearningProgressViewSet

router = DefaultRouter()
router.register(r'quests', LearningQuestViewSet, basename='quest')
router.register(r'progress', LearningProgressViewSet, basename='progress')

urlpatterns = [
    path('', include(router.urls)),
]
