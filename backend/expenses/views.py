from rest_framework import viewsets, filters
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Expense
from .serializers import ExpenseSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['description', 'expense_type', 'category']
    ordering_fields = ['created_at', 'date', 'amount']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status__iexact=status)
            
        # Support both 'category', 'expenseType', and 'expense_type' parameters
        category = self.request.query_params.get('category') or self.request.query_params.get('expenseType') or self.request.query_params.get('expense_type')
        if category:
            mapping = {
                'fuel': 'Fuel',
                'toll': 'Toll',
                'repair': 'Repair',
                'repairs': 'Repair',
                'insurance': 'Insurance',
                'maintenance': 'Maintenance',
            }
            mapped_category = mapping.get(category.lower(), category)
            queryset = queryset.filter(expense_type__iexact=mapped_category)
            
        # Support both 'vehicle', 'vehicleId', and 'vehicle_id' parameters
        vehicle = self.request.query_params.get('vehicle') or self.request.query_params.get('vehicleId') or self.request.query_params.get('vehicle_id')
        if vehicle:
            mock_id_to_reg = {
                'veh-1': 'TRK-491-A',
                'veh-2': 'VAN-102-X',
                'veh-3': 'TRK-108-B',
                'veh-4': 'TRK-552-C',
                'veh-5': 'TRL-809-Y',
                'veh-6': 'TRK-789-M',
            }
            if isinstance(vehicle, str) and vehicle in mock_id_to_reg:
                from vehicles.models import Vehicle
                try:
                    vehicle_obj = Vehicle.objects.get(registration_number=mock_id_to_reg[vehicle])
                    queryset = queryset.filter(vehicle_id=vehicle_obj.id)
                except Vehicle.DoesNotExist:
                    queryset = queryset.none()
            elif str(vehicle).isdigit():
                queryset = queryset.filter(vehicle_id=int(vehicle))
            
        return queryset
