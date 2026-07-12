from rest_framework import serializers
from .models import FuelLog
from vehicles.serializers import VehicleSerializer
from django.conf import settings

class FuelLogSerializer(serializers.ModelSerializer):
    vehicle_detail = VehicleSerializer(source='vehicle', read_only=True)
    
    invoiceNumber = serializers.CharField(source='invoice_number', required=False, allow_blank=True)
    fuelType = serializers.CharField(source='fuel_type', required=False, allow_blank=True)
    fuelStation = serializers.CharField(source='fuel_station', required=False, allow_blank=True)
    quantity = serializers.DecimalField(source='liters', max_digits=10, decimal_places=2)
    totalCost = serializers.DecimalField(source='cost', max_digits=12, decimal_places=2)
    attachmentUrl = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = FuelLog
        fields = '__all__'

    def get_attachmentUrl(self, obj):
        if obj.receipt:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.receipt.url)
            return obj.receipt.url
        return None

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, 'copy') else dict(data)
        
        if 'invoiceNumber' in data:
            data['invoice_number'] = data['invoiceNumber']
        if 'fuelType' in data:
            data['fuel_type'] = data['fuelType']
        if 'fuelStation' in data:
            data['fuel_station'] = data['fuelStation']
        if 'quantity' in data:
            data['liters'] = data['quantity']
        if 'totalCost' in data:
            data['cost'] = data['totalCost']
            
        attachment_url = data.get('attachmentUrl') or data.get('receipt')
        if attachment_url and isinstance(attachment_url, str):
            media_url = settings.MEDIA_URL
            relative_path = attachment_url
            if relative_path.startswith(media_url):
                relative_path = relative_path[len(media_url):]
            if '://' in relative_path:
                parts = relative_path.split(media_url, 1)
                if len(parts) > 1:
                    relative_path = parts[1]
            data['receipt'] = relative_path

        return super().to_internal_value(data)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['invoiceNumber'] = instance.invoice_number
        ret['fuelType'] = instance.fuel_type
        ret['fuelStation'] = instance.fuel_station
        ret['quantity'] = float(instance.liters)
        ret['totalCost'] = float(instance.cost)
        ret['attachmentUrl'] = self.get_attachmentUrl(instance)
        ret['vehicleId'] = instance.vehicle_id
        ret['vehicleRegistration'] = instance.vehicle.registration_number
        ret['vehicleName'] = instance.vehicle.vehicle_name
        ret['pricePerLiter'] = float(instance.cost / instance.liters) if instance.liters > 0 else 0
        return ret

