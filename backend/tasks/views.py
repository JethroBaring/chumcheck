from generic.views import BaseViewSet
from rest_framework import mixins
from drf_yasg.utils import swagger_auto_schema
from tasks import models as tasks_models
from tasks import serializers as tasks_serializers
from django.db import transaction
from tasks import permissions as tasks_permissions
from startups import permissions as startups_permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class TaskViewSet(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    BaseViewSet,
):
    queryset = tasks_models.Task.objects
    serializer_class = tasks_serializers.base.TaskBaseSerializer

    def get_permissions(self):
        viewset_action = self.action

        if viewset_action == "list":
            return [
                tasks_permissions.IsManagerOrMemberOrMentorOfStartUpThroughTaskPermission()
            ]

        elif viewset_action in ["partial_update", "destroy"]:
            return [tasks_permissions.IsMentorThroughTaskPermission()]

        elif viewset_action == "create":
            return [startups_permissions.IsMentorOrManagerPermission()]

        return super().get_permissions()

    def get_queryset(self):
        queryset = self.queryset
        request = self.request

        serializer = tasks_serializers.query.TaskQuerySerializer(
            data=request.query_params
        )

        serializer.is_valid(raise_exception=True)

        startup_id = serializer.validated_data.get("startup_id")
        if startup_id:
            queryset = queryset.filter(startup_id=startup_id)

        task_type = serializer.validated_data.get("task_type")
        if task_type:
            queryset = queryset.filter(task_type=task_type)

        return queryset.all()

    @swagger_auto_schema(
        query_serializer=tasks_serializers.query.TaskQuerySerializer,
        responses={200: tasks_serializers.base.TaskBaseSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @transaction.atomic
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @transaction.atomic
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = tasks_serializers.base.TaskBaseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        startup = serializer.validated_data.get("startup")

        self.check_object_permissions(request, startup)

        return super().create(request, *args, **kwargs)

    @transaction.atomic
    @action(detail=False, methods=["POST"], url_path="create-initial-tasks")
    def initial_tasks(self):
        # TODO: Call GPT Here
        return Response("None", status=status.HTTP_200_OK)


class InitiativeViewSet(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    BaseViewSet,
):
    queryset = tasks_models.Initiative.objects
    serializer_class = tasks_serializers.base.InitiativeBaseSerializer

    def get_permissions(self):
        viewset_action = self.action

        if viewset_action == "list":
            return [
                tasks_permissions.IsManagerOrMemberOrMentorOfStartUpThroughInitiativePermission()
            ]

        elif viewset_action in ["partial_update", "destroy"]:
            return [tasks_permissions.IsMentorThroughInitiativePermission()]

        elif viewset_action == "create":
            return [tasks_permissions.IsMentorThroughTaskPermission()]

        return super().get_permissions()

    def get_queryset(self):
        queryset = self.queryset
        request = self.request

        serializer = tasks_serializers.query.InititativeQuerySerializer(
            data=request.query_params
        )

        serializer.is_valid(raise_exception=True)

        task_id = serializer.validated_data.get("task_id")
        if task_id:
            queryset = queryset.filter(task_id=task_id)

        return queryset.all()

    @swagger_auto_schema(
        query_serializer=tasks_serializers.query.InititativeQuerySerializer,
        responses={200: tasks_serializers.base.InitiativeBaseSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @transaction.atomic
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @transaction.atomic
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = tasks_serializers.base.InitiativeBaseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        task = serializer.validated_data.get("task")

        self.check_object_permissions(request, task)

        return super().create(request, *args, **kwargs)

    @transaction.atomic
    @action(detail=False, methods=["POST"], url_path="create-initial-initiatives")
    def initial_initiatives(self, request):
        # TODO: Call GPT Here
        return Response("None", status=status.HTTP_200_OK)


class RoadblockViewSet(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    BaseViewSet,
):
    queryset = tasks_models.Roadblock.objects
    serializer_class = tasks_serializers.base.RoadblockBaseSerializer

    def get_permissions(self):
        viewset_action = self.action

        if viewset_action == "list":
            return [
                tasks_permissions.IsManagerOrMemberOrMentorOfStartUpThroughInitiativePermission()
            ]

        elif viewset_action in ["partial_update", "destroy"]:
            return [tasks_permissions.IsMentorThroughInitiativePermission()]

        elif viewset_action == "create":
            return [tasks_permissions.IsMentorThroughTaskPermission()]

        return super().get_permissions()

    def get_queryset(self):
        queryset = self.queryset
        request = self.request

        serializer = tasks_serializers.query.RoadblockQuerySerializer(
            data=request.query_params
        )

        serializer.is_valid(raise_exception=True)

        startup_id = serializer.validated_data.get("startup_id")
        if startup_id:
            queryset = queryset.filter(startup_id=startup_id)

        return queryset.all()

    @swagger_auto_schema(
        query_serializer=tasks_serializers.query.RoadblockQuerySerializer,
        responses={200: tasks_serializers.base.RoadblockBaseSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @transaction.atomic
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @transaction.atomic
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = tasks_serializers.base.RoadblockBaseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        startup = serializer.validated_data.get("startup")

        self.check_object_permissions(request, startup)

        return super().create(request, *args, **kwargs)

    @transaction.atomic
    @action(detail=False, methods=["POST"], url_path="create-initial-roadblocks")
    def initial_roadblocks(self):
        # TODO: Call GPT Here
        return Response("None", status=status.HTTP_200_OK)
