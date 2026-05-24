from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Comment
from .serializers import CommentSerializer
from .permissions import IsCommentOwnerOrReadOnly
from notifications.services import create_notification

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsCommentOwnerOrReadOnly]
    filter_backends = [ DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["task"]
    ordering_fields = ["created_at"]
    ordering = ["created_at"]

    def get_queryset(self):
        return Comment.objects.filter(task__project__studio__memberships__user=self.request.user)
    
    def perform_create(self, serializer):
        comment = serializer.save(user=self.request.user)
        task = comment.task
        if task.assigned_to and task.assigned_to != self.request.user:
            create_notification( user=task.assigned_to, type="COMMENT", message=f"New comment on task: {task.title}")