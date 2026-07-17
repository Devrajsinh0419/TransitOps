from rest_framework import serializers
from .models import Expense
from django.conf import settings


class ExpenseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Expense
        fields = '__all__'

    def validate(self, attrs):
        exp_type = attrs.get('expense_type')
        category = attrs.get('category')

        if not exp_type and category:
            mapping = {
                'maintenance': Expense.ExpenseType.MAINTENANCE,
                'repair': Expense.ExpenseType.REPAIR,
                'fuel': Expense.ExpenseType.FUEL,
                'toll': Expense.ExpenseType.TOLL,
                'insurance': Expense.ExpenseType.INSURANCE,
            }
            attrs['expense_type'] = mapping.get(category.lower(), Expense.ExpenseType.OTHER)
            attrs['category'] = category
        elif exp_type and not category:
            attrs['category'] = exp_type

        return attrs

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, 'copy') else dict(data)

        # Map mock vehicle IDs to DB primary keys
        mock_id_to_reg = {
            'veh-1': 'TRK-491-A',
            'veh-2': 'VAN-102-X',
            'veh-3': 'TRK-108-B',
            'veh-4': 'TRK-552-C',
            'veh-5': 'TRL-809-Y',
            'veh-6': 'TRK-789-M',
        }

        from vehicles.models import Vehicle
        vehicle_val = data.get('vehicleId') or data.get('vehicle')
        if vehicle_val:
            if isinstance(vehicle_val, str) and vehicle_val in mock_id_to_reg:
                reg_num = mock_id_to_reg[vehicle_val]
                try:
                    vehicle_obj = Vehicle.objects.get(registration_number=reg_num)
                    data['vehicle'] = vehicle_obj.id
                except Vehicle.DoesNotExist:
                    data['vehicle'] = None
            elif str(vehicle_val).isdigit():
                data['vehicle'] = int(vehicle_val)
            else:
                data['vehicle'] = None
        else:
            data['vehicle'] = None

        if 'invoiceNumber' in data:
            data['invoice_number'] = data['invoiceNumber']
        
        # Normalize and map expenseType (e.g. 'fuel', 'maintenance', 'repairs') to choices
        if 'expenseType' in data or 'expense_type' in data:
            val = str(data.get('expenseType') or data.get('expense_type')).lower()
            mapping = {
                'fuel': 'Fuel',
                'toll': 'Toll',
                'repair': 'Repair',
                'repairs': 'Repair',
                'insurance': 'Insurance',
                'maintenance': 'Maintenance',
            }
            data['expense_type'] = mapping.get(val, 'Other')

        if 'paymentMethod' in data:
            data['payment_method'] = data['paymentMethod']
        if 'vendor' in data:
            data['vendor'] = data['vendor']

        # Normalize status
        if 'status' in data:
            status_val = str(data['status']).lower()
            status_mapping = {
                'pending': 'Pending',
                'approved': 'Approved',
                'rejected': 'Rejected',
            }
            data['status'] = status_mapping.get(status_val, 'Pending')

        # Handle attachment URL (pre-upload flow)
        attachment = data.get('attachmentUrl') or data.get('receipt')
        if attachment and isinstance(attachment, str):
            media_url = settings.MEDIA_URL
            relative_path = attachment
            if '://' in relative_path:
                try:
                    from urllib.parse import urlparse
                    parsed = urlparse(relative_path)
                    relative_path = parsed.path
                except Exception:
                    pass
            if relative_path.startswith(media_url):
                relative_path = relative_path[len(media_url):]
            data['receipt'] = relative_path

        return super().to_internal_value(data)

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        # Emit camelCase / frontend-expected field names
        ret['id'] = str(instance.id)
        ret['expenseId'] = f"EXP-{instance.id:04d}" if isinstance(instance.id, int) else f"EXP-{instance.id}"
        ret['expenseType'] = instance.expense_type
        ret['invoiceNumber'] = instance.invoice_number
        ret['amount'] = float(instance.amount)
        ret['date'] = str(instance.date)
        ret['status'] = instance.status.lower()   # normalise to lowercase for frontend comparisons
        ret['description'] = instance.description
        ret['paymentMethod'] = instance.payment_method
        ret['vendor'] = instance.vendor

        # Vehicle details
        if instance.vehicle:
            reg_to_mock_id = {
                'TRK-491-A': 'veh-1',
                'VAN-102-X': 'veh-2',
                'TRK-108-B': 'veh-3',
                'TRK-552-C': 'veh-4',
                'TRL-809-Y': 'veh-5',
                'TRK-789-M': 'veh-6',
            }
            reg_num = instance.vehicle.registration_number
            ret['vehicleId'] = reg_to_mock_id.get(reg_num, str(instance.vehicle_id))
            ret['vehicleRegistration'] = instance.vehicle.registration_number
            ret['vehicleName'] = instance.vehicle.vehicle_name
        else:
            ret['vehicleId'] = None
            ret['vehicleRegistration'] = ''
            ret['vehicleName'] = ''

        # Attachment URL
        if instance.receipt:
            request = self.context.get('request')
            ret['attachmentUrl'] = request.build_absolute_uri(instance.receipt.url) if request else instance.receipt.url
        else:
            ret['attachmentUrl'] = None

        # Timestamps
        ret['createdAt'] = instance.created_at.isoformat()
        ret['updatedAt'] = instance.updated_at.isoformat()

        return ret
