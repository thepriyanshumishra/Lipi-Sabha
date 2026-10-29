from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/', include('projects.urls')),
    path('api/', include('contributions.urls')),
    path('api/', include('reviews.urls')),
    path('api/learning/', include('learning.urls')),
    path('api/gamification/', include('gamification.urls')),
    path('api/', include('community.urls')),
    path('api/', include('notifications.urls')),
    path('api/admin/', include('moderation.urls')),
]
