from rest_framework import serializers
from .models import Vehicle

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

    def validate(self, attrs):
        reg = attrs.get('registration_number')
        plate = attrs.get('license_plate')
        
        if not reg and plate:
            attrs['registration_number'] = plate
        elif reg and not plate:
            attrs['license_plate'] = reg
        elif not reg and not plate:
            raise serializers.ValidationError("Either registration_number or license_plate must be provided.")
            
        if not attrs.get('vehicle_name'):
            make = attrs.get('make', '')
            model = attrs.get('model', '')
            attrs['vehicle_name'] = f"{make} {model}".strip() or "Unknown Vehicle"
            
        return attrs
