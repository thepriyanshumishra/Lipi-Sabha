from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProposalViewSet, DecisionRecordViewSet

router = DefaultRouter()
router.register(r'proposals', ProposalViewSet, basename='proposal')
router.register(r'decisions', DecisionRecordViewSet, basename='decision')

urlpatterns = [
    path('', include(router.urls)),
]
