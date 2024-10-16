from rest_framework import serializers


class StartupQuerySerializer(serializers.Serializer):
    qualification_status = serializers.CharField(
        required=False, allow_null=True, default=None
    )
    cohort_id = serializers.IntegerField(required=False)


class UratQuestionAnswerQuerySerializer(serializers.Serializer):
    startup_id = serializers.IntegerField(required=False)


class ReadinessLevelCriterionAnswerQuerySerializer(serializers.Serializer):
    startup_id = serializers.IntegerField(required=False)
    criterion_id = serializers.IntegerField(required=False)


class StartupReadinessLevelQuerySerializer(serializers.Serializer):
    startup_id = serializers.IntegerField(required=False)


class StartupRNAQuerySerializer(serializers.Serializer):
    startup_id = serializers.IntegerField(required=False)


class StartupAnalyticsQuerySerializer(serializers.Serializer):
    cohort_id = serializers.IntegerField()
