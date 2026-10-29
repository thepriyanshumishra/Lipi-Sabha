from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import BadgeDefinition

@api_view(['GET'])
@permission_classes([AllowAny])
def gamification_me(request):
    xp = request.user.learning_xp if request.user.is_authenticated else 450
    review_xp = request.user.review_xp if request.user.is_authenticated else 0
    return Response({
        'learning_xp': xp,
        'review_xp': review_xp,
        'contribution_count': 3,
        'garden_stage': 'sprout',
        'weekly_activity': [2, 3, 1, 4, 2, 0, 1]
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def badges_list(request):
    badges = [
        {'id': 1, 'name': 'First Discovery', 'description': 'Completed your first lesson', 'icon': '🌱', 'category': 'learning', 'earned': True},
        {'id': 2, 'name': 'Pattern Finder', 'description': 'Identified 5 patterns', 'icon': '🔍', 'category': 'learning', 'earned': True},
        {'id': 3, 'name': 'Curious Explorer', 'description': 'Explored 3 writing systems', 'icon': '🧭', 'category': 'learning', 'earned': False},
    ]
    return Response(badges)
