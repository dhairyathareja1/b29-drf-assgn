from rest_framework.routers import DefaultRouter
from .views import StudioViewSet

router = DefaultRouter()
router.register("", StudioViewSet)
urlpatterns = router.urls