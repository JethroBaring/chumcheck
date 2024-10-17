from drf_yasg.utils import swagger_serializer_method
from rest_framework import serializers

from readinesslevel import models as readinesslevel_models
from startups import models as startups_models
from startups.utils import calculate_levels


class StartupMemberBaseSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source="user", read_only=True)
    startup_id = serializers.PrimaryKeyRelatedField(source="startup", read_only=True)

    class Meta:
        model = startups_models.StartupMember
        fields = ["id", "user_id", "startup_id", "first_name", "last_name", "email"]


class StartupBaseSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source="user", read_only=True)
    members = serializers.SerializerMethodField(method_name="_members")

    class Meta:
        model = startups_models.Startup
        fields = [
            "id",
            "name",
            "user_id",
            "qualification_status",
            "data_privacy",
            "capsule_proposal",
            "links",
            "group_name",
            "university_name",
            "eligibility",
            "members",
            "leader_first_name",
            "leader_last_name",
            "leader_email",
        ]

    @swagger_serializer_method(StartupMemberBaseSerializer())
    def _members(self, startup):
        return StartupMemberBaseSerializer(startup.members.all(), many=True).data


class UratQuestionAnswerBaseSerializer(serializers.ModelSerializer):
    startup_id = serializers.PrimaryKeyRelatedField(
        source="startup", queryset=startups_models.Startup.objects
    )
    urat_question_id = serializers.PrimaryKeyRelatedField(
        source="urat_question", queryset=readinesslevel_models.URATQuestion.objects
    )
    score = serializers.IntegerField()
    readiness_type = serializers.CharField(
        source="urat_question.readiness_type.get_rl_type_display", read_only=True
    )

    class Meta:
        model = startups_models.URATQuestionAnswer
        fields = [
            "id",
            "startup_id",
            "urat_question_id",
            "response",
            "score",
            "readiness_type",
        ]


class ReadinessLevelCriterionAnswerBaseSerializer(serializers.ModelSerializer):
    startup_id = serializers.PrimaryKeyRelatedField(
        source="startup", queryset=startups_models.Startup.objects
    )
    criterion_id = serializers.PrimaryKeyRelatedField(
        source="criterion", queryset=readinesslevel_models.LevelCriterion.objects
    )
    remark = serializers.CharField(required=False, allow_blank=True)
    readiness_type = serializers.CharField(
        source="criterion.readiness_level.readiness_type.get_rl_type_display",
        read_only=True,
    )

    class Meta:
        model = startups_models.ReadinessLevelCriterionAnswer
        fields = [
            "id",
            "startup_id",
            "criterion_id",
            "score",
            "remark",
            "readiness_type",
        ]


class StartupReadinessLevelBaseSerializer(serializers.ModelSerializer):
    startup_id = serializers.PrimaryKeyRelatedField(
        source="startup", queryset=startups_models.Startup.objects
    )
    readiness_level_id = serializers.PrimaryKeyRelatedField(
        source="readiness_level", queryset=readinesslevel_models.ReadinessLevel.objects
    )
    readiness_level = serializers.IntegerField(
        source="readiness_level.level", read_only=True
    )
    readiness_type = serializers.CharField(
        source="readiness_level.readiness_type.get_rl_type_display", read_only=True
    )

    class Meta:
        model = startups_models.StartupReadinessLevel
        fields = [
            "id",
            "startup_id",
            "readiness_level_id",
            "readiness_level",
            "readiness_type",
        ]


class CalculatorQuestionAnswerBaseSerializer(serializers.ModelSerializer):
    startup_id = serializers.PrimaryKeyRelatedField(
        source="startup", queryset=startups_models.Startup.objects
    )
    calculator_question_id = serializers.PrimaryKeyRelatedField(
        source="calculator_question",
        queryset=readinesslevel_models.CalculatorQuestion.objects,
    )

    class Meta:
        model = startups_models.CalculatorQuestionAnswer
        fields = [
            "id",
            "startup_id",
            "calculator_question_id",
        ]


class CapsuleProposalInfoBaseSerializer(serializers.ModelSerializer):
    startup_id = serializers.PrimaryKeyRelatedField(
        source="startup", queryset=startups_models.Startup.objects
    )

    class Meta:
        model = startups_models.CapsuleProposalInfo
        fields = [
            "id",
            "title",
            "startup_description",
            "problem_statement",
            "target_market",
            "solution_description",
            "objectives",
            "scope",
            "methodology",
            "startup_id",
        ]

    def update(self, instance, validated_data):
        validated_data.pop("startup", None)
        return super().update(instance, validated_data)


class StartupRNABaseSerializer(serializers.ModelSerializer):
    startup_id = serializers.PrimaryKeyRelatedField(
        source="startup", queryset=startups_models.Startup.objects
    )
    readiness_level_id = serializers.PrimaryKeyRelatedField(
        source="readiness_level", queryset=readinesslevel_models.ReadinessLevel.objects
    )
    is_ai_generated = serializers.BooleanField(read_only=True)

    class Meta:
        model = startups_models.StartupRNA
        fields = ["id", "startup_id", "readiness_level_id", "rna", "is_ai_generated"]


class CohortBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = startups_models.Cohort
        fields = ["id", "name"]
