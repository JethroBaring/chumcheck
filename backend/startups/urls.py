from rest_framework import routers

from startups import views

router = routers.SimpleRouter()
router.register(r"startups", views.StartupViewSet)
router.register(r"startup-readiness-levels", views.StartupReadinessLevelViewSet)
router.register(
    r"readiness-level-criterion-answers", views.ReadinessLevelCriterionAnswerViewSet
)
router.register(r"urat-question-answers", views.UratQuestionAnswerViewSet)
router.register(r"calculator-question-answers", views.CalculatorQuestionAnswerViewSet)
router.register(r"capsule-proposal-infos", views.CapsuleProposalInfoViewSet)
router.register(r"startup-rna", views.StartupRNAViewSet)
router.register(r"cohorts", views.CohortViewSet)
router.register(r"analytics", views.AnalyticsViewSet)
router.register(r"startup-members", views.StartupMemberViewSet)
router.register(r"startup-contracted-members", views.StratupContractMemberViewSet)

urlpatterns = router.urls
