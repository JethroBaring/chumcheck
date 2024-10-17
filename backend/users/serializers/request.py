import re

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from users import models as users_models


def validate_signup_password(password):
    if len(password) < 8:
        raise serializers.ValidationError(
            "Password must be at least 8 characters long."
        )

    if len(password) > 30:
        raise serializers.ValidationError(
            "Password must be less than 30 characters long."
        )

    if not any(char.isupper() for char in password):
        raise serializers.ValidationError(
            "Password must contain at least one uppercase letter."
        )

    if not any(char.islower() for char in password):
        raise serializers.ValidationError(
            "Password must contain at least one lowercase letter."
        )

    if not any(char.isdigit() for char in password):
        raise serializers.ValidationError("Password must contain at least one digit.")

    if not re.search(r'[!@#$_^"\';.,?&-]', password):
        raise serializers.ValidationError(
            "Password must contain at least one special character."
        )


class SignupUserRequestSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=users_models.BaseUser.objects.all(),
                message="This email has already been used.",
            )
        ]
    )
    password = serializers.CharField(
        validators=[validate_signup_password], write_only=True
    )
    confirm_password = serializers.CharField(max_length=30, write_only=True)

    user_type = serializers.CharField(read_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = users_models.BaseUser
        fields = [
            "id",
            "user_type",
            "email",
            "first_name",
            "last_name",
            "password",
            "confirm_password",
        ]
