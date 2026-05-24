from django.db import models
from django.conf import settings

class Notification(models.Model):

    TYPE_CHOICES = [("COMMENT", "comment"), ("TASK_ASSIGNED", "Task Assigned"), ("TASK_UPDATED", "Task Updated"), ("PROJECT_CREATED", "Project Created")]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name= "notifications")
    
    type = models.CharField(max_length=50, choices=TYPE_CHOICES, default="COMMENT")

    message = models.CharField(max_length=255)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.message