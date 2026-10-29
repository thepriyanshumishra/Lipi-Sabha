from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Proposal, ProposalParticipation, DecisionRecord
from .serializers import ProposalSerializer, ProposalParticipationSerializer, DecisionRecordSerializer
from moderation.models import log_audit_event

class ProposalViewSet(viewsets.ModelViewSet):
    queryset = Proposal.objects.all().select_related('project').prefetch_related('options', 'participations')
    serializer_class = ProposalSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['post'], permission_classes=[permissions.AllowAny])
    def participate(self, request, pk=None):
        proposal = self.get_object()
        feedback_text = request.data.get('feedback_text', '').strip()
        author_name = request.data.get('author_name', '').strip()

        if not feedback_text:
            return Response({'error': 'feedback_text cannot be blank.'}, status=status.HTTP_400_BAD_REQUEST)

        if not author_name:
            if request.user.is_authenticated:
                author_name = request.user.display_name
            else:
                author_name = 'Community Member'

        user = request.user if request.user.is_authenticated else None
        participation = ProposalParticipation.objects.create(
            proposal=proposal,
            user=user,
            author_name=author_name,
            feedback_text=feedback_text
        )

        log_audit_event(
            actor_name=author_name,
            action="proposal.feedback_submitted",
            target_type="Proposal",
            target_id=proposal.id,
            metadata={'participation_id': participation.id}
        )

        return Response(ProposalParticipationSerializer(participation).data, status=status.HTTP_201_CREATED)

class DecisionRecordViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DecisionRecord.objects.all()
    serializer_class = DecisionRecordSerializer
    permission_classes = [permissions.AllowAny]
