from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ValidationError

from users import models as users_models


class UserBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = users_models.BaseUser
        fields = [
            "id",
            "user_type",
            "email",
            "first_name",
            "last_name",
        ]


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass


class CustomTokenRefreshSerializer(serializers.Serializer):
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    token_class = RefreshToken

    def validate(self, attrs):
        user_id = self.context.get("user_id")

        try:
            user_obj = users_models.BaseUser.objects.get(id=user_id)
        except users_models.BaseUser.DoesNotExist as exc:
            raise ValidationError(f"No user found in the request. {user_id}") from exc

        new_refresh_token = self.token_class.for_user(user_obj)

        data = {
            "access": str(new_refresh_token.access_token),
            "refresh": str(new_refresh_token),
        }

        return data


class TokenObtainResponseSerializer(serializers.Serializer):
    access_token = serializers.CharField()
