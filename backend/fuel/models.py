from django.db import models
from vehicles.models import Vehicle

class FuelLog(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='fuel_logs')
    liters = models.DecimalField(max_digits=10, decimal_places=2)
    cost = models.DecimalField(max_digits=12, decimal_places=2)
    odometer = models.IntegerField()
    date = models.DateField()
    fuel_type = models.CharField(max_length=50, blank=True, default="")
    fuel_station = models.CharField(max_length=100, blank=True, default="")
    invoice_number = models.CharField(max_length=100, blank=True, default="")
    receipt = models.FileField(upload_to='receipts/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.vehicle} - {self.liters}L on {self.date}"
