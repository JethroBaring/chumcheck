from rest_framework import serializers
from tasks import models as tasks_models


class TaskQuerySerializer(serializers.Serializer):
    startup_id = serializers.IntegerField(required=False)
    task_type = serializers.ChoiceField(
        required=False, choices=tasks_models.TaskStatus.choices
    )
    is_ai_generated = serializers.BooleanField(required=False)


class InitiativeQuerySerializer(serializers.Serializer):
    task_id = serializers.IntegerField(required=False)
    is_ai_generated = serializers.BooleanField(required=False)
    startup_id = serializers.IntegerField(required=False)

class RoadblockQuerySerializer(serializers.Serializer):
    startup_id = serializers.IntegerField(required=False)
    is_ai_generated = serializers.BooleanField(required=False)
