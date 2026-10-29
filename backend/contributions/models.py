from django.db import models
from django.conf import settings
from projects.models import Project

class ContributionType(models.TextChoices):
    EXAMPLE_WORD = 'example_word', 'Example Word'
    EXAMPLE_SENTENCE = 'example_sentence', 'Example Sentence'
    RULE_SUGGESTION = 'rule_suggestion', 'Orthographic Rule Suggestion'
    LEARNING_MATERIAL = 'learning_material', 'Learning Material'
    TRANSLATION = 'translation', 'Translation'
    ACCESSIBILITY_FEEDBACK = 'accessibility_feedback', 'Accessibility Feedback'

class ContributionStatus(models.TextChoices):
    DRAFT = 'draft', 'Draft'
    SUBMITTED = 'submitted', 'Submitted'
    UNDER_REVIEW = 'under_review', 'Under Review'
    REVISION_REQUESTED = 'revision_requested', 'Revision Requested'
    ACCEPTED = 'accepted', 'Accepted for Documentation'
    REJECTED = 'rejected', 'Rejected'
    WITHDRAWN = 'withdrawn', 'Withdrawn by Contributor'

class Contribution(models.Model):
    contributor = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='contributions', on_delete=models.CASCADE, null=True, blank=True)
    project = models.ForeignKey(Project, related_name='contributions', on_delete=models.CASCADE)
    contribution_type = models.CharField(max_length=50, choices=ContributionType.choices, default=ContributionType.EXAMPLE_WORD)
    content = models.TextField()
    language_variety = models.CharField(max_length=255, blank=True)
    writing_system = models.CharField(max_length=255, blank=True)
    context = models.TextField(blank=True)
    source = models.CharField(max_length=255, blank=True)
    source_type = models.CharField(max_length=50, default='spoken')
    visibility = models.CharField(max_length=20, default='project')
    status = models.CharField(max_length=30, choices=ContributionStatus.choices, default=ContributionStatus.SUBMITTED)
    reviewer_feedback = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"[{self.status}] {self.project.name} - {self.contribution_type}"
