from django.db import models
from vehicles.models import Vehicle

class Expense(models.Model):
    class ExpenseType(models.TextChoices):
        FUEL = "Fuel", "Fuel"
        TOLL = "Toll", "Toll"
        REPAIR = "Repair", "Repair"
        INSURANCE = "Insurance", "Insurance"
        MAINTENANCE = "Maintenance", "Maintenance"
        OTHER = "Other", "Other"

    class Status(models.TextChoices):
        PENDING = "Pending", "Pending"
        APPROVED = "Approved", "Approved"
        REJECTED = "Rejected", "Rejected"

    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='expenses')
    expense_type = models.CharField(max_length=50, choices=ExpenseType.choices)
    category = models.CharField(max_length=50, blank=True, default="")
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField(blank=True, default="")
    date = models.DateField()
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )
    receipt = models.FileField(upload_to='receipts/', null=True, blank=True)
    invoice_number = models.CharField(max_length=100, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.expense_type} - {self.amount} ({self.status})"
