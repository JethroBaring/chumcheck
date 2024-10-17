from django.db import transaction
from rest_framework import filters, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

from generic.views import BaseViewSet
from users import models
from users import permissions as users_permissions
from users import serializers as users_serializers
from django.conf import settings
from django.db import transaction
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from rest_framework import filters, mixins, status, views
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView, TokenViewBase


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


def _attach_refresh_token(response, refresh_token):
    max_age = settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds()

    response.set_cookie(
        "reftkn",
        refresh_token,
        max_age=max_age,
        httponly=True,  # Important: makes the cookie inaccessible to JavaScript
        samesite="Strict",  # Since backend and frontend are on different domains
        secure=True,
    )


class CustomTokenObtainPairView(TokenViewBase):
    """
    Custom view to obtain the token pair by logging in.
    """

    serializer_class = users_serializers.base.CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        """Create Access Token

        Creates an access token and sets the refresh token in the HTTP_COOKIE
        given valid credentials.
        """
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0]) from e

        data = serializer.validated_data
        response = Response(
            users_serializers.base.TokenObtainResponseSerializer(
                instance={"access_token": data["access"]}
            ).data,
            status=status.HTTP_201_CREATED,
        )

        try:
            refresh_token = data.pop("refresh", None)
            if refresh_token:
                response.delete_cookie("reftkn")

                _attach_refresh_token(response, refresh_token)

        except models.BaseUser.DoesNotExist:
            return Response(
                "User does not exist. Failed to create JWT tokens.",
                status=status.HTTP_400_BAD_REQUEST,
            )

        return response


class CustomTokenRenewCreateView(TokenRefreshView):
    serializer_class = users_serializers.base.CustomTokenRefreshSerializer

    @method_decorator(never_cache)
    def post(self, request, *args, **kwargs):
        """Renew Token

        Returns a new access token using the refresh token from the HTTP_COOKIE
        and attaches a new refresh token to the HTTP_COOKIE.
        """
        refresh_token = request.COOKIES.get("reftkn", None)

        if refresh_token:
            try:
                old_refresh_token = RefreshToken(refresh_token)
                user_id = old_refresh_token.payload.get("user_id")
            except:
                return Response(
                    "The provided token is invalid or already blacklisted.",
                    status=status.HTTP_401_UNAUTHORIZED,
                )
        else:
            return Response(
                "No refresh token acquired.", status=status.HTTP_401_UNAUTHORIZED
            )

        serializer = self.serializer_class(data={}, context={"user_id": user_id})
        serializer.is_valid(raise_exception=True)

        access_token = serializer.validated_data.pop("access")

        response = Response(
            users_serializers.base.TokenObtainResponseSerializer(
                {"access_token": access_token}
            ).data,
            status=status.HTTP_201_CREATED,
        )

        try:
            new_refresh_token = serializer.validated_data.pop("refresh", None)
            if new_refresh_token:
                response.delete_cookie("reftkn")

                _attach_refresh_token(response, new_refresh_token)

        except:
            return Response(
                "User does not exist. Failed to create a new refresh token.",
                status=status.HTTP_400_BAD_REQUEST,
            )

        return response


class LogoutView(views.APIView):
    def post(self, request, *args, **kwargs):
        """Logout

        Deletes the HTTP_COOKIE `refresh_token` and invalidates it.
        """
        refresh_token = request.COOKIES.get("reftkn")
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            raise InvalidToken(
                "The provided token is invalid or already blacklisted"
            ) from e

        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie("reftkn")

        return response
