from django.contrib import admin
from .models import Maintenance

@admin.register(Maintenance)
class MaintenanceAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'maintenance_type', 'cost', 'status', 'start_date', 'end_date')
    list_filter = ('status', 'maintenance_type')
    search_fields = ('vehicle__registration_number', 'maintenance_type', 'description')
