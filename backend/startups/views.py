import pymupdf
from django.db import transaction
from django.db.models import Avg, Count, F, Max, Min, OuterRef, Q, Subquery, Sum, Window
from django.db.models.functions import Lag
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.utils import timezone
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from generic.utils import call_gemini_api
from generic.views import BaseViewSet
from readinesslevel import models as readinesslevel_models
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response
from tasks import models as tasks_models
from tasks import utils as tasks_utils
from users import models as users_models
from users import permissions as users_permissions
from weasyprint import HTML

from startups import models as startups_models
from startups import permissions as startups_permissions
from startups import serializers as startups_serializers
from startups import utils as startups_utils
from startups.utils import generate_spider_graph


class StartupViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    BaseViewSet,
):
    queryset = startups_models.Startup.objects
    serializer_class = startups_serializers.base.StartupBaseSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_permissions(self):
        viewset_action = self.action

        if viewset_action in [
            "approve_applicant",
            "rate_applicant",
            "reject_applicant",
            "appoint_mentors",
            "ranking_by_urat",
            "ranking_by_rubrics",
            "calculator_final_scores",
        ]:
            return [users_permissions.IsManagerPermission()]

        if viewset_action in ["retrieve", "get_mentors", "progress_report"]:
            return [startups_permissions.IsManagerOrMemberOrMentorOfStartUpPermission()]

        if viewset_action in [
            "allow_rnas",
            "allow_tasks",
            "allow_initiatives",
            "allow_roadblocks",
            "generate_rna",
        ]:
            return [startups_permissions.IsMentorOrManagerPermission()]

        return super().get_permissions()

    def get_queryset(self):
        queryset = super().get_queryset()
        request = self.request
        user = request.user

        if user.is_anonymous:
            return queryset.none()

        serializer = startups_serializers.query.StartupQuerySerializer(
            data=request.query_params
        )

        serializer.is_valid(raise_exception=True)

        qualification_status = serializer.validated_data.get(
            "qualification_status", None
        )
        if qualification_status is not None:
            queryset = queryset.filter(qualification_status=qualification_status)

        if user.user_type == users_models.BaseUser.UserType.STARTUP:
            queryset = queryset.filter(Q(user_id=user.id) | Q(members__user_id=user.id))

        if user.user_type == users_models.BaseUser.UserType.MENTOR:
            queryset = queryset.filter(mentors=user)

        cohort_id = serializer.validated_data.get("cohort_id")
        if cohort_id:
            queryset = queryset.filter(cohort_id=cohort_id)

        return queryset.filter(datetime_deleted__isnull=True).distinct().all()

    @swagger_auto_schema(
        request_body=startups_serializers.request.StartupRequestSerializer,
        responses={200: startups_serializers.base.StartupBaseSerializer},
    )
    def create(self, request):
        """Create Startup

        Creates a new Startup Instance with its members.
        """
        user = request.user

        serializer = startups_serializers.request.StartupRequestSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)

        members = serializer.validated_data.pop("set_members", [])
        contracted_members = serializer.validated_data.pop("set_contracted_members", [])

        startup_user = users_models.StartupUser.objects.filter(id=user.id).first()
        startup = startups_models.Startup.objects.create(
            user=startup_user, **serializer.validated_data
        )

        to_be_created_members = []
        to_be_created_contracted_members = []
        for member in members:
            to_be_created_members.append(
                startups_models.StartupMember(user=member, startup=startup)
            )

        for contracted_member in contracted_members:
            to_be_created_contracted_members.append(
                startups_models.StartupContractedMember(
                    startup=startup,
                    first_name=contracted_member.get("first_name"),
                    last_name=contracted_member.get("last_name"),
                )
            )

        startups_models.StartupMember.objects.bulk_create(to_be_created_members)
        startups_models.StartupContractedMember.objects.bulk_create(
            to_be_created_contracted_members
        )

        return Response(self.serializer_class(startup).data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=openapi.Schema(type=openapi.TYPE_OBJECT, properties={}),
        responses={
            200: "sent email successfully",
            403: users_permissions.IsManagerPermission.message,
        },
    )
    @transaction.atomic
    @action(url_path="approve-applicant", detail=True, methods=["POST"])
    def approve_applicant(self, request, pk):
        """Approve Applicant

        Updates the startup qualifacation status to qualified.
        And send approval emails to leader and members.
        """
        startup = self.get_object()

        email = startup.user.email

        startups_utils.send_approval_email(email, startup.name)
        startup.qualification_status = 3
        startup.save(update_fields=["qualification_status"])

        return Response("sent email successfully", status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=openapi.Schema(type=openapi.TYPE_OBJECT, properties={}),
        responses={
            200: "sent email successfully",
            403: users_permissions.IsManagerPermission.message,
        },
    )
    @transaction.atomic
    @action(url_path="reject-applicant", detail=True, methods=["POST"])
    def reject_applicant(self, request, pk):
        """Reject Applicant

        Soft delete startup and
        send rejection email to leader.
        """
        startup = self.get_object()
        startup.datetime_deleted = timezone.now()
        startup.save(update_fields=["datetime_deleted"])

        email = startup.member_1_email
        startups_utils.send_rejection_email(email)

        return Response("sent email successfully", status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=openapi.Schema(type=openapi.TYPE_OBJECT, properties={}),
        responses={
            200: "startup rated successfully",
            403: users_permissions.IsManagerPermission.message,
        },
    )
    @transaction.atomic
    @action(url_path="rate-applicant", detail=True, methods=["POST"])
    def rate_applicant(self, request, pk):
        """Rate Applicant

        Updates the startup qualifacation status to rated.
        """
        startup = self.get_object()
        startup.qualification_status = 2
        startup.save(update_fields=["qualification_status"])

        return Response("startup rated successfully", status=status.HTTP_200_OK)

    @swagger_auto_schema(
        query_serializer=startups_serializers.query.StartupQuerySerializer(),
        responses={
            200: startups_serializers.base.StartupBaseSerializer(),
        },
    )
    def list(self, request, *args, **kwargs):
        """List Startups

        lists startups objects with different filters.
        """
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        query_serializer=startups_serializers.query.StartupQuerySerializer(),
        responses={
            200: startups_serializers.base.StartupBaseSerializer(),
            403: startups_permissions.IsManagerOrMemberOrMentorOfStartUpPermission.message,
        },
    )
    def retrieve(self, request, *args, **kwargs):
        """Retrieve Startup

        Retrieves a startup given the id in path.
        """
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=startups_serializers.request.AssignMentorsRequestSerializer(),
        responses={
            204: "",
            403: users_permissions.IsManagerPermission.message,
        },
    )
    @action(url_path="appoint-mentors", detail=True, methods=["POST"])
    def appoint_mentors(self, request, pk):
        """Appoint Mentors

        Set mentor/s to the the specified startup.
        """
        startup = self.get_object()

        request_seralizer = startups_serializers.request.AssignMentorsRequestSerializer(
            data=request.data
        )
        request_seralizer.is_valid(raise_exception=True)

        mentor_ids = request_seralizer.validated_data.get("mentor_ids")
        cohort_id = request_seralizer.validated_data.get("cohort_id")

        startup.cohort_id = cohort_id
        startup.save(update_fields=["cohort_id"])

        startup.mentors.set(mentor_ids)

        return Response(status=status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(
        query_serializer=None,
        responses={
            200: startups_serializers.base.StartupBaseSerializer(many=True),
            403: users_permissions.IsManagerPermission.message,
        },
    )
    @action(url_path="ranking-by-urat", detail=False, methods=["GET"])
    def ranking_by_urat(self, request):
        """Ranking By URAT

        Ranking startups based on their URAT scores.
        """
        urat_rankings = startups_models.URATQuestionAnswer.objects.values(
            "startup"
        ).annotate(urat_score=Sum("score"))

        final_scores = []
        for urat_ranking in urat_rankings:
            startup_id = urat_ranking.get("startup")
            technology_level, *_ = startups_utils.calculate_levels(startup_id)

            if technology_level < 4:
                continue

            final_scores.append(
                {
                    "startup_id": startup_id,
                    "score": urat_ranking.get("urat_score") + technology_level,
                }
            )

        final_scores.sort(key=lambda x: x.get("score", 0), reverse=True)

        startup_ids = [ranking["startup_id"] for ranking in final_scores]

        startups = startups_models.Startup.objects.filter(pk__in=startup_ids)
        startups_map = {}
        for startup in startups:
            startups_map[startup.id] = startup

        ordered_startups = []
        for final_score in final_scores:
            ordered_startups.append(startups_map[final_score.get("startup_id")])

        return Response(
            startups_serializers.base.StartupBaseSerializer(
                ordered_startups, many=True
            ).data
        )

    @swagger_auto_schema(
        query_serializer=None,
        responses={
            200: startups_serializers.base.StartupBaseSerializer(many=True),
            403: users_permissions.IsManagerPermission.message,
        },
    )
    @action(url_path="ranking-by-rubrics", detail=False, methods=["GET"])
    def ranking_by_rubrics(self, request):
        """Ranking By Rubrics

        Ranking startups based on their rubrics scores.
        """
        readiness_type_weights = {
            "T": 4,
            "M": 3,
            "R": 2,
            "A": 2,
            "O": 2,
            "I": 2,
        }

        subquery = Subquery(
            startups_models.StartupReadinessLevel.objects.filter(
                startup_id=OuterRef("startup_id"),
                readiness_level__readiness_type_id=OuterRef(
                    "readiness_level__readiness_type_id"
                ),
                readiness_level__readiness_type__rl_type__in=readiness_type_weights.keys(),
            )
            .order_by("datetime_created")
            .values("id")[:1]
        )

        levels = startups_models.StartupReadinessLevel.objects.filter(id=subquery)

        startup_scores = []
        for level in levels:
            startup_score = {
                "startup_id": level.startup_id,
                "weighted_score": level.readiness_level.level
                * readiness_type_weights[level.readiness_level.readiness_type.rl_type],
            }
            startup_scores.append(startup_score)

        total_weighted_scores = {}
        for startup_score in startup_scores:
            startup_id = startup_score["startup_id"]
            if startup_id not in total_weighted_scores:
                total_weighted_scores[startup_id] = 0
            total_weighted_scores[startup_id] += startup_score["weighted_score"]

        ranked_startups = sorted(
            [
                {"startup_id": k, "total_weighted_score": v}
                for k, v in total_weighted_scores.items()
            ],
            key=lambda x: x["total_weighted_score"],
            reverse=True,
        )

        startup_ids = [ranking["startup_id"] for ranking in ranked_startups]

        startups = startups_models.Startup.objects.filter(pk__in=startup_ids)

        startups_map = {}
        for startup in startups:
            startups_map[startup.id] = startup

        ordered_startups = []
        for ranked_startup in ranked_startups:
            ordered_startups.append(startups_map[ranked_startup.get("startup_id")])

        return Response(
            startups_serializers.base.StartupBaseSerializer(
                ordered_startups, many=True
            ).data
        )

    @swagger_auto_schema(
        query_serializer=None,
        responses={
            200: startups_serializers.response.CalculatorFinalScoresResponseSerializer,
            403: users_permissions.IsManagerPermission.message,
        },
    )
    @action(url_path="calculator-final-scores", detail=True, methods=["GET"])
    def calculator_final_scores(self, request, pk):
        """Calculator Final Scores

        Gets the scores using the
        NYSERDA Technology and Commercialization Readiness Level
        Calculator.
        """
        calculator_values = startups_utils.calculate_levels(pk)

        return Response(
            startups_serializers.response.CalculatorFinalScoresResponseSerializer(
                {
                    "technology_level": calculator_values[0],
                    "commercialization_level": calculator_values[1],
                    "technology_score": calculator_values[2],
                    "product_development": calculator_values[3],
                    "product_definition": calculator_values[4],
                    "competitive_landscape": calculator_values[5],
                    "team": calculator_values[6],
                    "go_to_market": calculator_values[7],
                    "supply_chain": calculator_values[8],
                }
            ).data
        )

    @swagger_auto_schema(
        query_serializer=None,
        responses={
            200: startups_serializers.response.GetMentorsResponseSerializer(many=True),
            403: startups_permissions.IsManagerOrMemberOrMentorOfStartUpPermission.message,
        },
    )
    @action(url_path="mentors", detail=True, methods=["GET"])
    def get_mentors(self, request, pk):
        """Get Mentors

        Gets the mentors of the startup.
        """
        startup = self.get_object()

        mentors = startup.mentors.all()

        return Response(
            startups_serializers.response.GetMentorsResponseSerializer(
                mentors, many=True
            ).data
        )

    @swagger_auto_schema(
        query_serializer=None,
        responses={
            200: startups_serializers.base.StartupRNABaseSerializer,
        },
    )
    @action(url_path="generate-rna", detail=True, methods=["GET"])
    def generate_rna(self, request, pk):
        """Generate RNA

        Generates the RNA for the startup.
        """
        startup = self.get_object()

        base_prompt = tasks_utils.create_base_prompt(startup)

        readiness_levels = startups_utils.get_first_readiness_levels(startup.id)

        level_criterion_answers = (
            startups_models.ReadinessLevelCriterionAnswer.objects.filter(
                startup_id=startup.id, criterion__readiness_level__in=readiness_levels
            )
            .values("criterion__readiness_level")
            .annotate(
                total_score=Sum("score"),
                rl_type=F("criterion__readiness_level__readiness_type__rl_type"),
            )
        )

        readiness_level_interpretation_prompt = "Heres the interpretation of the readiness levels based on a set of rubrics to know the level of the readiness type for the startup:\n"
        for level_criterion_answer in level_criterion_answers:
            level_id = level_criterion_answer.get("criterion__readiness_level")
            total_score = level_criterion_answer.get("total_score")
            rl_type = level_criterion_answer.get("rl_type")

            scoring_guide = readinesslevel_models.ScoringGuide.objects.filter(
                readiness_level_id=level_id,
                start_range__lte=total_score,
                end_range__gte=total_score,
            ).first()
            readiness_level_interpretation_prompt += (
                f"{rl_type.lower()}rl: {scoring_guide.description}\n\n"
            )

        prompt = f"""
        {base_prompt}

        {readiness_level_interpretation_prompt}

        TASK: Generate a RNA(Readiness and Needs Assessment) for each readiness level.
        Requirement: The response should be in a JSON format.
        JSON format: {{"readiness_level_type": (char), "current_level": (int), "details": ""}}
        Requirement:
        - readiness_level_type consists of T(Techonology), I(Investment), A(Acceptance), O(Organizational), R(Regulatory), and M(Market)
        - current_level is from 1(minimum) to 9(maximum)
        - details has a max length of 500
        - details should be for that readiness type only.
        """

        explanation, _ = call_gemini_api(prompt)

        to_be_created_startup_rnas = []
        for task_data in explanation:
            rl_type = task_data.get("readiness_level_type")
            current_level = task_data.get("current_level")
            details = task_data.get("details")

            readiness_type = readinesslevel_models.ReadinessType.objects.filter(
                rl_type=rl_type
            ).first()

            current_readiness_level = (
                readinesslevel_models.ReadinessLevel.objects.filter(
                    readiness_type=readiness_type, level=current_level
                )
            ).first()

            to_be_created_startup_rnas.append(
                startups_models.StartupRNA(
                    readiness_level=current_readiness_level,
                    rna=details,
                    startup_id=startup.id,
                    is_ai_generated=True,
                )
            )

        startup_rnas = startups_models.StartupRNA.objects.bulk_create(
            to_be_created_startup_rnas
        )

        return Response(
            startups_serializers.base.StartupRNABaseSerializer(
                startup_rnas, many=True
            ).data,
            status=status.HTTP_200_OK,
        )

    @action(url_path="allow-rnas", detail=True, methods=["GET"])
    def allow_rnas(self, request, pk):
        """Check Allow RNAs

        Checks if manager can create RNAs.
        """
        return Response(
            startups_models.ReadinessLevelCriterionAnswer.objects.filter(
                startup_id=pk
            ).exists(),
            status=status.HTTP_200_OK,
        )

    @action(url_path="allow-tasks", detail=True, methods=["GET"])
    def allow_tasks(self, request, pk):
        """Check Allow Tasks

        Checks if manager can create tasks.
        """
        return Response(
            startups_models.StartupRNA.objects.filter(startup_id=pk).exists(),
            status=status.HTTP_200_OK,
        )

    @action(url_path="allow-initiatives", detail=True, methods=["GET"])
    def allow_initiatives(self, request, pk):
        """Check Allow Initiatives

        Checks if manager can create initiatives.
        """
        return Response(
            tasks_models.Task.objects.filter(startup_id=pk)
            .exclude(status=tasks_models.TaskStatus.FOR_REVIEW)
            .exists(),
            status=status.HTTP_200_OK,
        )

    @action(url_path="allow-roadblocks", detail=True, methods=["GET"])
    def allow_roadblocks(self, request, pk):
        """Check Allow Roadblocks

        Checks if manager can create roadblocks.
        """
        return Response(
            tasks_models.Initiative.objects.filter(task__startup_id=pk)
            .exclude(status=tasks_models.TaskStatus.FOR_REVIEW)
            .exists(),
            status=status.HTTP_200_OK,
        )

    @swagger_auto_schema(
        responses={200: startups_serializers.base.ProgressReportResponseSerializer}
    )
    @action(url_path="progress-report", detail=True, methods=["GET"])
    def progress_report(self, request, pk):
        """Progress Report

        Response progress report data.
        """
        startup = self.get_object()

        return Response(
            startups_serializers.base.ProgressReportResponseSerializer(startup).data
        )


class UratQuestionAnswerViewSet(
    mixins.CreateModelMixin, mixins.ListModelMixin, BaseViewSet, mixins.UpdateModelMixin
):
    queryset = startups_models.URATQuestionAnswer.objects
    serializer_class = startups_serializers.base.UratQuestionAnswerBaseSerializer

    def get_permissions(self):
        viewset_action = self.action

        if viewset_action in ["partial_update", "list"]:
            return [users_permissions.IsManagerPermission()]

        return super().get_permissions()

    def get_queryset(self):
        queryset = super().get_queryset()
        request = self.request

        serializer = startups_serializers.query.UratQuestionAnswerQuerySerializer(
            data=request.query_params
        )

        serializer.is_valid(raise_exception=True)
        startup_id = serializer.validated_data.get("startup_id")
        if startup_id:
            queryset = queryset.filter(startup_id=startup_id)

        return queryset.all()

    @swagger_auto_schema(
        request_body=startups_serializers.base.UratQuestionAnswerBaseSerializer,
        responses={204: startups_serializers.base.UratQuestionAnswerBaseSerializer},
    )
    def create(self, request, *args, **kwargs):
        """Create URAT Question Answer

        Creates a new URAT Question Answer Instance.
        """
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        query_serializer=startups_serializers.query.UratQuestionAnswerQuerySerializer,
        responses={
            200: startups_serializers.base.UratQuestionAnswerBaseSerializer,
            403: users_permissions.IsManagerPermission.message,
        },
    )
    def list(self, request, *args, **kwargs):
        """List URAT Question Answers

        Lists a collection of URAT Question Answers.
        """
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=startups_serializers.base.UratQuestionAnswerBaseSerializer,
        responses={
            200: startups_serializers.base.UratQuestionAnswerBaseSerializer,
            403: users_permissions.IsManagerPermission.message,
        },
    )
    def partial_update(self, request, *args, **kwargs):
        urat_question_answer = self.get_object()

        request_serializer = (
            startups_serializers.request.UpdateUratQuestionAnswerRequestSerializer(
                data=request.data
            )
        )
        request_serializer.is_valid(raise_exception=True)

        score = request_serializer.validated_data.get("score")

        urat_question_answer.score = score
        urat_question_answer.save(update_fields=["score"])

        return Response(
            self.serializer_class(urat_question_answer).data, status=status.HTTP_200_OK
        )

    @swagger_auto_schema(auto_schema=None)
    def update(self, request, *args, **kwargs):
        pass

    @swagger_auto_schema(
        request_body=startups_serializers.request.BulkCreateUratQuestionAnswerRequestSerializer,
        responses={204: ""},
    )
    @action(url_path="bulk-create", detail=False, methods=["POST"])
    def bulk_create(self, request):
        """Bulk Create URAT Question Answers

        Creates multiple URAT Question Answer Instances.
        """
        request_serializer = (
            startups_serializers.request.BulkCreateUratQuestionAnswerRequestSerializer(
                data=request.data
            )
        )

        request_serializer.is_valid(raise_exception=True)

        urat_question_answers = request_serializer.validated_data.get(
            "urat_question_answers"
        )

        urat_question_answers_object = [
            startups_models.URATQuestionAnswer(**urat_question_answer)
            for urat_question_answer in urat_question_answers
        ]

        startups_models.URATQuestionAnswer.objects.bulk_create(
            urat_question_answers_object
        )

        return Response(status=status.HTTP_204_NO_CONTENT)


class ReadinessLevelCriterionAnswerViewSet(
    mixins.CreateModelMixin, mixins.ListModelMixin, BaseViewSet
):
    queryset = startups_models.ReadinessLevelCriterionAnswer.objects
    serializer_class = (
        startups_serializers.base.ReadinessLevelCriterionAnswerBaseSerializer
    )

    def get_queryset(self):
        queryset = super().get_queryset()
        request = self.request

        serializer = (
            startups_serializers.query.ReadinessLevelCriterionAnswerQuerySerializer(
                data=request.query_params
            )
        )

        serializer.is_valid(raise_exception=True)

        startup_id = serializer.validated_data.get("startup_id")
        if startup_id:
            queryset = queryset.filter(startup_id=startup_id)

        criterion_id = serializer.validated_data.get("criterion_id")
        if criterion_id:
            queryset = queryset.filter(criterion_id=criterion_id)

        return queryset.all()

    @swagger_auto_schema(
        request_body=startups_serializers.base.ReadinessLevelCriterionAnswerBaseSerializer,
        responses={
            201: startups_serializers.base.ReadinessLevelCriterionAnswerBaseSerializer,
        },
    )
    def create(self, request, *args, **kwargs):
        """Create Readiness Level Criterion Answer

        Creates a new Readiness Level Crtierion Answer instance.
        """
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=startups_serializers.request.BulkCreateReadinessLevelCriterionAnswerRequestSerializer,
        responses={
            204: "",
        },
    )
    @action(url_path="bulk-create", detail=False, methods=["POST"])
    def bulk_create(self, request):
        """Bulk Create Readiness Level Criterion Answers

        Creates multiple Readiness Level Criterion Answer Instances.
        """
        request_serializer = startups_serializers.request.BulkCreateReadinessLevelCriterionAnswerRequestSerializer(
            data=request.data
        )

        request_serializer.is_valid(raise_exception=True)

        criterion_answers = request_serializer.validated_data.get("criterion_answers")

        criterion_answers_object = [
            startups_models.ReadinessLevelCriterionAnswer(**criterion_answer)
            for criterion_answer in criterion_answers
        ]

        startups_models.ReadinessLevelCriterionAnswer.objects.bulk_create(
            criterion_answers_object
        )

        return Response(status=status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(
        query_serializer=startups_serializers.query.ReadinessLevelCriterionAnswerQuerySerializer,
        responses={
            200: startups_serializers.base.ReadinessLevelCriterionAnswerBaseSerializer(
                many=True
            )
        },
    )
    def list(self, request, *args, **kwargs):
        """List Readiness Level Criterion Answers

        Gets a collection of Readiness Level Criterion Answer Instances.
        """
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=startups_serializers.request.ReadinessLevelCriterionAnswerRequestSerializer,
        responses={
            200: startups_serializers.base.ReadinessLevelCriterionAnswerBaseSerializer(),
            403: startups_permissions.IsMentorThroughReadinessLevelCriterionAnswerPermission.message,
        },
    )
    def partial_update(self, request, *args, **kwargs):
        """Partial Update Readiness Level Criterion Answers

        Updates a Readiness Level Criterion Answer field/s.
        """
        readinesslevel_criterion_answer = self.get_object()

        request_serializer = (
            startups_serializers.request.ReadinessLevelCriterionAnswerRequestSerializer(
                data=request.data
            )
        )
        request_serializer.is_valid(raise_exception=True)

        score = request_serializer.validated_data.get("score")
        remark = request_serializer.validated_data.get("remark")

        readinesslevel_criterion_answer.score = score
        readinesslevel_criterion_answer.remark = remark

        readinesslevel_criterion_answer.save(update_fields=["score", "remark"])

        return Response(
            self.serializer_class(readinesslevel_criterion_answer).data,
            status=status.HTTP_200_OK,
        )


class StartupReadinessLevelViewSet(
    mixins.CreateModelMixin,
    BaseViewSet,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
):
    queryset = startups_models.StartupReadinessLevel.objects
    serializer_class = startups_serializers.base.StartupReadinessLevelBaseSerializer

    def get_permissions(self):
        viewset_action = self.action

        if viewset_action == "create":
            return [startups_permissions.IsMentorOrManagerPermission()]

        return super().get_permissions()

    def get_queryset(self):
        queryset = super().get_queryset()
        request = self.request

        serializer = startups_serializers.query.StartupReadinessLevelQuerySerializer(
            data=request.query_params
        )

        serializer.is_valid(raise_exception=True)

        startup_id = serializer.validated_data.get("startup_id")
        if startup_id:
            queryset = queryset.filter(startup_id=startup_id)

        return queryset.all()

    def list(self, request, *args, **kwargs):
        """List Startup Readiness Levels

        List collections of Startup Readiness Level instances.
        """
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        """Get Startup Readiness Level

        Gets a Startup Readiness Level instance.
        """
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(auto_schema=None)
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        """Update Startup Readiness Level

        Updates a startup Readiness Level instance.
        """
        return super().partial_update(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """Create Startup Readiness Level

        Creates a new Startup Readiness Level instance.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        startup = serializer.validated_data.get("startup")
        readiness_level = serializer.validated_data.get("readiness_level")
        readiness_type_id = readiness_level.readiness_type_id
        new_level = readiness_level.level

        self.check_object_permissions(request, startup)

        # Fetch the current readiness level for the startup and readiness type
        current_level_instance = (
            startups_models.StartupReadinessLevel.objects.filter(
                startup=startup,
                readiness_level__readiness_type_id=readiness_type_id,
            )
            .order_by("-datetime_created")
            .select_related("readiness_level")
            .first()
        )

        if (
            current_level_instance
            and new_level > current_level_instance.readiness_level.level
        ):
            # Create an elevateLog if the new level is higher
            startups_models.ElevateLog.objects.create(
                startup=startup,
                previous_level=current_level_instance.readiness_level.level,
                new_level=new_level,
                readiness_type_id=readiness_type_id,
                mentor=request.user,
            )

        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=startups_serializers.request.BulkCreateStartupReadinessLevelRequestSerializer,
        responses={204: ""},
    )
    @action(url_path="bulk-create", detail=False, methods=["POST"])
    def bulk_create(self, request):
        """Bulk Create Readiness Levels

        Creates multiple Readiness Level Instances.
        """
        request_serializer = startups_serializers.request.BulkCreateStartupReadinessLevelRequestSerializer(
            data=request.data
        )

        request_serializer.is_valid(raise_exception=True)

        startup_readiness_levels = request_serializer.validated_data.get(
            "startup_readiness_levels"
        )

        startup_readiness_levels_object = [
            startups_models.StartupReadinessLevel(**startup_readiness_level)
            for startup_readiness_level in startup_readiness_levels
        ]

        startups_models.StartupReadinessLevel.objects.bulk_create(
            startup_readiness_levels_object
        )

        return Response(status=status.HTTP_204_NO_CONTENT)


class CalculatorQuestionAnswerViewSet(BaseViewSet):
    queryset = startups_models.CalculatorQuestionAnswer.objects
    serializer_class = startups_serializers.base.CalculatorQuestionAnswerBaseSerializer

    def get_permissions(self):
        viewset_action = self.action

        if viewset_action in ["bulk_create"]:
            return []

        return super().get_permissions()

    @swagger_auto_schema(
        request_body=startups_serializers.request.BulkCreateCalculatorQuestionAnswerRequestSerializer,
        responses={204: ""},
    )
    @action(url_path="bulk-create", detail=False, methods=["POST"])
    def bulk_create(self, request):
        """Bulk Create Calculator Question Answers

        Creates multiple Calculator Question Answer Instances.
        """
        request_serializer = startups_serializers.request.BulkCreateCalculatorQuestionAnswerRequestSerializer(
            data=request.data
        )

        request_serializer.is_valid(raise_exception=True)

        calculator_question_answers = request_serializer.validated_data.get(
            "calculator_question_answers"
        )

        calculator_question_answers_object = [
            startups_models.CalculatorQuestionAnswer(**calculator_question_answer)
            for calculator_question_answer in calculator_question_answers
        ]

        startups_models.CalculatorQuestionAnswer.objects.bulk_create(
            calculator_question_answers_object
        )

        return Response(status=status.HTTP_204_NO_CONTENT)


class CapsuleProposalInfoViewSet(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
    BaseViewSet,
):
    queryset = startups_models.CapsuleProposalInfo.objects
    serializer_class = startups_serializers.base.CapsuleProposalInfoBaseSerializer

    def get_permissions(self):
        viewset_action = self.action

        if viewset_action in ["retrieve", "partial_update"]:
            return [
                startups_permissions.IsMemberOfStartupPermissionThroughCapsuleProposalInfoPermission()
            ]

        return super().get_permissions()

    @swagger_auto_schema(
        responses={
            200: startups_serializers.base.CapsuleProposalInfoBaseSerializer(),
            403: startups_permissions.IsMemberOfStartupPermissionThroughCapsuleProposalInfoPermission.message,
        },
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=startups_serializers.base.CapsuleProposalInfoBaseSerializer,
        responses={
            200: startups_serializers.base.CapsuleProposalInfoBaseSerializer(),
            403: startups_permissions.IsMemberOfStartupPermissionThroughCapsuleProposalInfoPermission.message,
        },
    )
    @transaction.atomic
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=startups_serializers.base.CapsuleProposalInfoBaseSerializer,
        responses={
            200: startups_serializers.base.CapsuleProposalInfoBaseSerializer(),
            403: startups_permissions.IsMemberOfStartupPermission.message,
        },
    )
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = startups_serializers.base.CapsuleProposalInfoBaseSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)

        startup = serializer.validated_data.get("startup")

        self.check_object_permissions(request, startup)

        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=startups_serializers.request.ExtractCapsuleProposalDataRequestSerializer,
        responses={
            200: startups_serializers.response.ExtractCapsuleProposalDataResponseSerializer()
        },
    )
    @transaction.atomic
    @action(url_path="extract-info", detail=False, methods=["POST"])
    def extract_capsule_proposal_info(self, request):
        """Extract Capsule Proposal Info

        Extract Capsule Proposal Info using AI.
        """
        request_serializer = (
            startups_serializers.request.ExtractCapsuleProposalDataRequestSerializer(
                data=request.data
            )
        )
        request_serializer.is_valid(raise_exception=True)

        capsule_proposal_pdf_file = request_serializer.validated_data.get(
            "capsule_proposal"
        )

        pdf_document = pymupdf.open(
            stream=capsule_proposal_pdf_file.read(), filetype="pdf"
        )
        text = ""
        for page in pdf_document:
            text += page.get_text()

        history = [
            {
                "role": "user",
                "parts": [text],
            }
        ]
        prompt = """
        Given this pdf file:
        Task: extract the text for:
        -Acceleration Proposal Title ( can be found above the Duration: 3 month)
        - Startup Description
        - Problem Statement
        - Target Market
        - Solution Description
        - Objectives
        - Scope of The Proposal
        - Methodology and Expected Outputs

        Requirement: The response should be in a JSON format.
        It should consist of title, startup_description, problem_statement, target_market, solution_description, objectives, scope, and methodology
        JSON format: {"title": "", "startup_description": "", "problem_statement": (int), "target_market": "", "solution_description": "", "objectives": "", "scope": "", "methodology": ""}
        """

        explanation, _ = call_gemini_api(prompt, history)

        return Response(
            startups_serializers.response.ExtractCapsuleProposalDataResponseSerializer(
                explanation
            ).data,
            status=status.HTTP_200_OK,
        )


class StartupRNAViewSet(
    BaseViewSet,
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
):
    queryset = startups_models.StartupRNA.objects
    serializer_class = startups_serializers.base.StartupRNABaseSerializer

    def get_permissions(self):
        viewset_action = self.action

        if viewset_action == "destroy":
            return [startups_permissions.IsMemberOfStartupThroughStartupRNAPermission()]

        return super().get_permissions()

    def get_queryset(self):
        queryset = super().get_queryset()
        request = self.request

        serializer = startups_serializers.query.StartupRNAQuerySerializer(
            data=request.query_params
        )

        serializer.is_valid(raise_exception=True)

        startup_id = serializer.validated_data.get("startup_id")
        if startup_id:
            queryset = queryset.filter(startup_id=startup_id)

        return queryset.all()

    def list(self, request, *args, **kwargs):
        """List Startup RNAs

        List collections of Startup RNA instances.
        """
        return super().list(request, *args, **kwargs)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = startups_serializers.base.StartupRNABaseSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)

        startup = serializer.validated_data.get("startup")

        self.check_object_permissions(request, startup)

        return super().create(request, *args, **kwargs)

    @transaction.atomic
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)


class CohortViewSet(BaseViewSet, mixins.CreateModelMixin, mixins.ListModelMixin):
    queryset = startups_models.Cohort.objects.all()
    serializer_class = startups_serializers.base.CohortBaseSerializer

    def list(self, request, *args, **kwargs):
        """List Cohorts

        List collections of Cohort instances.
        """
        return super().list(request, *args, **kwargs)


class AnalyticsViewSet(viewsets.ViewSet):
    queryset = startups_models.Startup.objects
    serializer_class = None

    @action(detail=False, methods=["get"], url_path="startups")
    def startup_analytics(self, request):
        """Startup Analytics

        Responses data for startups' analytics.
        """
        query_serializer = startups_serializers.query.StartupAnalyticsQuerySerializer(
            data=request.query_params
        )
        query_serializer.is_valid(raise_exception=True)

        # Filter startups by cohort_id if provided
        cohort_id = query_serializer.validated_data.get("cohort_id")

        num_of_users = users_models.StartupUser.objects.count()

        startups_queryset = startups_models.Startup.objects.filter(cohort_id=cohort_id)

        # Number of startups
        num_startups = startups_queryset.count()

        # Number of elevated startups and per readiness type
        elevated_startups = (
            startups_models.StartupReadinessLevel.objects.filter(
                startup__in=startups_queryset
            )
            .annotate(
                previous_level=Window(
                    expression=Lag("readiness_level__level"),
                    partition_by=[F("startup"), F("readiness_level__readiness_type")],
                    order_by=F("id").asc(),
                )
            )
            .filter(readiness_level__level__gt=F("previous_level"))
        )
        num_elevated_startups = elevated_startups.count()
        elevated_startups_per_type = (
            elevated_startups.annotate(
                readiness_type=F("readiness_level__readiness_type__rl_type")
            )
            .values("readiness_type")
            .annotate(count=Count("id"))
        )

        # Average completed tasks
        average_completed_tasks = tasks_models.Task.objects.filter(
            status=tasks_models.TaskStatus.COMPLETED
        ).aggregate(average=Avg("id"))

        analytics_data = {
            "num_of_users": num_of_users,
            "num_startups": num_startups,
            "num_elevated_startups": num_elevated_startups,
            "elevated_startups_per_type": list(elevated_startups_per_type),
            "average_completed_tasks": (
                average_completed_tasks["average"]
                if average_completed_tasks["average"]
                else 0
            ),
        }

        return Response(analytics_data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], url_path="elevate-logs")
    def elevate_logs(self, request):
        """Elevate Logs

        Responses a list of formatted logs.
        """
        logs = (
            startups_models.ElevateLog.objects.select_related("readiness_type")
            .all()
            .values(
                "startup__name",
                "readiness_type__rl_type",
                "previous_level",
                "new_level",
                "mentor__last_name",
            )
            .order_by("-id")
        )

        formatted_logs = [
            f"{log['startup__name']}'s {dict(readinesslevel_models.ReadinessType.RLType.choices).get(log['readiness_type__rl_type'])} Readiness Level was elevated from level {log['previous_level']} to level {log['new_level']} by {log['mentor__last_name']}"
            for log in logs
        ]

        return Response({"logs": formatted_logs}, status=status.HTTP_200_OK)


class StartupMemberViewSet(BaseViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin):
    queryset = startups_models.StartupMember.objects
    serializer_class = startups_serializers.base.StartupMemberBaseSerializer

    def get_permissions(self):
        viewset_action = self.action

        if viewset_action == "create":
            return [startups_permissions.IsMentorOrManagerPermission()]

        return super().get_permissions()

    @swagger_auto_schema(
        request_body=startups_serializers.base.StartupMemberBaseSerializer,
        responses={
            200: startups_serializers.base.StartupMemberBaseSerializer,
            403: startups_permissions.IsMentorOrManagerPermission.message,
        },
    )
    def create(self, request, *args, **kwargs):
        """Create Startup Member

        Create an instance of startup member.
        """

        request_serializer = startups_serializers.base.StartupMemberBaseSerializer(
            data=request.data
        )
        request_serializer.is_valid(raise_exception=True)

        startup = request_serializer.validated_data.get("startup")
        user = request_serializer.validated_data.get("user")

        self.check_object_permissions(request, startup)

        if startup.members.filter(user=user).exists():
            return Response(
                "User is already a member of the startup.", status=status.HTTP_200_OK
            )

        return super().create(request, *args, **kwargs)


class StratupContractMemberViewSet(BaseViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin):
    queryset = startups_models.StartupContractedMember.objects
    serializer_class = startups_serializers.base.StartupContractedMemberBaseSerializer

    def get_permissions(self):
        viewset_action = self.action

        if viewset_action == "create":
            return [startups_permissions.IsMentorOrManagerPermission()]

        return super().get_permissions()

    @swagger_auto_schema(
        request_body=startups_serializers.base.StartupContractedMemberBaseSerializer,
        responses={
            200: startups_serializers.base.StartupContractedMemberBaseSerializer,
            403: startups_permissions.IsMentorOrManagerPermission.message,
        },
    )
    def create(self, request, *args, **kwargs):
        """Create Startup Contracted Member

        Create an instance of startup contracted member.
        """

        request_serializer = (
            startups_serializers.base.StartupContractedMemberBaseSerializer(
                data=request.data
            )
        )
        request_serializer.is_valid(raise_exception=True)

        startup = request_serializer.validated_data.get("startup")
        first_name = request_serializer.validated_data.get("first_name")
        last_name = request_serializer.validated_data.get("last_name")

        self.check_object_permissions(request, startup)

        if startup.contracted_members.filter(
            first_name=first_name, last_name=last_name
        ).exists():
            return Response(
                "User is already a contracted member of the startup.",
                status=status.HTTP_200_OK,
            )

        return super().create(request, *args, **kwargs)
