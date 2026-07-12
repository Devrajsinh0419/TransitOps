from rest_framework.permissions import BasePermission
from .models import User

class IsFleetManager(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == User.Role.FLEET_MANAGER

class IsDispatcher(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == User.Role.DISPATCHER

class IsSafetyOfficer(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == User.Role.SAFETY_OFFICER

class IsFinancialAnalyst(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == User.Role.FINANCIAL_ANALYST
