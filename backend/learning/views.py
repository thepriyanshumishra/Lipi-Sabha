from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import LearningQuest, LearningProgress
from .serializers import LearningQuestSerializer, LearningProgressSerializer
from gamification.models import XPEvent, XPCategory
from moderation.models import log_audit_event

class LearningQuestViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LearningQuest.objects.all().prefetch_related('lessons')
    serializer_class = LearningQuestSerializer
    permission_classes = [permissions.AllowAny]

class LearningProgressViewSet(viewsets.ModelViewSet):
    queryset = LearningProgress.objects.all()
    serializer_class = LearningProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        quest_id = request.data.get('quest_id')
        if not quest_id:
            return Response({'error': 'quest_id required'}, status=status.HTTP_400_BAD_REQUEST)

        quest = LearningQuest.objects.filter(id=quest_id).first()
        if not quest:
            return Response({'error': 'Quest not found'}, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        progress, created = LearningProgress.objects.get_or_create(user=user, quest=quest)

        # STRICT IDEMPOTENCY: Do not award XP if the quest was already completed
        if progress.completed:
            return Response(
                {
                    'message': 'Quest already completed. Review mode active; duplicate XP is not awarded.',
                    'progress': LearningProgressSerializer(progress).data,
                    'xp_awarded': 0
                },
                status=status.HTTP_200_OK
            )

        # Mark completed and award XP exactly once
        progress.completed = True
        progress.xp_earned = quest.xp_reward
        progress.completed_at = timezone.now()
        progress.save()

        # Record idempotent XP event in audit ledger
        idempotency_key = f"quest_{user.id}_{quest.id}"
        XPEvent.objects.get_or_create(
            idempotency_key=idempotency_key,
            defaults={
                'user': user,
                'category': XPCategory.LEARNING,
                'amount': quest.xp_reward,
                'reason': f"Completed Quest: {quest.title}"
            }
        )

        user.learning_xp += quest.xp_reward
        user.save()

        log_audit_event(
            actor_name=user.display_name,
            action="quest.completed",
            target_type="LearningQuest",
            target_id=quest.id,
            metadata={'xp_awarded': quest.xp_reward}
        )

        return Response(
            {
                'progress': LearningProgressSerializer(progress).data,
                'xp_awarded': quest.xp_reward
            },
            status=status.HTTP_201_CREATED
        )
