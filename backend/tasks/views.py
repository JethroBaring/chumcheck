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
from readinesslevel import models as readinesslevel_models
from generic.utils import call_gemini_api
from tasks import utils as tasks_utils
from startups import models as startups_models


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

        if viewset_action in ["partial_update", "destroy"]:
            return [tasks_permissions.IsMentorThroughTaskPermission()]

        elif viewset_action in ["create", "initial_tasks"]:
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

        is_ai_generated = serializer.validated_data.get("is_ai_generated")
        if is_ai_generated:
            queryset = queryset.filter(is_ai_generated=is_ai_generated)

        return queryset.all()

    @swagger_auto_schema(
        query_serializer=tasks_serializers.query.TaskQuerySerializer,
        responses={200: tasks_serializers.base.TaskBaseSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        """List Tasks

        Returns a list of tasks.
        """
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=tasks_serializers.base.TaskBaseSerializer,
        responses={
            200: tasks_serializers.base.TaskBaseSerializer(),
            403: tasks_permissions.IsMentorThroughTaskPermission.message,
        },
    )
    @transaction.atomic
    def partial_update(self, request, *args, **kwargs):
        """Partial Update Task

        Partially updates a task and returns it.
        """
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        responses={
            204: "",
            403: tasks_permissions.IsMentorThroughTaskPermission.message,
        },
    )
    @transaction.atomic
    def destroy(self, request, *args, **kwargs):
        """Delete A Task

        Deletes a task.
        """
        return super().destroy(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=tasks_serializers.base.TaskBaseSerializer,
        responses={
            200: tasks_serializers.base.TaskBaseSerializer(),
            403: startups_permissions.IsMentorOrManagerPermission.message,
        },
    )
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        """Create A Task

        Creates a task and returns it.
        """
        serializer = tasks_serializers.base.TaskBaseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        startup = serializer.validated_data.get("startup")

        self.check_object_permissions(request, startup)

        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=tasks_serializers.request.CreateInitialTaskRequestSerializer,
        responses={
            200: tasks_serializers.base.TaskBaseSerializer(many=True),
            400: "No capsule proposal found.",
            403: startups_permissions.IsMentorOrManagerPermission.message,
        },
    )
    @transaction.atomic
    @action(detail=False, methods=["POST"], url_path="create-initial-tasks")
    def initial_tasks(self, request):
        """Generate Tasks Using AI

        generate tasks based on capsule proposal and initial readiness level.
        """
        request_serializer = (
            tasks_serializers.request.CreateInitialTaskRequestSerializer(
                data=request.data
            )
        )
        request_serializer.is_valid(raise_exception=True)

        startup = request_serializer.validated_data.get("startup")
        readiness_type = request_serializer.validated_data.get("readiness_type")
        term = request_serializer.validated_data.get("term")
        no_of_tasks_to_create = request_serializer.validated_data.get(
            "no_of_tasks_to_create"
        )

        base_prompt = tasks_utils.create_base_prompt(startup)

        if not base_prompt:
            return Response(
                "No capusle proposal found.", status=status.HTTP_400_BAD_REQUEST
            )

        rl_type_label = readinesslevel_models.ReadinessType.RLType(readiness_type).label
        startup_rnas = startups_models.StartupRNA.objects.filter(
            startup_id=startup.id,
            is_ai_generated=False,
            readiness_level__readiness_type=readiness_type,
        )
        startup_rna_prompt = (
            f"These are the RNA for {rl_type_label} Readiness Type Of Startup:\n"
        )
        for startup_rna in startup_rnas:
            readiness_level = startup_rna.readiness_level
            startup_rna_prompt += (
                f"Readiness Level {readiness_level.level}: {startup_rna.rna}\n"
            )

        prompt = f"""
        {base_prompt}


        {startup_rna_prompt}


        TASK: Create me {no_of_tasks_to_create} {term} tasks for the startup's personalized learning path.
        Requirement: The response should be in a JSON format.
        It should consist of readiness level type, target level, description
        JSON format: [{{"target_level": (int), "description": ""}}]
        Requirement note:
        - target_level is from 1-9
        - make sure that the tasks will increase the level(target_level) of the specified readiness level type from the initial readiness level type
        - target_level should not exceed to 9
        - description has a max length of 500
        """

        explanation, _ = call_gemini_api(prompt)

        tasks = []
        for task_data in explanation:
            target_level = task_data.get("target_level")
            description = task_data.get("description")

            target_readiness_level = (
                readinesslevel_models.ReadinessLevel.objects.filter(
                    readiness_type=readiness_type, level=target_level
                )
            ).first()

            tasks.append(
                tasks_models.Task.objects.create(
                    readiness_type=readiness_type,
                    target_level=target_readiness_level,
                    description=description,
                    task_type=term,
                    startup_id=startup.id,
                    is_ai_generated=True,
                )
            )

        return Response(
            tasks_serializers.base.TaskBaseSerializer(tasks, many=True).data,
            status=status.HTTP_200_OK,
        )


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

        if viewset_action in ["partial_update", "destroy"]:
            return [tasks_permissions.IsMentorThroughInitiativePermission()]

        if viewset_action in ["create", "initial_initiatives"]:
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

        is_ai_generated = serializer.validated_data.get("is_ai_generated")
        if is_ai_generated:
            queryset = queryset.filter(is_ai_generated=is_ai_generated)

        return queryset.all()

    @swagger_auto_schema(
        query_serializer=tasks_serializers.query.InititativeQuerySerializer,
        responses={200: tasks_serializers.base.InitiativeBaseSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        """List Initiatives

        Returns a list of initatives.
        """
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=tasks_serializers.base.InitiativeBaseSerializer,
        responses={
            200: tasks_serializers.base.InitiativeBaseSerializer(),
            403: tasks_permissions.IsMentorThroughInitiativePermission.message,
        },
    )
    @transaction.atomic
    def partial_update(self, request, *args, **kwargs):
        """Update A Initiative

        Partially updates a initiatives and returns it.
        """
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        responses={
            204: "",
            403: tasks_permissions.IsMentorThroughInitiativePermission.message,
        },
    )
    @transaction.atomic
    def destroy(self, request, *args, **kwargs):
        """Delete A Initiative

        Deletes a initiative.
        """
        return super().destroy(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=tasks_serializers.base.InitiativeBaseSerializer,
        responses={
            200: tasks_serializers.base.InitiativeBaseSerializer(many=True),
            403: tasks_permissions.IsMentorThroughTaskPermission.message,
        },
    )
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        """Create A Initiative

        Creates a initiative and returns it.
        """
        serializer = tasks_serializers.base.InitiativeBaseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        task = serializer.validated_data.get("task")

        self.check_object_permissions(request, task)

        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=tasks_serializers.request.CreateInitialInitiativeRequestSerializer,
        responses={
            200: tasks_serializers.base.InitiativeBaseSerializer(many=True),
            403: tasks_permissions.IsMentorThroughTaskPermission.message,
        },
    )
    @transaction.atomic
    @action(detail=False, methods=["POST"], url_path="create-initial-initiatives")
    def initial_initiatives(self, request):
        """Generate Initatives Using AI

        generate initatives based on capsule proposal,
        initial readiness level, and task.
        """
        request_serializer = (
            tasks_serializers.request.CreateInitialInitiativeRequestSerializer(
                data=request.data
            )
        )
        request_serializer.is_valid(raise_exception=True)

        task = request_serializer.validated_data.get("task")
        no_of_initiatives_to_create = request_serializer.validated_data.get(
            "no_of_initiatives_to_create"
        )

        base_prompt = tasks_utils.create_base_prompt(task.startup)

        if not base_prompt:
            return Response(
                "No capusle proposal found.", status=status.HTTP_400_BAD_REQUEST
            )

        task_prompt = tasks_utils.create_task_prompt(task)
        prompt = f"""
        {base_prompt}

        Based on this task:
        {task_prompt}

        Task: Create me {no_of_initiatives_to_create} initiatives for the startup's personalized task.
        Requirement: The response should be in a JSON format.
        It should consist of description, measures, targets, remarks
        JSON format: [{{"description": "", "measures": "", "targets": "", "remarks":""}}]
        Requirement note:
        - description have 400 max length
        - measures, targets, and remarks have 150 max length
        """
        explanation, _ = call_gemini_api(prompt)

        initiatives = []
        for initiative_data in explanation:
            description = initiative_data.get("description")
            measures = initiative_data.get("measures")
            targets = initiative_data.get("targets")
            remarks = initiative_data.get("remarks")

            initiatives.append(
                tasks_models.Initiative.objects.create(
                    description=description,
                    measures=measures,
                    targets=targets,
                    remarks=remarks,
                    task_id=task.id,
                    is_ai_generated=True,
                )
            )

        return Response(
            tasks_serializers.base.InitiativeBaseSerializer(
                initiatives, many=True
            ).data,
            status=status.HTTP_200_OK,
        )


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

        # if viewset_action in ["partial_update", "destroy"]:
        #     return super().get_permission()

        # elif viewset_action in ["create", "initial_roadblocks"]:
        #     return [tasks_permissions.IsMentorThroughTaskPermission()]

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

        is_ai_generated = serializer.validated_data.get("is_ai_generated")
        if is_ai_generated:
            queryset = queryset.filter(is_ai_generated=is_ai_generated)

        return queryset.all()

    @swagger_auto_schema(
        query_serializer=tasks_serializers.query.RoadblockQuerySerializer,
        responses={200: tasks_serializers.base.RoadblockBaseSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        """List Roadblocks

        Returns a list of roadblocks.
        """
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=tasks_serializers.base.RoadblockBaseSerializer,
        responses={
            200: tasks_serializers.base.RoadblockBaseSerializer(),
            403: tasks_permissions.IsMentorThroughInitiativePermission.message,
        },
    )
    @transaction.atomic
    def partial_update(self, request, *args, **kwargs):
        """Update A Roadblock

        Partially updates a roadblocks and returns it.
        """
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        responses={
            204: "",
            403: tasks_permissions.IsMentorThroughInitiativePermission.message,
        },
    )
    @transaction.atomic
    def destroy(self, request, *args, **kwargs):
        """Delete A Roadblock

        Deletes a roadblock.
        """
        return super().destroy(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=tasks_serializers.base.RoadblockBaseSerializer,
        responses={
            200: tasks_serializers.base.RoadblockBaseSerializer(),
            403: tasks_permissions.IsMentorThroughTaskPermission.message,
        },
    )
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        """Create A Roadblock

        Creates a roadblock and returns it.
        """
        serializer = tasks_serializers.base.RoadblockBaseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        startup = serializer.validated_data.get("startup")

        self.check_object_permissions(request, startup)

        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        request_body=tasks_serializers.request.CreateInitialRoadblockRequestSerializer,
        responses={
            200: tasks_serializers.base.RoadblockBaseSerializer(many=True),
            403: tasks_permissions.IsMentorThroughTaskPermission.message,
        },
    )
    @transaction.atomic
    @action(detail=False, methods=["POST"], url_path="create-initial-roadblocks")
    def initial_roadblocks(self, request):
        """Generate Roadblocks Using AI

        generate roadblocks based on capsule proposal,
        initial readiness level, tasks, and initiatives.
        """
        request_serializer = (
            tasks_serializers.request.CreateInitialRoadblockRequestSerializer(
                data=request.data
            )
        )
        request_serializer.is_valid(raise_exception=True)

        startup = request_serializer.validated_data.get("startup")

        self.check_object_permissions(request, startup)

        no_of_roadblocks_to_create = request_serializer.validated_data.get(
            "no_of_roadblocks_to_create"
        )

        base_prompt = tasks_utils.create_base_prompt(startup)

        if not base_prompt:
            return Response(
                "No capusle proposal found.", status=status.HTTP_400_BAD_REQUEST
            )

        exclude_statuses = [
            tasks_models.TaskStatus.DISCONTINUED,
            tasks_models.TaskStatus.COMPLETED,
        ]

        tasks_prompt = ""
        tasks = tasks_models.Task.objects.filter(startup_id=startup.id).exclude(
            status__in=exclude_statuses
        )
        task_ids = list(tasks.values_list("id", flat=True))
        for task in tasks:
            tasks_prompt += f"{tasks_utils.create_task_prompt(task)}\n\n"

        initiatives_prompt = ""
        initiatives = tasks_models.Initiative.objects.filter(
            task_id__in=task_ids
        ).exclude(status__in=exclude_statuses)
        for initiative in initiatives:
            initiatives_prompt += (
                f"{tasks_utils.create_initiative_prompt(initiative)}\n\n"
            )

        prompt = f"""
        {base_prompt}

        Based on these tasks:
        {tasks_prompt}

        Based on these initiatives:
        {initiatives_prompt}

        Task: If roadblock exists for the startup's personalized tasks, and initiatives. Create me at least {no_of_roadblocks_to_create} roadblocks. Else return a empty list.
        Requirement: The response should be in a JSON format.
        It should consist of description, and fix
        JSON format: [{{"description": "", "fix": ""}}]
        Requirement note:
        - description and fix have 500 max length
        - return an empty list if no roadblock exists for it.
        """

        explanation, _ = call_gemini_api(prompt)

        roadblocks = []
        for roadblock_data in explanation:
            description = roadblock_data.get("description")
            fix = roadblock_data.get("fix")

            roadblocks.append(
                tasks_models.Roadblock.objects.create(
                    description=description,
                    fix=fix,
                    startup_id=startup.id,
                    is_ai_generated=True,
                )
            )

        return Response(
            tasks_serializers.base.RoadblockBaseSerializer(roadblocks, many=True).data,
            status=status.HTTP_200_OK,
        )
