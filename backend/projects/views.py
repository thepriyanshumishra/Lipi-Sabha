from rest_framework import viewsets, permissions
from .models import Project, OrthographyVersion, OrthographicRule
from .serializers import ProjectSerializer, OrthographyVersionSerializer, OrthographicRuleSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().prefetch_related('writing_systems')
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]

class OrthographyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OrthographyVersion.objects.all().prefetch_related('rules')
    serializer_class = OrthographyVersionSerializer
    permission_classes = [permissions.AllowAny]

class OrthographicRuleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OrthographicRule.objects.all()
    serializer_class = OrthographicRuleSerializer
    permission_classes = [permissions.AllowAny]
