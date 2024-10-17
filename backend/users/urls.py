from rest_framework import routers

from users import views
from django.urls import re_path

router = routers.SimpleRouter()
router.register(r"", views.UserViewSet)


urlpatterns = router.urls + [
    re_path(
        "tokens/acquire/",
        views.CustomTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    re_path(
        "tokens/renew/",
        views.CustomTokenRenewCreateView.as_view(),
        name="token_refresh",
    ),
]
