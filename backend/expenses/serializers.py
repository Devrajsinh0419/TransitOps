from rest_framework import serializers
from .models import Expense
from vehicles.serializers import VehicleSerializer

class ExpenseSerializer(serializers.ModelSerializer):
    vehicle_detail = VehicleSerializer(source='vehicle', read_only=True)

    class Meta:
        model = Expense
        fields = '__all__'

    def validate(self, attrs):
        exp_type = attrs.get('expense_type')
        category = attrs.get('category')
        
        if not exp_type and category:
            if category.lower() in ['maintenance', 'repair']:
                attrs['expense_type'] = Expense.ExpenseType.REPAIR
            elif category.lower() == 'fuel':
                attrs['expense_type'] = Expense.ExpenseType.FUEL
            elif category.lower() == 'toll':
                attrs['expense_type'] = Expense.ExpenseType.TOLL
            elif category.lower() == 'insurance':
                attrs['expense_type'] = Expense.ExpenseType.INSURANCE
            else:
                attrs['expense_type'] = Expense.ExpenseType.OTHER
            attrs['category'] = category
        elif exp_type and not category:
            attrs['category'] = exp_type
            
        return attrs
