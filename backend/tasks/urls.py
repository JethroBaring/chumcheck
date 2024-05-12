from rest_framework import routers
from tasks import views

router = routers.SimpleRouter()
router.register(r"", views.TaskViewSet)
router.register(r"initiatives", views.InitiativeViewSet)
router.register(r"roadblocks", views.RoadblockViewSet)

urlpatterns = router.urls
