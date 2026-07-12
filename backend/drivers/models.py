from django.db import models
from vehicles.models import Vehicle

class Driver(models.Model):
    class Status(models.TextChoices):
        AVAILABLE = "Available", "Available"
        ON_TRIP = "On Trip", "On Trip"
        OFF_DUTY = "Off Duty", "Off Duty"
        SUSPENDED = "Suspended", "Suspended"

    photo = models.ImageField(upload_to='drivers/photos/', null=True, blank=True)
    name = models.CharField(max_length=100)
    license_number = models.CharField(max_length=50, unique=True)
    license_category = models.CharField(max_length=50)
    license_type = models.CharField(max_length=50, blank=True, default="")
    license_expiry = models.DateField()
    contact_number = models.CharField(max_length=20)
    safety_score = models.DecimalField(max_digits=5, decimal_places=2, default=100.00)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.AVAILABLE
    )
    assigned_vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True, blank=True, related_name='drivers')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
