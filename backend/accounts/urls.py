from django.urls import path
from .views import (
    RegisterView,
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    CurrentUserView,
    LogoutView,
    ForgotPasswordView,
    ResetPasswordView,
    VerifyEmailView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('register', RegisterView.as_view()),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('login', CustomTokenObtainPairView.as_view()),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('logout', LogoutView.as_view()),
    path('refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('refresh', CustomTokenRefreshView.as_view()),
    path('refresh-token/', CustomTokenRefreshView.as_view(), name='token_refresh_alt'),
    path('refresh-token', CustomTokenRefreshView.as_view()),
    path('me/', CurrentUserView.as_view(), name='current_user'),
    path('me', CurrentUserView.as_view()),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('forgot-password', ForgotPasswordView.as_view()),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),
    path('reset-password', ResetPasswordView.as_view()),
    path('verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('verify-email', VerifyEmailView.as_view()),
]
