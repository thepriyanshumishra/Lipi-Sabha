from django.db import models
from django.conf import settings
from contributions.models import Contribution

class ReviewTaskStatus(models.TextChoices):
    ASSIGNED = 'assigned', 'Assigned'
    IN_PROGRESS = 'in_progress', 'In Progress'
    COMPLETED = 'completed', 'Completed'
    ESCALATED = 'escalated', 'Escalated to Specialist'

class ReviewTask(models.Model):
    contribution = models.ForeignKey(Contribution, related_name='review_tasks', on_delete=models.CASCADE)
    assigned_reviewer = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='assigned_reviews', on_delete=models.CASCADE, null=True, blank=True)
    status = models.CharField(max_length=30, choices=ReviewTaskStatus.choices, default=ReviewTaskStatus.ASSIGNED)
    task_scope = models.CharField(max_length=255)
    assigned_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Review #{self.id} for Contribution #{self.contribution_id}"

class ReviewDecision(models.Model):
    review_task = models.ForeignKey(ReviewTask, related_name='decisions', on_delete=models.CASCADE)
    action = models.CharField(max_length=50)
    rationale = models.TextField()
    rubric_results = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Decision [{self.action}] on Task #{self.review_task_id}"
