from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        """管理者以外はRead-Onlyのみ、管理者のみ全権限"""
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_superuser
