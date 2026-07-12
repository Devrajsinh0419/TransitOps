from rest_framework import serializers
from django.db import transaction
from .models import Maintenance
from vehicles.models import Vehicle
from vehicles.serializers import VehicleSerializer

class MaintenanceSerializer(serializers.ModelSerializer):
    vehicle_detail = VehicleSerializer(source='vehicle', read_only=True)

    class Meta:
        model = Maintenance
        fields = '__all__'

    def validate(self, attrs):
        m_type = attrs.get('maintenance_type')
        s_type = attrs.get('service_type')
        if not m_type and s_type:
            attrs['maintenance_type'] = s_type
        elif m_type and not s_type:
            attrs['service_type'] = m_type
        return attrs

    def create(self, validated_data):
        vehicle = validated_data['vehicle']
        status = validated_data.get('status', Maintenance.Status.PENDING)
        
        with transaction.atomic():
            maintenance = super().create(validated_data)
            if status == Maintenance.Status.IN_PROGRESS:
                vehicle.status = Vehicle.Status.IN_SHOP
                vehicle.save()
            return maintenance

    def update(self, instance, validated_data):
        old_status = instance.status
        new_status = validated_data.get('status', old_status)
        vehicle = validated_data.get('vehicle', instance.vehicle)

        with transaction.atomic():
            instance = super().update(instance, validated_data)
            
            if new_status == Maintenance.Status.COMPLETED:
                vehicle.status = Vehicle.Status.AVAILABLE
                vehicle.save()
            elif new_status == Maintenance.Status.IN_PROGRESS:
                vehicle.status = Vehicle.Status.IN_SHOP
                vehicle.save()
                
            return instance
