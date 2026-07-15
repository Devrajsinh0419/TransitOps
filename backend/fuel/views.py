from rest_framework import viewsets, filters, status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Avg, Count
from django.db.models.functions import TruncMonth, TruncDay
from .models import FuelLog
from .serializers import FuelLogSerializer

class FuelLogViewSet(viewsets.ModelViewSet):
    queryset = FuelLog.objects.all()
    serializer_class = FuelLogSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['vehicle__registration_number', 'vehicle__vehicle_name']
    ordering_fields = ['date', 'cost', 'liters', 'odometer']
    ordering = ['-date']

    def get_queryset(self):
        queryset = super().get_queryset()
        vehicle = self.request.query_params.get('vehicleId') or self.request.query_params.get('vehicle')
        if vehicle:
            queryset = queryset.filter(vehicle_id=vehicle)
        
        fuel_type = self.request.query_params.get('fuelType')
        if fuel_type:
            queryset = queryset.filter(fuel_type__icontains=fuel_type)

        date_range = self.request.query_params.get('dateRange') or self.request.query_params.get('date_from')
        if date_range:
            # Simple handling if dateRange is just a starting date, or adjust according to frontend implementation
            queryset = queryset.filter(date__gte=date_range)
        return queryset

    @action(detail=False, methods=['get'], url_path='statistics')
    def statistics(self, request):
        queryset = self.get_queryset()
        
        stats = queryset.aggregate(
            total_liters=Sum('liters'),
            total_cost=Sum('cost'),
            avg_cost=Avg('cost'),
            avg_liters=Avg('liters'),
            log_count=Count('id')
        )
        
        total_liters = stats['total_liters'] or 0
        total_cost = stats['total_cost'] or 0
        avg_cost_per_liter = (total_cost / total_liters) if total_liters > 0 else 0

        period = request.query_params.get('period', 'month')
        
        if period == 'month':
            period_data = queryset.annotate(month=TruncMonth('date')).values('month').annotate(
                total_liters=Sum('liters'),
                total_cost=Sum('cost'),
                count=Count('id')
            ).order_by('month')
        else:
            period_data = queryset.annotate(day=TruncDay('date')).values('day').annotate(
                total_liters=Sum('liters'),
                total_cost=Sum('cost'),
                count=Count('id')
            ).order_by('day')

        response_data = {
            "summary": {
                "total_liters": float(total_liters),
                "total_cost": float(total_cost),
                "avg_cost_per_liter": float(avg_cost_per_liter),
                "avg_liters_per_refuel": float(stats['avg_liters'] or 0),
                "total_refuels": stats['log_count']
            },
            "period_breakdown": list(period_data)
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
