from django.contrib import admin
from .models import Trip

@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ('source', 'destination', 'vehicle', 'driver', 'status', 'dispatch_date')
    list_filter = ('status', 'dispatch_date')
    search_fields = ('source', 'destination', 'vehicle__registration_number', 'driver__name')
