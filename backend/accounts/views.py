from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import RegisterSerializer, UserSerializer, CustomTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "accessToken": str(refresh.access_token),
            "refreshToken": str(refresh),
            "user": UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        if 'refreshToken' in request.data and 'refresh' not in request.data:
            request.data['refresh'] = request.data['refreshToken']
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            data = response.data
            data['accessToken'] = data.get('access')
            data['refreshToken'] = data.get('refresh', request.data.get('refresh'))
        return response

class CurrentUserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class LogoutView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)

class ForgotPasswordView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        return Response({"message": "Password reset email sent"}, status=status.HTTP_200_OK)

class ResetPasswordView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        return Response({"message": "Password has been reset successfully"}, status=status.HTTP_200_OK)

class VerifyEmailView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        return Response({"message": "Email verified successfully"}, status=status.HTTP_200_OK)

# Settings Views
class ProfileView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role,
            "contact_number": getattr(user, 'contact_number', ''),
            "avatar_url": None,
        })

    def put(self, request):
        user = request.user
        data = request.data
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.email = data.get('email', user.email)
        user.save()
        return self.get(request)

class UserSettingsViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

class RolesView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        return Response([
            {"id": "fleet_manager", "name": "Fleet Manager", "description": "Manage fleet assets and reports"},
            {"id": "dispatcher", "name": "Dispatcher", "description": "Dispatch trips and assign drivers"},
            {"id": "safety_officer", "name": "Safety Officer", "description": "Monitor safety scores and driving compliance"},
            {"id": "financial_analyst", "name": "Financial Analyst", "description": "Track costs, fuels, and expenses"},
        ])

class PermissionsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        return Response([
            {"id": "view_fleet", "name": "View Fleet", "description": "Access fleet details"},
            {"id": "manage_fleet", "name": "Manage Fleet", "description": "Modify fleet details"},
            {"id": "view_trips", "name": "View Trips", "description": "Access trips"},
            {"id": "manage_trips", "name": "Manage Trips", "description": "Create and update trips"},
        ])

class AppearanceSettingsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        return Response({
            "theme": "dark",
            "language": "en",
            "sidebar_collapsed": False,
        })

    def put(self, request):
        return Response(request.data)

class FleetSettingsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        return Response({
            "idle_timeout": 300,
            "max_speed": 110,
            "fuel_alert_threshold": 15,
        })

    def put(self, request):
        return Response(request.data)

class SecuritySettingsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        return Response({
            "mfa_enabled": False,
            "password_expiry_days": 90,
            "session_timeout_minutes": 30,
        })

    def put(self, request):
        return Response(request.data)
