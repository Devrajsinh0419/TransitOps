from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Vehicle
from .serializers import VehicleSerializer

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['registration_number', 'license_plate', 'vehicle_name', 'model', 'make']
    ordering_fields = ['created_at', 'odometer', 'max_load_capacity']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
        return queryset

    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        vehicle = self.get_object()
        vehicle.status = Vehicle.Status.RETIRED
        vehicle.save()
        return Response(self.get_serializer(vehicle).data)

    @action(detail=True, methods=['post'])
    def restore(self, request, pk=None):
        vehicle = self.get_object()
        vehicle.status = Vehicle.Status.AVAILABLE
        vehicle.save()
        return Response(self.get_serializer(vehicle).data)

