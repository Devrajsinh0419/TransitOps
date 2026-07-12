from rest_framework import serializers
from .models import FuelLog
from django.conf import settings


class FuelLogSerializer(serializers.ModelSerializer):

    class Meta:
        model = FuelLog
        fields = '__all__'

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, 'copy') else dict(data)

        # Map mock vehicle IDs to DB primary keys
        mock_id_to_reg = {
            'veh-1': 'TRK-491-A',
            'veh-2': 'VAN-102-X',
            'veh-3': 'TRK-108-B',
            'veh-4': 'TRK-552-C',
            'veh-5': 'TRL-809-Y',
            'veh-6': 'TRK-789-M',
        }

        from vehicles.models import Vehicle
        vehicle_val = data.get('vehicleId') or data.get('vehicle')
        if vehicle_val:
            if isinstance(vehicle_val, str) and vehicle_val in mock_id_to_reg:
                reg_num = mock_id_to_reg[vehicle_val]
                try:
                    vehicle_obj = Vehicle.objects.get(registration_number=reg_num)
                    data['vehicle'] = vehicle_obj.id
                except Vehicle.DoesNotExist:
                    pass
            elif str(vehicle_val).isdigit():
                data['vehicle'] = int(vehicle_val)

        # Camel-case → snake_case field mapping
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

        # Handle attachment URL (pre-upload flow)
        attachment = data.get('attachmentUrl') or data.get('receipt')
        if attachment and isinstance(attachment, str):
            media_url = settings.MEDIA_URL
            relative_path = attachment
            if '://' in relative_path:
                try:
                    from urllib.parse import urlparse
                    parsed = urlparse(relative_path)
                    relative_path = parsed.path
                except Exception:
                    pass
            if relative_path.startswith(media_url):
                relative_path = relative_path[len(media_url):]
            data['receipt'] = relative_path

        return super().to_internal_value(data)

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        # Emit the camelCase / frontend-expected field names
        ret['id'] = str(instance.id)
        ret['fuelLogId'] = f"FUL-{instance.id:04d}" if isinstance(instance.id, int) else f"FUL-{instance.id}"
        ret['invoiceNumber'] = instance.invoice_number
        ret['fuelType'] = instance.fuel_type
        ret['fuelStation'] = instance.fuel_station or ''
        ret['quantity'] = float(instance.liters)
        ret['totalCost'] = float(instance.cost)
        ret['pricePerLiter'] = float(instance.cost / instance.liters) if instance.liters > 0 else 0
        ret['odometer'] = instance.odometer
        ret['date'] = str(instance.date)

        # Vehicle details
        reg_to_mock_id = {
            'TRK-491-A': 'veh-1',
            'VAN-102-X': 'veh-2',
            'TRK-108-B': 'veh-3',
            'TRK-552-C': 'veh-4',
            'TRL-809-Y': 'veh-5',
            'TRK-789-M': 'veh-6',
        }
        reg_num = instance.vehicle.registration_number
        ret['vehicleId'] = reg_to_mock_id.get(reg_num, str(instance.vehicle_id))
        ret['vehicleRegistration'] = instance.vehicle.registration_number
        ret['vehicleName'] = instance.vehicle.vehicle_name

        # Driver — FuelLog has no FK to driver; return empty strings safely
        ret['driverId'] = ''
        ret['driverName'] = ''

        # Attachment URL
        if instance.receipt:
            request = self.context.get('request')
            ret['attachmentUrl'] = request.build_absolute_uri(instance.receipt.url) if request else instance.receipt.url
        else:
            ret['attachmentUrl'] = None

        # Timestamps
        ret['createdAt'] = instance.created_at.isoformat()
        ret['updatedAt'] = instance.updated_at.isoformat()

        return ret

