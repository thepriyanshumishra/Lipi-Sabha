from rest_framework import serializers
from .models import Project, WritingSystem, OrthographyVersion, OrthographicRule

class WritingSystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WritingSystem
        fields = ['id', 'name', 'description', 'script_code']

class ProjectSerializer(serializers.ModelSerializer):
    writing_systems = WritingSystemSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id',
            'name',
            'description',
            'language_label',
            'community_context',
            'status',
            'visibility',
            'governance_model',
            'writing_systems',
            'created_at',
            'updated_at',
        ]

class OrthographicRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrthographicRule
        fields = ['id', 'title', 'explanation', 'examples', 'sources', 'status', 'known_limitations']

class OrthographyVersionSerializer(serializers.ModelSerializer):
    rules = OrthographicRuleSerializer(many=True, read_only=True)

    class Meta:
        model = OrthographyVersion
        fields = ['id', 'project', 'writing_system', 'version_label', 'status', 'documentation', 'effective_date', 'rules']
