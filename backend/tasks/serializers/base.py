from rest_framework import serializers
from drf_yasg.utils import swagger_serializer_method
from readinesslevel import models as readinesslevel_models
from tasks import models as tasks_models
from startups import models as startups_models

from users import models as users_models


class TaskBaseSerializer(serializers.ModelSerializer):
    readiness_type_id = serializers.PrimaryKeyRelatedField(
        source="readiness_type", queryset=readinesslevel_models.ReadinessType.objects
    )
    target_level_id = serializers.PrimaryKeyRelatedField(
        source="target_level", queryset=readinesslevel_models.ReadinessLevel.objects
    )
    target_level_score_id = serializers.PrimaryKeyRelatedField(
        source="target_level_score",
        queryset=readinesslevel_models.ReadinessLevel.objects,
        required=False,
    )
    startup_id = serializers.PrimaryKeyRelatedField(
        source="startup", queryset=startups_models.Startup.objects
    )

    class Meta:
        model = tasks_models.Task
        fields = [
            "id",
            "priority_number",
            "readiness_type_id",
            "target_level_id",
            "target_level_score_id",
            "description",
            "status",
            "startup_id",
            "task_type",
            "due_date",
            "readiness_type_rl_type",
            "target_level_level",
        ]


class InitiativeBaseSerializer(serializers.ModelSerializer):
    task_id = serializers.PrimaryKeyRelatedField(
        source="task", queryset=tasks_models.Task.objects
    )

    class Meta:
        model = tasks_models.Initiative
        fields = [
            "id",
            "initiative_number",
            "description",
            "measures",
            "targets",
            "remarks",
            "status",
            "task_id",
        ]


class RoadblockBaseSerializer(serializers.ModelSerializer):
    assignee_id = serializers.PrimaryKeyRelatedField(
        source="assignee",
        queryset=users_models.BaseUser.objects,
        allow_null=True,
        default=None,
        required=False,
    )
    startup_id = serializers.PrimaryKeyRelatedField(
        source="startup", queryset=startups_models.Startup.objects
    )

    class Meta:
        model = tasks_models.Roadblock
        fields = [
            "id",
            "risk_number",
            "description",
            "fix",
            "assignee_id",
            "startup_id",
        ]
