
from rest_framework import permissions
from .models import StudioMembership


class IsStudioAdminOrLead(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            StudioMembership.objects.filter(
                user=request.user,
                role__in=['ADMIN', 'LEAD']
            ).exists()
        )
