import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from expenses.serializers import ExpenseSerializer
data = {
  "vehicleId": "1",
  "expenseType": "Fuel",
  "amount": 100,
  "date": "2026-07-15",
  "receipt": "/media/receipts/test.png",
  "status": "paid",
  "description": "test"
}
s = ExpenseSerializer(data=data)
print("Is valid:", s.is_valid())
if not s.is_valid():
    print("Errors:", s.errors)
