# studios/models.py
from django.db import models
from django.conf import settings

class Studio(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class StudioMembership(models.Model):
    ROLE_CHOICES = [
        ('ADMIN', 'Studio Admin'),
        ('LEAD', 'Project Lead'),
        ('DESIGNER', 'Designer'),
        ('WRITER', 'Writer'),
        ('REVIEWER', 'Reviewer'),
        ('CLIENT', 'Client Viewer'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='memberships')
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE, related_name='memberships')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'studio')

    def __str__(self):
        return f"{self.user.username} - {self.role} at {self.studio.name}"