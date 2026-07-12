from rest_framework import serializers
from .models import Maintenance
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
