# projects/views.py
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer
from studios.permissions import IsStudioAdminOrLead
from rest_framework.permissions import IsAuthenticated

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsStudioAdminOrLead] 

    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(studio__memberships__user=user)

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['stage', 'priority', 'project', 'assigned_to']
    search_fields = ['title', 'description', 'tags']
    ordering_fields = ['deadline', 'created_at']

    def get_queryset(self):
        return Task.objects.filter(project__studio__memberships__user=self.request.user)