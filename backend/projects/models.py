from django.db import models

class ProjectStatus(models.TextChoices):
    DEMO = 'demo', 'Demonstration'
    PROPOSED = 'proposed', 'Proposed'
    ACTIVE = 'active', 'Active Deliberation'
    ARCHIVED = 'archived', 'Archived'

class Visibility(models.TextChoices):
    PUBLIC = 'public', 'Public'
    RESTRICTED = 'restricted', 'Restricted to Project'
    PRIVATE = 'private', 'Private'

class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    language_label = models.CharField(max_length=255)
    community_context = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=ProjectStatus.choices, default=ProjectStatus.DEMO)
    visibility = models.CharField(max_length=20, choices=Visibility.choices, default=Visibility.PUBLIC)
    governance_model = models.CharField(max_length=255, default='Consensus Consultation')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class WritingSystem(models.Model):
    project = models.ForeignKey(Project, related_name='writing_systems', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    script_code = models.CharField(max_length=10, blank=True, help_text="ISO 15924 script code, e.g. Latn, Cyrl, Deva")

    def __str__(self):
        return f"{self.project.name} - {self.name}"

class OrthographyVersion(models.Model):
    project = models.ForeignKey(Project, related_name='orthography_versions', on_delete=models.CASCADE)
    writing_system = models.ForeignKey(WritingSystem, related_name='versions', on_delete=models.CASCADE)
    version_label = models.CharField(max_length=50)
    status = models.CharField(max_length=50, default='draft')
    documentation = models.TextField(blank=True)
    effective_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.writing_system.name} ({self.version_label})"

class OrthographicRule(models.Model):
    orthography_version = models.ForeignKey(OrthographyVersion, related_name='rules', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    explanation = models.TextField()
    examples = models.JSONField(default=list)
    sources = models.JSONField(default=list)
    status = models.CharField(max_length=50, default='approved')
    known_limitations = models.TextField(blank=True)

    def __str__(self):
        return self.title
