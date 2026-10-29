from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, OrthographyViewSet, OrthographicRuleViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'orthographies', OrthographyViewSet, basename='orthography')
router.register(r'rules', OrthographicRuleViewSet, basename='rule')

urlpatterns = [
    path('', include(router.urls)),
]
