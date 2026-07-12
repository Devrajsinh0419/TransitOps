from django.contrib import admin
from .models import FuelLog

@admin.register(FuelLog)
class FuelLogAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'liters', 'cost', 'odometer', 'date')
    list_filter = ('date', 'vehicle')
    search_fields = ('vehicle__registration_number', 'odometer')
