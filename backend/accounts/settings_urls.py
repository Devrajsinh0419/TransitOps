from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProfileView,
    ChangePasswordView,
    UserSettingsViewSet,
    RolesView,
    PermissionsView,
    AppearanceSettingsView,
    FleetSettingsView,
    SecuritySettingsView
)

router = DefaultRouter(trailing_slash=False)
router.register(r'users', UserSettingsViewSet, basename='settings_users')

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='settings_profile'),
    path('profile', ProfileView.as_view()),
    path('change-password/', ChangePasswordView.as_view(), name='settings_change_password'),
    path('change-password', ChangePasswordView.as_view()),
    path('roles/', RolesView.as_view(), name='settings_roles'),
    path('roles', RolesView.as_view()),
    path('permissions/', PermissionsView.as_view(), name='settings_permissions'),
    path('permissions', PermissionsView.as_view()),
    path('appearance/', AppearanceSettingsView.as_view(), name='settings_appearance'),
    path('appearance', AppearanceSettingsView.as_view()),
    path('fleet/', FleetSettingsView.as_view(), name='settings_fleet'),
    path('fleet', FleetSettingsView.as_view()),
    path('security/', SecuritySettingsView.as_view(), name='settings_security'),
    path('security', SecuritySettingsView.as_view()),
    path('', include(router.urls)),
]
