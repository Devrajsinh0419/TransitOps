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

        if 'invoiceNumber' in data:
            data['invoice_number'] = data['invoiceNumber']
        if 'expenseType' in data:
            data['expense_type'] = data['expenseType']
        if 'paymentMethod' in data:
            data['payment_method'] = data['paymentMethod']
        if 'vendor' in data:
            data['vendor'] = data['vendor']

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
        ret['vehicleId'] = str(instance.vehicle_id)
        ret['vehicleRegistration'] = instance.vehicle.registration_number
        ret['vehicleName'] = instance.vehicle.vehicle_name

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
