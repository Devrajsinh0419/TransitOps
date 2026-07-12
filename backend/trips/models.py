from django.db import models
from vehicles.models import Vehicle
from drivers.models import Driver

class Trip(models.Model):
    class Status(models.TextChoices):
        DRAFT = "Draft", "Draft"
        DISPATCHED = "Dispatched", "Dispatched"
        COMPLETED = "Completed", "Completed"
        CANCELLED = "Cancelled", "Cancelled"

    source = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='trips')
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name='trips')
    cargo_weight = models.DecimalField(max_digits=10, decimal_places=2)
    distance = models.DecimalField(max_digits=10, decimal_places=2)
    revenue = models.DecimalField(max_digits=12, decimal_places=2)
    dispatch_date = models.DateTimeField(null=True, blank=True)
    completion_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.DRAFT
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Trip from {self.source} to {self.destination} ({self.status})"
