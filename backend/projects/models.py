# projects/models.py
from django.db import models
from django.conf import settings
from studios.models import Studio

class Project(models.Model):
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Task(models.Model):
    STAGE_CHOICES = [
        ('DRAFT', 'Draft'),
        ('REVIEW', 'Review'),
        ('REVISION', 'Revision'),
        ('APPROVED', 'Approved'),
        ('COMPLETED', 'Completed'),
    ]

    PRIORITY_CHOICES = [
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    assigned_to = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_tasks')
    
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES, default='DRAFT')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='MEDIUM')
    deadline = models.DateTimeField(null=True, blank=True)

    tags = models.CharField(max_length=255, blank=True, help_text="Comma separated tags")
    attachment_urls = models.TextField(blank=True, help_text="Comma separated URLs")

    def __str__(self):
        return f"{self.title} ({self.get_stage_display()})"