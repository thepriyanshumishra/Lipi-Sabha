from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuditEventViewSet

router = DefaultRouter()
router.register(r'audit-log', AuditEventViewSet, basename='audit-log')

urlpatterns = [
    path('', include(router.urls)),
]
