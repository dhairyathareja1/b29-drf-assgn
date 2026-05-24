from django.contrib import admin
from .models import Studio
from .models import StudioMembership

admin.site.register(Studio)
admin.site.register(StudioMembership)