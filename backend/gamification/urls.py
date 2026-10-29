from django.urls import path
from .views import gamification_me, badges_list

urlpatterns = [
    path('me/', gamification_me, name='gamification-me'),
    path('badges/', badges_list, name='badges-list'),
]
