from django.db import models
from django.contrib.auth.models import AbstractUser

class UserRole(models.TextChoices):
    VISITOR = 'visitor', 'Visitor'
    LEARNER = 'learner', 'Learner'
    CONTRIBUTOR = 'contributor', 'Contributor'
    REVIEWER = 'reviewer', 'Reviewer'
    SPECIALIST = 'specialist', 'Specialist'
    FACILITATOR = 'facilitator', 'Facilitator'
    ADMIN = 'admin', 'Administrator'

class User(AbstractUser):
    display_name = models.CharField(max_length=150, blank=True)
    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.LEARNER
    )
    learning_xp = models.PositiveIntegerField(default=0)
    review_xp = models.PositiveIntegerField(default=0)
    avatar_url = models.URLField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.display_name:
            self.display_name = self.username
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.display_name} ({self.role})"
