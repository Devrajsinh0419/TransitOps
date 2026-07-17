from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FuelLogViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'fuel-entries', FuelLogViewSet, basename='fuel')

urlpatterns = [
    path('', include(router.urls)),
]
