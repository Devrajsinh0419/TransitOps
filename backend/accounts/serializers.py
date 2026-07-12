from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'first_name', 'last_name', 'name', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() or obj.username

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'role', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            role=validated_data.get('role', User.Role.DISPATCHER),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def to_internal_value(self, data):
        # Map 'email' to 'username' if 'username' is not present
        if 'username' not in data and 'email' in data:
            data = data.copy() if hasattr(data, 'copy') else dict(data)
            data['username'] = data['email']
        return super().to_internal_value(data)

    def validate(self, attrs):
        username_or_email = attrs.get(self.username_field)
        if username_or_email and '@' in username_or_email:
            try:
                user = User.objects.get(email=username_or_email)
                attrs[self.username_field] = user.username
            except User.DoesNotExist:
                pass
        try:
            data = super().validate(attrs)
        except Exception:
            raise serializers.ValidationError({"detail": "Invalid credentials."})
        data['accessToken'] = data.get('access')
        data['refreshToken'] = data.get('refresh')
        user_data = UserSerializer(self.user).data
        user_data['name'] = f"{self.user.first_name} {self.user.last_name}".strip() or self.user.username
        data['user'] = user_data
        return data
