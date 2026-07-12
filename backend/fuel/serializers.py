from rest_framework import serializers
from .models import FuelLog
from vehicles.serializers import VehicleSerializer

class FuelLogSerializer(serializers.ModelSerializer):
    vehicle_detail = VehicleSerializer(source='vehicle', read_only=True)

    class Meta:
        model = FuelLog
        fields = '__all__'
