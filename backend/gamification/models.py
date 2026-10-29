from django.db import models
from django.conf import settings

class XPCategory(models.TextChoices):
    LEARNING = 'learning', 'Learning XP'
    REVIEW = 'review', 'Review XP'
    CONTRIBUTION = 'contribution', 'Contribution XP'

class XPEvent(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='xp_events', on_delete=models.CASCADE)
    category = models.CharField(max_length=20, choices=XPCategory.choices)
    amount = models.PositiveIntegerField()
    reason = models.CharField(max_length=255)
    idempotency_key = models.CharField(max_length=100, unique=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} +{self.amount} {self.category} ({self.reason})"

class BadgeDefinition(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=10, default='🏅')
    category = models.CharField(max_length=20, choices=XPCategory.choices)

    def __str__(self):
        return self.name
