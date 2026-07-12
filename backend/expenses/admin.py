from django.contrib import admin
from .models import Expense

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'expense_type', 'amount', 'date', 'status')
    list_filter = ('status', 'expense_type', 'date')
    search_fields = ('vehicle__registration_number', 'description')
