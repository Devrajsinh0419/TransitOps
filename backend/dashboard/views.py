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

class FleetOverviewView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        total = Vehicle.objects.count()
        active = Vehicle.objects.filter(status=Vehicle.Status.ON_TRIP).count()
        available = Vehicle.objects.filter(status=Vehicle.Status.AVAILABLE).count()
        in_shop = Vehicle.objects.filter(status=Vehicle.Status.IN_SHOP).count()
        
        return Response({
            "total": total,
            "active": active,
            "available": available,
            "in_shop": in_shop
        })

class TripsSummaryView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        recent_trips = Trip.objects.all().order_by('-created_at')[:5]
        data = [{
            "id": trip.id,
            "source": trip.source,
            "destination": trip.destination,
            "driver": trip.driver.name,
            "status": trip.status,
            "dispatch_date": trip.dispatch_date
        } for trip in recent_trips]
        return Response(data)

class ActivitiesView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        # Generate dummy/recent activities
        return Response([
            {"id": 1, "description": "Trip dispatched to driver John", "timestamp": "2026-07-12T12:00:00Z"},
            {"id": 2, "description": "Vehicle status changed to Available", "timestamp": "2026-07-12T11:30:00Z"},
            {"id": 3, "description": "New fuel log added for GJ01AB1234", "timestamp": "2026-07-12T10:45:00Z"}
        ])

class NotificationsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        return Response([
            {"id": 1, "title": "Low fuel alert", "message": "Vehicle GJ01AB1234 has low fuel.", "type": "warning", "timestamp": "2026-07-12T12:00:00Z"},
            {"id": 2, "title": "Maintenance Due", "message": "Vehicle MH12CD5678 maintenance is due.", "type": "info", "timestamp": "2026-07-12T09:00:00Z"}
        ])
