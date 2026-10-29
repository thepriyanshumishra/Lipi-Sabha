from django.db import models

class AuditEvent(models.Model):
    actor_name = models.CharField(max_length=150)
    action = models.CharField(max_length=100)
    target_type = models.CharField(max_length=100)
    target_id = models.PositiveIntegerField()
    metadata = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        # Strict append-only safeguard: prevent updates to existing rows
        if self.pk is not None:
            raise PermissionError("Audit events are immutable and cannot be updated.")
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Strict safeguard: prevent deletion of audit events
        raise PermissionError("Audit events are permanent and cannot be deleted.")

    def __str__(self):
        return f"[{self.action}] by {self.actor_name} on {self.target_type} #{self.target_id}"

def log_audit_event(actor_name: str, action: str, target_type: str, target_id: int, metadata: dict = None):
    """
    Transactional utility to write an immutable audit log entry.
    """
    return AuditEvent.objects.create(
        actor_name=actor_name,
        action=action,
        target_type=target_type,
        target_id=target_id,
        metadata=metadata or {}
    )
