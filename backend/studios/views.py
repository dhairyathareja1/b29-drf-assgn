from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Studio, StudioMembership
from .serializers import StudioSerializer

class StudioViewSet(viewsets.ModelViewSet):
    queryset = Studio.objects.all()
    serializer_class = StudioSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        studio = serializer.save()
        StudioMembership.objects.create(
            user=self.request.user,
            studio=studio,
            role='ADMIN'
        )