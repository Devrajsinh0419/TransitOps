from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExpenseViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'expense-records', ExpenseViewSet, basename='expense')

urlpatterns = [
    path('', include(router.urls)),
]
