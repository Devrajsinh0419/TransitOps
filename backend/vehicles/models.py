from django.db import models

class Vehicle(models.Model):
    class Status(models.TextChoices):
        AVAILABLE = "Available", "Available"
        ON_TRIP = "On Trip", "On Trip"
        IN_SHOP = "In Shop", "In Shop"
        RETIRED = "Retired", "Retired"

    registration_number = models.CharField(max_length=50, unique=True)
    license_plate = models.CharField(max_length=50, blank=True, default="")
    vehicle_name = models.CharField(max_length=100)
    make = models.CharField(max_length=100, blank=True, default="")
    model = models.CharField(max_length=100)
    year = models.IntegerField(null=True, blank=True)
    vehicle_type = models.CharField(max_length=50, blank=True, default="")
    max_load_capacity = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    odometer = models.IntegerField(default=0)
    acquisition_cost = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.AVAILABLE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.vehicle_name} ({self.registration_number})"
