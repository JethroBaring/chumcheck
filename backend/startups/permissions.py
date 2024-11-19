from rest_framework.permissions import IsAuthenticated
from users import models as users_models
from startups import models as startups_models


class IsManagerOrMemberOrMentorOfStartUpPermission(IsAuthenticated):
    message = "User must be a Manager, Owner, member, or mentor of Startup instance."

    def has_object_permission(self, request, view, obj: startups_models.Startup):
        user = request.user
        user_id = user.id

        return (
            user.user_type == users_models.BaseUser.UserType.MANAGER
            or obj.user_id == user_id
            or obj.members.filter(user_id=user_id).exists()
            or obj.mentors.filter(id=user_id).exists()
        )


class IsmentorOfStartUpOrManagerPermission(IsAuthenticated):
    message = "User must be a Manager, or mentor of Startup instance."

    def has_object_permission(self, request, view, obj: startups_models.Startup):
        user = request.user
        user_id = user.id

        return (
            user.user_type == users_models.BaseUser.UserType.MANAGER
            or obj.mentors.filter(id=user_id).exists()
        )


class IsMemberOfStartupPermission(IsAuthenticated):
    message = "User must be a member of the Startup instance."

    def has_object_permission(self, request, view, obj: startups_models.Startup):
        user = request.user
        user_id = user.id

        return obj.user_id == user_id or obj.members.filter(user_id=user_id).exists()


class IsMemberOfStartupThroughStartupRNAPermission(
    IsmentorOfStartUpOrManagerPermission
):
    def has_object_permission(self, request, view, obj: startups_models.StartupRNA):
        return super().has_object_permission(request, view, obj.startup)


class IsMentorOrManagerPermission(IsAuthenticated):
    message = "User must be Manager or a Mentor of the startup."

    def has_object_permission(self, request, view, obj: startups_models.Startup):
        user = request.user
        user_id = user.id

        return (
            user.user_type == users_models.BaseUser.UserType.MANAGER
            or obj.mentors.filter(id=user_id).exists()
        )


class IsMentorThroughReadinessLevelCriterionAnswerPermission(
    IsMentorOrManagerPermission
):
    def has_object_permission(
        self, request, view, obj: startups_models.ReadinessLevelCriterionAnswer
    ):
        return super().has_object_permission(request, view, obj.startup)


class IsMemberOfStartupPermissionThroughCapsuleProposalInfoPermission(
    IsMemberOfStartupPermission
):
    def has_object_permission(
        self, request, view, obj: startups_models.CapsuleProposalInfo
    ):
        return super().has_object_permission(request, view, obj.startup)
