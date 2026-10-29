from rest_framework import serializers
from .models import ReviewTask, ReviewDecision
from contributions.serializers import ContributionSerializer

class ReviewDecisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewDecision
        fields = ['id', 'review_task', 'action', 'rationale', 'rubric_results', 'created_at']

class ReviewTaskSerializer(serializers.ModelSerializer):
    contribution = ContributionSerializer(read_only=True)
    decisions = ReviewDecisionSerializer(many=True, read_only=True)

    class Meta:
        model = ReviewTask
        fields = [
            'id',
            'contribution',
            'assigned_reviewer',
            'status',
            'task_scope',
            'assigned_at',
            'completed_at',
            'decisions',
        ]
