from rest_framework.permissions import BasePermission
from .models import Library

class IslibraryMember(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return True
    def has_object_permission(self, request, view, obj):
        if isinstance(obj, Library):
            return obj. members.filter(id=request.user.id).exists()
        return False
    
