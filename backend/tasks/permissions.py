from startups import permissions as startups_permissions
from tasks import models as tasks_models


class IsManagerOrMemberOrMentorOfStartUpThroughTaskPermission(
    startups_permissions.IsManagerOrMemberOrMentorOfStartUpPermission
):
    def has_object_permission(self, request, view, obj: tasks_models.Task):
        return super().has_object_permission(request, view, obj.startup)


class IsMentorThroughTaskPermission(startups_permissions.IsMentorOrManagerPermission):
    def has_object_permission(self, request, view, obj: tasks_models.Task):
        return super().has_object_permission(request, view, obj.startup)


class IsManagerOrMemberOrMentorOfStartUpThroughInitiativePermission(
    startups_permissions.IsManagerOrMemberOrMentorOfStartUpPermission
):
    def has_object_permission(self, request, view, obj: tasks_models.Initiative):
        return super().has_object_permission(request, view, obj.task.startup)


class IsMentorThroughInitiativePermission(
    startups_permissions.IsMentorOrManagerPermission
):
    def has_object_permission(self, request, view, obj: tasks_models.Initiative):
        return super().has_object_permission(request, view, obj.task.startup)
