from rest_framework import serializers
from .models import Expense
from vehicles.serializers import VehicleSerializer
from django.conf import settings


class ExpenseSerializer(serializers.ModelSerializer):
    vehicle_detail = VehicleSerializer(source='vehicle', read_only=True)
    invoiceNumber = serializers.CharField(source='invoice_number', required=False, allow_blank=True)
    attachmentUrl = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Expense
        fields = '__all__'

    def get_attachmentUrl(self, obj):
        if obj.receipt:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.receipt.url)
            return obj.receipt.url
        return None

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

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, 'copy') else dict(data)

        if 'invoiceNumber' in data:
            data['invoice_number'] = data['invoiceNumber']
        if 'expenseType' in data:
            data['expense_type'] = data['expenseType']

        # If a real file object was uploaded (multipart), leave it as-is.
        # If only an absolute URL string was provided (pre-upload flow), strip
        # it down to the relative media path so DRF can store it correctly.
        attachment = data.get('attachmentUrl') or data.get('receipt')
        if attachment and isinstance(attachment, str):
            media_url = settings.MEDIA_URL  # e.g. "/media/"
            relative_path = attachment
            # Strip scheme + host if present (absolute URL)
            if '://' in relative_path:
                try:
                    from urllib.parse import urlparse
                    parsed = urlparse(relative_path)
                    relative_path = parsed.path
                except Exception:
                    pass
            # Strip leading MEDIA_URL prefix
            if relative_path.startswith(media_url):
                relative_path = relative_path[len(media_url):]
            data['receipt'] = relative_path

        return super().to_internal_value(data)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['invoiceNumber'] = instance.invoice_number
        ret['expenseType'] = instance.expense_type
        ret['attachmentUrl'] = self.get_attachmentUrl(instance)
        ret['vehicleId'] = instance.vehicle_id
        ret['vehicleRegistration'] = instance.vehicle.registration_number
        ret['vehicleName'] = instance.vehicle.vehicle_name
        return ret
