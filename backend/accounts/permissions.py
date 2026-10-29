from rest_framework import permissions
from accounts.models import UserRole

class IsReviewerOrAdmin(permissions.BasePermission):
    """
    Allows access only to authenticated users with reviewer, specialist, facilitator, or admin roles.
    """
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        return request.user.role in [
            UserRole.REVIEWER,
            UserRole.SPECIALIST,
            UserRole.FACILITATOR,
            UserRole.ADMIN
        ]

class IsFacilitatorOrAdmin(permissions.BasePermission):
    """
    Allows mutation access only to facilitators and administrators.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        if not (request.user and request.user.is_authenticated):
            return False
        return request.user.role in [UserRole.FACILITATOR, UserRole.ADMIN]

class IsOwnerOrReviewer(permissions.BasePermission):
    """
    Object-level permission allowing access to the owner of the object,
    or authorized reviewers.
    """
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser or request.user.role == UserRole.ADMIN:
            return True
        # If user owns the object
        if hasattr(obj, 'contributor') and obj.contributor == request.user:
            return True
        if hasattr(obj, 'user') and obj.user == request.user:
            return True
        # Reviewers can view for review purposes
        if request.user.role in [UserRole.REVIEWER, UserRole.SPECIALIST, UserRole.FACILITATOR]:
            return True
        return False
