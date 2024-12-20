from drf_yasg.utils import swagger_serializer_method
from readinesslevel import models as readinesslevel_models
from readinesslevel import serializers as readinesslevel_serializers
from rest_framework import serializers
from tasks import serializers as tasks_serializers
from users import models as users_models

from startups import models as startups_models


class StartupMemberBaseSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(
        source="user", queryset=users_models.BaseUser.objects
    )
    startup_id = serializers.PrimaryKeyRelatedField(
        source="startup", queryset=startups_models.Startup.objects
    )

    class Meta:
        model = startups_models.StartupMember
        fields = ["id", "user_id", "startup_id", "first_name", "last_name", "email"]


class StartupContractedMemberBaseSerializer(serializers.ModelSerializer):
    startup_id = serializers.PrimaryKeyRelatedField(
        source="startup", queryset=startups_models.Startup.objects
    )

    class Meta:
        model = startups_models.StartupContractedMember
        fields = ["id", "startup_id", "first_name", "last_name"]


class MentorSerializer(serializers.ModelSerializer):
    class Meta:
        model = users_models.MentorUser
        fields = ["id", "first_name", "last_name", "email"]


class StartupBaseSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source="user", read_only=True)
    members = serializers.SerializerMethodField(method_name="_members")
    contracted_members = serializers.SerializerMethodField(
        method_name="_contracted_members"
    )
    mentors = serializers.SerializerMethodField(method_name="_mentors")  # Add this line

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
            "contracted_members",
            "mentors",
        ]

    @swagger_serializer_method(StartupMemberBaseSerializer())
    def _members(self, startup):
        return StartupMemberBaseSerializer(startup.members.all(), many=True).data

    @swagger_serializer_method(StartupContractedMemberBaseSerializer())
    def _contracted_members(self, startup):
        return StartupContractedMemberBaseSerializer(
            startup.contracted_members.all(), many=True
        ).data

    @swagger_serializer_method(MentorSerializer())  # Use your serializer for mentors
    def _mentors(self, startup):
        return MentorSerializer(startup.mentors.all(), many=True).data


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
    remark = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = startups_models.StartupReadinessLevel
        fields = [
            "id",
            "startup_id",
            "readiness_level_id",
            "readiness_level",
            "readiness_type",
            "remark",
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

    class Meta:
        model = startups_models.StartupRNA
        fields = [
            "id",
            "startup_id",
            "readiness_level_id",
            "readiness_level_level",
            "readiness_type_rl_type",
            "rna",
            "is_ai_generated",
        ]


class CohortBaseSerializer(serializers.ModelSerializer):
    startup_count = serializers.SerializerMethodField()

    class Meta:
        model = startups_models.Cohort
        fields = ["id", "name", "startup_count"]

    def get_startup_count(self, obj):
        return obj.startups.count()


class ProgressReportResponseSerializer(StartupBaseSerializer):
    class ProgressReportTaskSerializer(tasks_serializers.base.TaskBaseSerializer):
        initiatives = tasks_serializers.base.InitiativeBaseSerializer(many=True)
        status = serializers.CharField(source="get_status_display", read_only=True)

        class Meta:
            model = tasks_serializers.base.TaskBaseSerializer.Meta.model
            fields = [
                "id",
                "priority_number",
                "description",
                "status",
                "task_type",
                "due_date",
                "readiness_type_rl_type",
                "target_level_level",
                "initiatives",
                "is_ai_generated",
            ]

    class ProgressReportRoadblockSerializer(
        tasks_serializers.base.RoadblockBaseSerializer
    ):
        class Meta:
            model = tasks_serializers.base.RoadblockBaseSerializer.Meta.model
            fields = [
                "id",
                "risk_number",
                "description",
                "fix",
                "assignee_last_name",
                "is_ai_generated",
            ]

    class ProgressReportReadinessLevelSerializer(
        readinesslevel_serializers.base.ReadinessLevelBaseSerializer
    ):
        class Meta:
            model = (
                readinesslevel_serializers.base.ReadinessLevelBaseSerializer.Meta.model
            )
            fields = [
                "id",
                "level",
                "name",
                "readiness_type",
            ]

    readiness_levels = serializers.SerializerMethodField(
        method_name="_readiness_levels"
    )
    rnas = StartupRNABaseSerializer(many=True)
    tasks = ProgressReportTaskSerializer(many=True)
    roadblocks = ProgressReportRoadblockSerializer(many=True)

    class Meta:
        model = StartupBaseSerializer.Meta.model
        fields = [
            "id",
            "name",
            "user_id",
            "qualification_status",
            "links",
            "group_name",
            "university_name",
            "eligibility",
            "leader_first_name",
            "leader_last_name",
            "leader_email",
            "readiness_levels",
            "rnas",
            "tasks",
            "roadblocks",
        ]

    def _readiness_levels(self, instance):
        latest_readiness_levels = (
            instance.readiness_levels.select_related("readiness_level__readiness_type")
            .order_by("readiness_level__readiness_type", "-readiness_level__level")
            .distinct("readiness_level__readiness_type")
        )

        return self.ProgressReportReadinessLevelSerializer(
            [
                latest_readiness_level.readiness_level
                for latest_readiness_level in latest_readiness_levels
            ],
            many=True,
        ).data
