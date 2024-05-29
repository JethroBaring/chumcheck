from django.db import models
from generic.models import BaseModel
from users import models as users_models
from readinesslevel import models as readinesslevel_models


class Startup(BaseModel):
    class QualificationStatus(models.IntegerChoices):
        PENDING = 1
        RATED = 2
        QUALIFIED = 3

    name = models.CharField(max_length=300)
    user = models.ForeignKey(
        users_models.StartupUser,
        on_delete=models.SET_NULL,
        related_name="startups",
        null=True,
        default=None,
    )
    qualification_status = models.IntegerField(
        choices=QualificationStatus.choices, default=QualificationStatus.PENDING
    )
    data_privacy = models.BooleanField(default=False)
    capsule_proposal = models.FileField(upload_to="capsule_proposals")
    links = models.TextField(null=True, blank=True)
    group_name = models.CharField(max_length=100)

    university_name = models.CharField(max_length=200, null=True, blank=True)
    eligibility = models.BooleanField(default=False)
    mentors = models.ManyToManyField(users_models.MentorUser, related_name="startups")

    @property
    def leader_first_name(self):
        return self.user.first_name if self.user else ""

    @property
    def leader_last_name(self):
        return self.user.last_name if self.user else ""

    @property
    def leader_email(self):
        return self.user.email if self.user else ""


class StartupMember(BaseModel):
    startup = models.ForeignKey(
        Startup, on_delete=models.CASCADE, related_name="members"
    )
    user = models.ForeignKey(
        users_models.BaseUser,
        on_delete=models.CASCADE,
        related_name="startup_members",
        null=True,
        default=None,
    )

    @property
    def first_name(self):
        return self.user.first_name if self.user else ""

    @property
    def last_name(self):
        return self.user.last_name if self.user else ""

    @property
    def email(self):
        return self.user.email if self.user else ""


class StartupReadinessLevel(BaseModel):
    startup = models.ForeignKey(
        Startup, on_delete=models.CASCADE, related_name="readiness_levels"
    )
    readiness_level = models.ForeignKey(
        readinesslevel_models.ReadinessLevel,
        on_delete=models.CASCADE,
        related_name="startups_level",
    )


class URATQuestionAnswer(BaseModel):
    startup = models.ForeignKey(
        Startup, on_delete=models.CASCADE, related_name="urat_question_answers"
    )
    urat_question = models.ForeignKey(
        readinesslevel_models.URATQuestion,
        on_delete=models.CASCADE,
        related_name="answers",
    )
    response = models.CharField(max_length=500)
    score = models.SmallIntegerField(default=1)

    class Meta:
        unique_together = ["startup", "urat_question"]


class ReadinessLevelCriterionAnswer(BaseModel):
    startup = models.ForeignKey(
        Startup,
        on_delete=models.CASCADE,
        related_name="readiness_level_criterion_answers",
    )
    criterion = models.ForeignKey(
        readinesslevel_models.LevelCriterion,
        on_delete=models.CASCADE,
        related_name="answers",
    )
    score = models.SmallIntegerField()
    remark = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        unique_together = ["startup", "criterion"]


class CalculatorQuestionAnswer(BaseModel):
    startup = models.ForeignKey(
        Startup,
        on_delete=models.CASCADE,
        related_name="calculator_answers_answers",
    )
    calculator_question = models.ForeignKey(
        readinesslevel_models.CalculatorQuestion,
        on_delete=models.CASCADE,
        related_name="answers",
    )

    class Meta:
        unique_together = ["startup", "calculator_question"]


class CapsuleProposalInfo(BaseModel):
    title = models.CharField(max_length=50)
    startup_description = models.CharField(max_length=100)
    problem_statement = models.CharField(max_length=200)
    target_market = models.CharField(max_length=100)
    solution_description = models.CharField(max_length=500)
    objectives = models.CharField(max_length=50)
    scope = models.CharField(max_length=50)
    methodology = models.CharField(max_length=300)
    startup = models.OneToOneField(
        Startup, on_delete=models.CASCADE, related_name="capsule_proposal_info"
    )

    class Meta:
        db_table = "capsule_proposals_info"


class StartupRNA(BaseModel):
    startup = models.ForeignKey(Startup, on_delete=models.CASCADE, related_name="rnas")

    readiness_level = models.ForeignKey(
        readinesslevel_models.ReadinessLevel,
        on_delete=models.CASCADE,
        related_name="startup_rnas",
    )
    rna = models.TextField()

    class Meta:
        db_table = "startup_rnas"
