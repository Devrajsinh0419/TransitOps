import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from rest_framework import serializers
from fuel.models import FuelLog
from fuel.serializers import FuelLogSerializer

class CustomFuelLogSerializer(FuelLogSerializer):
    receipt = serializers.CharField(required=False, allow_null=True, allow_blank=True)

data = {
  "vehicleId": "1",
  "driverId": "1",
  "tripId": "1",
  "fuelType": "Diesel",
  "quantity": 50,
  "pricePerLiter": 1.5,
  "totalCost": 75,
  "odometer": 1000,
  "fuelStation": "Shell",
  "invoiceNumber": "12345",
  "date": "2026-07-15",
  "attachmentUrl": "/media/receipts/test.png"
}
s = CustomFuelLogSerializer(data=data)
print("Is valid:", s.is_valid())
if not s.is_valid():
    print("Errors:", s.errors)
else:
    print("Validated data:", s.validated_data)
