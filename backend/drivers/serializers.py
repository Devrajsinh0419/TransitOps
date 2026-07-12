from rest_framework import serializers
from .models import Driver
from vehicles.serializers import VehicleSerializer

class DriverSerializer(serializers.ModelSerializer):
    assigned_vehicle_detail = VehicleSerializer(source='assigned_vehicle', read_only=True)

    class Meta:
        model = Driver
        fields = '__all__'

    def validate(self, attrs):
        category = attrs.get('license_category')
        l_type = attrs.get('license_type')
        if not category and l_type:
            attrs['license_category'] = l_type
        elif category and not l_type:
            attrs['license_type'] = category
        return attrs
