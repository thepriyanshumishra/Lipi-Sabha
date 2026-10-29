from rest_framework import serializers
from .models import Proposal, ProposalOption, ProposalParticipation, DecisionRecord

class ProposalOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProposalOption
        fields = ['id', 'title', 'description', 'advantages', 'disadvantages']

class ProposalParticipationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProposalParticipation
        fields = ['id', 'proposal', 'author_name', 'feedback_text', 'perspective_type', 'created_at']
        read_only_fields = ['id', 'created_at']

class ProposalSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(source='project.name', read_only=True)
    options = ProposalOptionSerializer(many=True, read_only=True)
    participations = ProposalParticipationSerializer(many=True, read_only=True)

    class Meta:
        model = Proposal
        fields = [
            'id',
            'project',
            'project_name',
            'title',
            'scope',
            'background',
            'problem',
            'process',
            'status',
            'author_display_name',
            'timeline',
            'evidence',
            'limitations',
            'options',
            'participations',
            'created_at',
            'updated_at',
        ]

class DecisionRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = DecisionRecord
        fields = [
            'id',
            'proposal',
            'title',
            'scope',
            'process_used',
            'outcome',
            'evidence_considered',
            'limitations',
            'dissenting_views',
            'unresolved_issues',
            'decided_at',
        ]
