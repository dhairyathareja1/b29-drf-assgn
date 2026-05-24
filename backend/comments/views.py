from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Comment
from .serializers import CommentSerializer
from notifications.services import create_notification

class CommentViewSet(viewsets.ModelViewSet):

    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.filter(task__project__studio__memberships__user= self.request.user)

    def perform_create(self, serializer):

        comment = serializer.save(user=self.request.user)
        task = comment.task

        if task.assigned_to:
            if task.assigned_to != self.request.user:
                create_notification(task.assigned_to, "New comment on task: " + task.title)