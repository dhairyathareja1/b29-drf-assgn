from rest_framework import serializers
from .models import Project, Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'studio', 'tasks', 'created_at']


# EXAmple->
# {
#   "id": 1,
#   "name": "Toy Story",
#   "description": "Animated film project",
#   "studio": 2,
#   "created_at": "2026-05-23T12:00:00",
#   "tasks": [
#     {
#       "id": 10,
#       "title": "Storyboard",
#       "stage": "DRAFT",
#       "priority": "HIGH",
#       "deadline": "2026-06-01T12:00:00"
#     },
#     {
#       "id": 11,
#       "title": "Voice Recording",
#       "stage": "REVIEW",
#       "priority": "MEDIUM"
#     }
#   ]
# }
