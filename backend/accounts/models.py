from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    class Role(models.TextChoices):
        FLEET_MANAGER = "fleet_manager", "Fleet Manager"
        DISPATCHER = "dispatcher", "Dispatcher"
        SAFETY_OFFICER = "safety_officer", "Safety Officer"
        FINANCIAL_ANALYST = "financial_analyst", "Financial Analyst"

    role = models.CharField(
        max_length=30,
        choices=Role.choices,
        default=Role.DISPATCHER,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)