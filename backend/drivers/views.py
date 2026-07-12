from rest_framework import viewsets, filters
from .models import Driver
from .serializers import DriverSerializer

class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'license_number', 'contact_number']
    ordering_fields = ['created_at', 'safety_score']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
            
        license_type = self.request.query_params.get('license_type')
        if license_type:
            queryset = queryset.filter(license_category__iexact=license_type)
            
        return queryset
