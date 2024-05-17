from rest_framework import serializers
from startups import models as startups_models
from tasks import models as tasks_models


class CreateInitialTaskRequestSerializer(serializers.Serializer):
    startup_id = serializers.PrimaryKeyRelatedField(
        queryset=startups_models.Startup.objects, source="startup"
    )
    term = serializers.ChoiceField(
        choices=tasks_models.Task.TaskType.choices,
        help_text="1 is for Short Term and 2 is for Long Term",
    )
    no_of_tasks_to_create = serializers.IntegerField()


class CreateInitialInitiativeRequestSerializer(serializers.Serializer):
    task_id = serializers.PrimaryKeyRelatedField(
        queryset=tasks_models.Task.objects, source="task"
    )
    no_of_initiatives_to_create = serializers.IntegerField()


class CreateInitialRoadblockRequestSerializer(serializers.Serializer):
    startup_id = serializers.PrimaryKeyRelatedField(
        queryset=startups_models.Startup.objects, source="startup"
    )

    no_of_roadblocks_to_create = serializers.IntegerField()
