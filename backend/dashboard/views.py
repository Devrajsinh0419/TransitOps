from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum

from vehicles.models import Vehicle
from drivers.models import Driver
from trips.models import Trip
from fuel.models import FuelLog
from expenses.models import Expense

class DashboardStatsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        total_vehicles = Vehicle.objects.count()
        available_vehicles = Vehicle.objects.filter(status=Vehicle.Status.AVAILABLE).count()
        vehicles_on_trip = Vehicle.objects.filter(status=Vehicle.Status.ON_TRIP).count()
        vehicles_in_maintenance = Vehicle.objects.filter(status=Vehicle.Status.IN_SHOP).count()

        total_drivers = Driver.objects.count()
        available_drivers = Driver.objects.filter(status=Driver.Status.AVAILABLE).count()

        active_trips = Trip.objects.filter(status=Trip.Status.DISPATCHED).count()

        total_fuel_cost = FuelLog.objects.aggregate(total=Sum('cost'))['total'] or 0
        total_expenses = Expense.objects.aggregate(total=Sum('amount'))['total'] or 0

        data = {
            "total_vehicles": total_vehicles,
            "available_vehicles": available_vehicles,
            "vehicles_on_trip": vehicles_on_trip,
            "vehicles_in_maintenance": vehicles_in_maintenance,
            "total_drivers": total_drivers,
            "available_drivers": available_drivers,
            "active_trips": active_trips,
            "total_fuel_cost": float(total_fuel_cost),
            "total_expenses": float(total_expenses)
        }
        return Response(data)
