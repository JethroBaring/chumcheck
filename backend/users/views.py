from rest_framework import mixins
from generic.views import BaseViewSet
from users import models
from users import serializers as users_serializers
from users import permissions as users_permissions
from django.db import transaction
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import filters


class UserViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, BaseViewSet):
    queryset = models.BaseUser.objects
    serializer_class = users_serializers.base.UserBaseSerializer

    filter_backends = [filters.SearchFilter]
    search_fields = ["email", "first_name", "last_name"]

    def get_permissions(self):
        viewset_action = self.action

        if viewset_action == "retrieve":
            return [users_permissions.IsOwnerOfUserPermission()]

        return super().get_permissions()

    def get_queryset(self):
        queryset = super().get_queryset()
        request = self.request
        viewset_action = self.action

        serializer = users_serializers.query.UserQuerySerializer(
            data=request.query_params
        )

        serializer.is_valid(raise_exception=True)

        user_type = serializer.validated_data.get("user_type")
        if user_type:
            queryset = queryset.filter(user_type=user_type)

        if (
            viewset_action == "list"
            and request.user.user_type == models.BaseUser.UserType.STARTUP
        ):
            queryset = queryset.filter(user_type=models.BaseUser.UserType.STARTUP)

        return queryset.all()

    def retrieve(self, request, *args, **kwargs):
        """Retrieve User

        Gets a User Instance.
        """
        return super().retrieve(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        """List Users

        Gets a collection of Users instances.
        """
        return super().list(request, *args, **kwargs)

    @transaction.atomic
    @action(url_path="signup", detail=False, methods=["POST"], permission_classes=[])
    def signup(self, request):
        serializer = users_serializers.request.SignupUserRequestSerializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        # Account Information
        email = serializer.validated_data.pop("email")
        password = serializer.validated_data.pop("password")
        serializer.validated_data.pop("confirm_password")

        user = models.BaseUser.objects.create_user(
            email, "S", password, **serializer.validated_data
        )

        return Response(users_serializers.base.UserBaseSerializer(user).data)
