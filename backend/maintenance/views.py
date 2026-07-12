from rest_framework import viewsets, filters
from .models import Maintenance
from .serializers import MaintenanceSerializer

class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['maintenance_type', 'service_type', 'description']
    ordering_fields = ['created_at', 'start_date', 'cost']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status__iexact=status)
            
        vehicle = self.request.query_params.get('vehicle')
        if vehicle:
            queryset = queryset.filter(vehicle_id=vehicle)
            
        service_type = self.request.query_params.get('service_type')
        if service_type:
            queryset = queryset.filter(maintenance_type__iexact=service_type)
            
        return queryset
