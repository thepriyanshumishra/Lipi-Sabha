from django.db import models
from django.conf import settings
from projects.models import Project

class ProposalStatus(models.TextChoices):
    OPEN = 'open', 'Open for Deliberation'
    CONSULTATION = 'consultation', 'Community Consultation'
    VOTING = 'voting', 'Formal Voting'
    DECIDED = 'decided', 'Decided'
    DEFERRED = 'deferred', 'Deferred'
    WITHDRAWN = 'withdrawn', 'Withdrawn'

class Proposal(models.Model):
    project = models.ForeignKey(Project, related_name='proposals', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    scope = models.TextField()
    background = models.TextField()
    problem = models.TextField()
    process = models.CharField(max_length=255, default='Consensus Discussion')
    status = models.CharField(max_length=30, choices=ProposalStatus.choices, default=ProposalStatus.OPEN)
    author_display_name = models.CharField(max_length=150, default='Facilitator')
    timeline = models.CharField(max_length=255, blank=True)
    evidence = models.TextField(blank=True)
    limitations = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.project.name} - {self.title}"

class ProposalOption(models.Model):
    proposal = models.ForeignKey(Proposal, related_name='options', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    advantages = models.TextField(blank=True)
    disadvantages = models.TextField(blank=True)

    def __str__(self):
        return self.title

class ProposalParticipation(models.Model):
    proposal = models.ForeignKey(Proposal, related_name='participations', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='proposal_feedbacks', on_delete=models.CASCADE, null=True, blank=True)
    author_name = models.CharField(max_length=150)
    feedback_text = models.TextField()
    perspective_type = models.CharField(max_length=50, default='community_voice')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Feedback by {self.author_name} on {self.proposal.title}"

class DecisionRecord(models.Model):
    proposal = models.OneToOneField(Proposal, related_name='decision_record', on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=255)
    scope = models.TextField()
    process_used = models.CharField(max_length=255)
    outcome = models.CharField(max_length=50, default='accepted')
    evidence_considered = models.TextField()
    limitations = models.TextField(blank=True)
    dissenting_views = models.TextField(blank=True)
    unresolved_issues = models.TextField(blank=True)
    decided_at = models.DateField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Decision records preserve permanent history
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Decision: {self.title} [{self.outcome}]"
