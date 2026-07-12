from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FuelLogViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'', FuelLogViewSet, basename='fuel')

urlpatterns = [
    path('', include(router.urls)),
]
