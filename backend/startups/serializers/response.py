from rest_framework import serializers
from users import serializers as users_serializers
from startups import serializers as startups_serializers


class CalculatorFinalScoresResponseSerializer(serializers.Serializer):
    technology_level = serializers.IntegerField()
    commercialization_level = serializers.IntegerField()
    technology_score = serializers.IntegerField()
    product_development = serializers.IntegerField()
    product_definition = serializers.IntegerField()
    competitive_landscape = serializers.IntegerField()
    team = serializers.IntegerField()
    go_to_market = serializers.IntegerField()
    supply_chain = serializers.IntegerField()


class GetMentorsResponseSerializer(users_serializers.base.UserBaseSerializer):
    class Meta:
        model = users_serializers.base.UserBaseSerializer.Meta.model
        fields = ["id", "first_name", "last_name", "email"]


class ExtractCapsuleProposalDataResponseSerializer(
    startups_serializers.base.CapsuleProposalInfoBaseSerializer
):
    class Meta:
        model = startups_serializers.base.CapsuleProposalInfoBaseSerializer.Meta.model
        fields = [
            "title",
            "startup_description",
            "problem_statement",
            "target_market",
            "solution_description",
            "objectives",
            "scope",
            "methodology",
        ]

class GenerateRNAResponseSerializer(serializers.Serializer):
    trl = serializers.CharField()
    irl = serializers.CharField()
    mrl = serializers.CharField()
    rrl = serializers.CharField()
    arl = serializers.CharField()
    orl = serializers.CharField()