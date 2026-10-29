from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import ReviewTask, ReviewDecision, ReviewTaskStatus
from .serializers import ReviewTaskSerializer, ReviewDecisionSerializer
from contributions.models import ContributionStatus
from accounts.permissions import IsReviewerOrAdmin
from moderation.models import log_audit_event

class ReviewTaskViewSet(viewsets.ModelViewSet):
    queryset = ReviewTask.objects.all().select_related('contribution').prefetch_related('decisions')
    serializer_class = ReviewTaskSerializer

    def get_permissions(self):
        if self.action in ['submit', 'update', 'partial_update', 'destroy']:
            return [IsReviewerOrAdmin()]
        return [permissions.IsAuthenticated()]

    @action(detail=False, methods=['get'])
    def queue(self, request):
        return Response(ReviewTaskSerializer(self.queryset, many=True).data)

    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        task = self.get_object()
        action_chosen = request.data.get('action', 'approve')
        rationale = request.data.get('rationale', '')
        rubric_results = request.data.get('rubric_results', {})

        if not rationale.strip():
            return Response(
                {'error': 'A documented rationale is mandatory for all review decisions.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        decision = ReviewDecision.objects.create(
            review_task=task,
            action=action_chosen,
            rationale=rationale,
            rubric_results=rubric_results
        )

        task.status = ReviewTaskStatus.COMPLETED
        task.completed_at = timezone.now()
        task.save()

        # Update contribution status
        contrib = task.contribution
        if action_chosen == 'approve':
            contrib.status = ContributionStatus.ACCEPTED
        elif action_chosen == 'revision':
            contrib.status = ContributionStatus.REVISION_REQUESTED
        elif action_chosen == 'escalate':
            task.status = ReviewTaskStatus.ESCALATED
            task.save()
        contrib.reviewer_feedback = rationale
        contrib.save()

        # Log immutable audit event
        actor_name = request.user.display_name if request.user.is_authenticated else 'Anonymous Reviewer'
        log_audit_event(
            actor_name=actor_name,
            action=f"review.{action_chosen}",
            target_type="Contribution",
            target_id=contrib.id,
            metadata={'review_task_id': task.id, 'decision_id': decision.id}
        )

        # Grant Reviewer XP (audited) if user is authenticated
        if request.user.is_authenticated:
            from gamification.models import XPEvent, XPCategory
            XPEvent.objects.create(
                user=request.user,
                category=XPCategory.REVIEW,
                amount=50,
                reason=f"Completed review #{task.id} for project {contrib.project.name}",
                idempotency_key=f"review_{task.id}_{decision.id}"
            )
            request.user.review_xp += 50
            request.user.save()

        return Response(ReviewDecisionSerializer(decision).data, status=status.HTTP_201_CREATED)
