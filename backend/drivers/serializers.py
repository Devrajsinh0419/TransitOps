from rest_framework import serializers
from .models import Driver
from vehicles.serializers import VehicleSerializer


class DriverSerializer(serializers.ModelSerializer):
    assigned_vehicle_detail = VehicleSerializer(source='assigned_vehicle', read_only=True)
    photo_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Driver
        fields = '__all__'

    def get_photo_url(self, obj):
        if obj.photo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return None

    def validate(self, attrs):
        category = attrs.get('license_category')
        l_type = attrs.get('license_type')
        if not category and l_type:
            attrs['license_category'] = l_type
        elif category and not l_type:
            attrs['license_type'] = category
        return attrs

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['photo_url'] = self.get_photo_url(instance)
        return ret
