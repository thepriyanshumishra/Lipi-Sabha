from django.db import models
from django.conf import settings

class DifficultyLevel(models.TextChoices):
    BEGINNER = 'beginner', 'Beginner'
    INTERMEDIATE = 'intermediate', 'Intermediate'
    ADVANCED = 'advanced', 'Advanced'

class LearningQuest(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    difficulty = models.CharField(max_length=20, choices=DifficultyLevel.choices, default=DifficultyLevel.BEGINNER)
    xp_reward = models.PositiveIntegerField(default=100)
    icon = models.CharField(max_length=10, default='✦')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class LearningLesson(models.Model):
    quest = models.ForeignKey(LearningQuest, related_name='lessons', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=1)
    content = models.JSONField(default=dict)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.quest.title} - {self.title}"

class LearningProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='quest_progress', on_delete=models.CASCADE)
    quest = models.ForeignKey(LearningQuest, related_name='user_progress', on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    xp_earned = models.PositiveIntegerField(default=0)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'quest')

    def __str__(self):
        return f"{self.user} - {self.quest.title} ({'Done' if self.completed else 'In Progress'})"
