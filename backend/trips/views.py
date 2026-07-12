from rest_framework import viewsets, filters
from .models import Trip
from .serializers import TripSerializer

class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['source', 'destination', 'vehicle__registration_number', 'driver__name']
    ordering_fields = ['created_at', 'dispatch_date', 'distance', 'revenue']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status__iexact=status)
            
        vehicle = self.request.query_params.get('vehicle')
        if vehicle:
            queryset = queryset.filter(vehicle_id=vehicle)
            
        driver = self.request.query_params.get('driver')
        if driver:
            queryset = queryset.filter(driver_id=driver)
            
        date_from = self.request.query_params.get('date_from')
        if date_from:
            queryset = queryset.filter(dispatch_date__date__gte=date_from)
            
        return queryset
