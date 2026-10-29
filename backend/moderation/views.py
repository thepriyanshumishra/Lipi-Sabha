from rest_framework import viewsets, permissions
from .models import AuditEvent
from rest_framework import serializers

class AuditEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditEvent
        fields = ['id', 'actor_name', 'action', 'target_type', 'target_id', 'metadata', 'created_at']

class AuditEventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditEvent.objects.all().order_by('-created_at')
    serializer_class = AuditEventSerializer
    permission_classes = [permissions.AllowAny]
