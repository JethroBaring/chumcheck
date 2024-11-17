from rest_framework import routers

from users import views
from django.urls import re_path

router = routers.SimpleRouter()
router.register(r"", views.UserViewSet)


urlpatterns = router.urls