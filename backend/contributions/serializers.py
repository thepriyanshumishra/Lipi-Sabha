from rest_framework import serializers
from .models import Contribution

class ContributionSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(source='project.name', read_only=True)

    class Meta:
        model = Contribution
        fields = [
            'id',
            'contributor',
            'project',
            'project_name',
            'contribution_type',
            'content',
            'language_variety',
            'writing_system',
            'context',
            'source',
            'source_type',
            'visibility',
            'status',
            'reviewer_feedback',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'status', 'reviewer_feedback', 'created_at', 'updated_at']
