from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Contribution, ContributionStatus
from .serializers import ContributionSerializer
from moderation.models import log_audit_event
from accounts.models import UserRole

class ContributionViewSet(viewsets.ModelViewSet):
    queryset = Contribution.objects.all().order_by('-created_at')
    serializer_class = ContributionSerializer

    def get_permissions(self):
        if self.action in ['create', 'mine', 'withdraw']:
            return [permissions.IsAuthenticated()]
        if self.action in ['destroy', 'update', 'partial_update']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        contribution = serializer.save(contributor=user)

        log_audit_event(
            actor_name=user.display_name if user else 'Contributor',
            action="contribution.created",
            target_type="Contribution",
            target_id=contribution.id,
            metadata={'type': contribution.contribution_type, 'project_id': contribution.project_id}
        )

    @action(detail=False, methods=['get'])
    def mine(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
        qs = self.queryset.filter(contributor=request.user)
        return Response(ContributionSerializer(qs, many=True).data)

    @action(detail=True, methods=['post'])
    def withdraw(self, request, pk=None):
        contribution = self.get_object()

        # Authorization: Only the contributor or an admin can withdraw
        if contribution.contributor != request.user and request.user.role != UserRole.ADMIN:
            return Response(
                {'error': 'Unauthorized: You can only withdraw your own submissions.'},
                status=status.HTTP_403_FORBIDDEN
            )

        if contribution.status == ContributionStatus.ACCEPTED:
            return Response(
                {'error': 'Cannot withdraw an accepted contribution directly; submit a reconsideration request in Sabha.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        contribution.status = ContributionStatus.WITHDRAWN
        contribution.save()

        log_audit_event(
            actor_name=request.user.display_name,
            action="contribution.withdrawn",
            target_type="Contribution",
            target_id=contribution.id
        )

        return Response({'status': 'withdrawn', 'message': 'Contribution successfully withdrawn.'})
