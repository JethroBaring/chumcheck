from django.db import models
from generic.models import BaseModel
from users import models as users_models
from readinesslevel import models as readinesslevel_models
from django.utils.translation import gettext_lazy as _
from startups import models as startups_models


class TaskStatus(models.IntegerChoices):
    FOR_REVIEW = 1, _("For Review")
    DISCONTINUED = 2, _("Discontinued")
    DELAYED = 3, _("Delayed")
    SCHEDULED = 4, _("Scheduled")
    ON_TRACK = 5, _("On Track")
    COMPLETED = 6, _("Completed")


class Task(BaseModel):
    class TaskType(models.IntegerChoices):
        SHORT_TERM = 1, _("Short Term")
        LONG_TERM = 2, _("Long Term")

    priority_number = models.SmallIntegerField()
    readiness_type = models.ForeignKey(
        readinesslevel_models.ReadinessType,
        on_delete=models.CASCADE,
        related_name="tasks",
    )
    target_level = models.ForeignKey(
        readinesslevel_models.ReadinessLevel,
        on_delete=models.CASCADE,
        related_name="target_levels",
    )
    target_level_score = models.ForeignKey(
        readinesslevel_models.ReadinessLevel,
        on_delete=models.CASCADE,
        related_name="target_level_scores",
        null=True,
        default=None,
    )
    description = models.CharField(max_length=500, blank=True)
    status = models.IntegerField(
        choices=TaskStatus.choices, default=TaskStatus.FOR_REVIEW
    )
    startup = models.ForeignKey(
        startups_models.Startup, on_delete=models.CASCADE, related_name="tasks"
    )
    task_type = models.IntegerField(choices=TaskType.choices)

    class Meta:
        db_table = "tasks"
        ordering = ["priority_number"]


class Initiative(BaseModel):
    initiative_number = models.SmallIntegerField()
    description = models.CharField(max_length=500, blank=True)
    measures = models.CharField(max_length=200, blank=True)
    targets = models.CharField(max_length=200, blank=True)
    remarks = models.CharField(max_length=200, blank=True)
    status = models.IntegerField(
        choices=TaskStatus.choices, default=TaskStatus.FOR_REVIEW
    )
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="initiatives")

    class Meta:
        db_table = "initiatives"
        ordering = ["initiative_number"]


class Roadblock(BaseModel):
    risk_number = models.SmallIntegerField()
    description = models.CharField(max_length=500, blank=True)
    fix = models.CharField(max_length=500, blank=True)
    assignee = models.ForeignKey(
        users_models.BaseUser,
        on_delete=models.SET_NULL,
        default=None,
        null=True,
        related_name="roadblocks",
    )
    startup = models.ForeignKey(
        startups_models.Startup, on_delete=models.CASCADE, related_name="roadblocks"
    )

    class Meta:
        db_table = "roadblocks"
        ordering = ["risk_number"]
