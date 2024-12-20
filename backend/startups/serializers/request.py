from rest_framework import serializers
from users import models as users_models

from startups import models as startups_models
from startups.serializers import base as startups_base_serializers


class StartupRequestSerializer(startups_base_serializers.StartupBaseSerializer):
    qualification_status = serializers.IntegerField(read_only=True)
    set_members = serializers.PrimaryKeyRelatedField(
        queryset=users_models.StartupUser.objects, write_only=True, many=True
    )
    set_contracted_members = (
        startups_base_serializers.StartupContractedMemberBaseSerializer(
            many=True, required=False
        )
    )

    user_id = serializers.PrimaryKeyRelatedField(source="user", read_only=True)

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
            "set_members",
            "set_contracted_members",
        ]


class UpdateUratQuestionAnswerRequestSerializer(serializers.Serializer):
    score = serializers.IntegerField()


class ReadinessLevelCriterionAnswerRequestSerializer(serializers.Serializer):
    score = serializers.IntegerField()
    remark = serializers.CharField(required=False, allow_blank=True)


class BulkCreateReadinessLevelCriterionAnswerRequestSerializer(serializers.Serializer):
    criterion_answers = (
        startups_base_serializers.ReadinessLevelCriterionAnswerBaseSerializer(many=True)
    )


class BulkCreateUratQuestionAnswerRequestSerializer(serializers.Serializer):
    urat_question_answers = startups_base_serializers.UratQuestionAnswerBaseSerializer(
        many=True
    )


class BulkCreateStartupReadinessLevelRequestSerializer(serializers.Serializer):
    startup_readiness_levels = (
        startups_base_serializers.StartupReadinessLevelBaseSerializer(many=True)
    )


class AssignMentorsRequestSerializer(serializers.Serializer):
    mentor_ids = serializers.ListField(
        child=(
            serializers.PrimaryKeyRelatedField(queryset=users_models.MentorUser.objects)
        )
    )
    cohort_id = serializers.IntegerField()


class BulkCreateCalculatorQuestionAnswerRequestSerializer(serializers.Serializer):
    calculator_question_answers = (
        startups_base_serializers.CalculatorQuestionAnswerBaseSerializer(many=True)
    )


class ApproveApplicantsWithMentorRequestSerializer(serializers.Serializer):
    class StartupWithMentorSerializer(serializers.Serializer):
        startup_id = serializers.IntegerField()
        mentor_ids = serializers.ListField(
            child=(
                serializers.PrimaryKeyRelatedField(
                    queryset=users_models.MentorUser.objects
                )
            )
        )

    startups_with_mentors = StartupWithMentorSerializer(many=True)


class ExtractCapsuleProposalDataRequestSerializer(serializers.Serializer):
    capsule_proposal = serializers.FileField()
