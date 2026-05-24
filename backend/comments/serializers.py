from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "task", "user", "username", "text", "created_at", "parent"]
        read_only_fields = ["user", "username", "created_at"]

    def validate_task(self, task):
        user = self.context["request"].user
        membership_exists = task.project.studio.memberships.filter( user=user).exists()
        if not membership_exists:
            raise serializers.ValidationError( "You are not part of this studio")
        return task