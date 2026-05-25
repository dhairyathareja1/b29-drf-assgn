from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Studio
from .serializers import StudioSerializer

class StudioViewSet(viewsets.ModelViewSet):
    queryset = Studio.objects.all()
    serializer_class = StudioSerializer
    permission_classes = [IsAuthenticated]