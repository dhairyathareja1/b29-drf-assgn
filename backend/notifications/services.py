from .models import Notification

def create_notification(user, type, message):
    Notification.objects.create(user=user, type = type, message=message)