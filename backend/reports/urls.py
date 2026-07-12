from django.urls import path
from .views import (
    TripHistoryReportView,
    VehicleUtilizationReportView,
    FuelCostReportView,
    ExpenseReportView
)

urlpatterns = [
    path('trip-history/', TripHistoryReportView.as_view(), name='report_trip_history'),
    path('vehicle-utilization/', VehicleUtilizationReportView.as_view(), name='report_vehicle_utilization'),
    path('fuel-cost/', FuelCostReportView.as_view(), name='report_fuel_cost'),
    path('expense/', ExpenseReportView.as_view(), name='report_expense'),

    path('fleet-summary/', FuelCostReportView.as_view(), name='report_fleet_summary'),
    path('vehicle-performance/', VehicleUtilizationReportView.as_view(), name='report_vehicle_performance'),
    path('driver-performance/', TripHistoryReportView.as_view(), name='report_driver_performance'),
    path('financial-summary/', ExpenseReportView.as_view(), name='report_financial_summary'),
]
