import csv
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count, Avg

from trips.models import Trip
from vehicles.models import Vehicle
from fuel.models import FuelLog
from expenses.models import Expense
from drivers.models import Driver

class TripHistoryReportView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        trips = Trip.objects.all().order_by('-dispatch_date')
        
        if request.query_params.get('format') == 'csv':
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="trip_history.csv"'
            writer = csv.writer(response)
            writer.writerow(['ID', 'Source', 'Destination', 'Vehicle', 'Driver', 'Cargo Weight', 'Distance', 'Revenue', 'Status', 'Dispatch Date'])
            for trip in trips:
                writer.writerow([
                    trip.id, trip.source, trip.destination, 
                    trip.vehicle.registration_number, trip.driver.name,
                    trip.cargo_weight, trip.distance, trip.revenue, 
                    trip.status, trip.dispatch_date
                ])
            return response

        data = [{
            "id": trip.id,
            "source": trip.source,
            "destination": trip.destination,
            "vehicle": trip.vehicle.registration_number,
            "driver": trip.driver.name,
            "cargo_weight": float(trip.cargo_weight),
            "distance": float(trip.distance),
            "revenue": float(trip.revenue),
            "status": trip.status,
            "dispatch_date": trip.dispatch_date
        } for trip in trips]
        return Response(data)

class VehicleUtilizationReportView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        vehicles = Vehicle.objects.all()
        report_data = []

        for vehicle in vehicles:
            trips = vehicle.trips.all()
            total_trips = trips.count()
            total_distance = trips.aggregate(total=Sum('distance'))['total'] or 0
            total_revenue = trips.aggregate(total=Sum('revenue'))['total'] or 0
            
            report_data.append({
                "vehicle_id": vehicle.id,
                "registration_number": vehicle.registration_number,
                "vehicle_name": vehicle.vehicle_name,
                "status": vehicle.status,
                "total_trips": total_trips,
                "total_distance": float(total_distance),
                "total_revenue": float(total_revenue)
            })

        if request.query_params.get('format') == 'csv':
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="vehicle_utilization.csv"'
            writer = csv.writer(response)
            writer.writerow(['Vehicle ID', 'Registration Number', 'Vehicle Name', 'Status', 'Total Trips', 'Total Distance', 'Total Revenue'])
            for row in report_data:
                writer.writerow([
                    row['vehicle_id'], row['registration_number'], row['vehicle_name'],
                    row['status'], row['total_trips'], row['total_distance'], row['total_revenue']
                ])
            return response

        return Response(report_data)

class FuelCostReportView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        fuel_logs = FuelLog.objects.all().order_by('-date')
        
        if request.query_params.get('format') == 'csv':
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="fuel_cost_report.csv"'
            writer = csv.writer(response)
            writer.writerow(['ID', 'Vehicle', 'Liters', 'Cost', 'Odometer', 'Date'])
            for log in fuel_logs:
                writer.writerow([
                    log.id, log.vehicle.registration_number, log.liters, log.cost, log.odometer, log.date
                ])
            return response

        data = [{
            "id": log.id,
            "vehicle": log.vehicle.registration_number,
            "liters": float(log.liters),
            "cost": float(log.cost),
            "odometer": log.odometer,
            "date": log.date
        } for log in fuel_logs]
        return Response(data)

class ExpenseReportView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        expenses = Expense.objects.all().order_by('-date')

        if request.query_params.get('format') == 'csv':
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="expense_report.csv"'
            writer = csv.writer(response)
            writer.writerow(['ID', 'Vehicle', 'Expense Type', 'Category', 'Amount', 'Status', 'Date'])
            for exp in expenses:
                writer.writerow([
                    exp.id, exp.vehicle.registration_number, exp.expense_type, exp.category, exp.amount, exp.status, exp.date
                ])
            return response

        data = [{
            "id": exp.id,
            "vehicle": exp.vehicle.registration_number,
            "expense_type": exp.expense_type,
            "category": exp.category,
            "amount": float(exp.amount),
            "status": exp.status,
            "date": exp.date
        } for exp in expenses]
        return Response(data)

# Analytics & Export Views matching report.service.ts
class ExecutiveKPIsView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        return Response({
            "totalRevenue": 250000.0,
            "totalExpenses": 85000.0,
            "netProfit": 165000.0,
            "fleetUtilization": 85.5,
            "activeTripsCount": Trip.objects.filter(status=Trip.Status.DISPATCHED).count(),
        })

class FleetAnalyticsView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        return Response({
            "totalVehicles": Vehicle.objects.count(),
            "activeVehicles": Vehicle.objects.filter(status=Vehicle.Status.ON_TRIP).count(),
            "utilizationRate": 78.4,
            "vehiclePerformance": []
        })

class TripAnalyticsView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        return Response({
            "totalTrips": Trip.objects.count(),
            "completedTrips": Trip.objects.filter(status=Trip.Status.COMPLETED).count(),
            "activeTrips": Trip.objects.filter(status=Trip.Status.DISPATCHED).count(),
            "totalDistance": 12500.0,
            "averageDistance": 250.0,
        })

class DriverAnalyticsView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        return Response({
            "totalDrivers": 15,
            "activeDrivers": 10,
            "avgSafetyScore": 92.5,
        })

class MaintenanceAnalyticsView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        return Response({
            "totalCost": 12400.0,
            "scheduledMaintenance": 3,
            "completedMaintenance": 12,
        })

class FuelAnalyticsView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        return Response({
            "totalFuelCost": 45000.0,
            "totalFuelLiters": 3000.0,
            "avgFuelEfficiency": 12.5,
        })

class ExpenseAnalyticsView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        return Response({
            "totalAmount": 85000.0,
            "categories": [
                {"name": "Fuel", "value": 45000.0},
                {"name": "Maintenance", "value": 12400.0},
                {"name": "Toll", "value": 5000.0},
                {"name": "Insurance", "value": 15000.0},
                {"name": "Other", "value": 7600.0},
            ]
        })

class CustomReportView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        return Response({
            "title": "Custom Report",
            "columns": ["Date", "Item", "Value"],
            "data": []
        })

class ExportCSVView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        report_name = request.query_params.get('reportName', 'generic').lower()
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="{report_name}_report.csv"'
        
        writer = csv.writer(response)
        
        if report_name == 'fleet':
            writer.writerow(['ID', 'Registration Number', 'Vehicle Name', 'Vehicle Type', 'Status', 'Current Odometer'])
            for v in Vehicle.objects.all():
                writer.writerow([v.id, v.registration_number, v.vehicle_name, v.vehicle_type, v.status, v.current_odometer])
                
        elif report_name == 'trips':
            writer.writerow(['ID', 'Trip Number', 'Driver', 'Vehicle', 'Source', 'Destination', 'Status', 'Start Date'])
            for t in Trip.objects.all():
                driver_name = f"{t.driver.first_name} {t.driver.last_name}" if t.driver else "None"
                vehicle_name = t.vehicle.registration_number if t.vehicle else "None"
                writer.writerow([t.id, t.trip_number, driver_name, vehicle_name, t.source, t.destination, t.status, t.start_date])
                
        elif report_name == 'drivers':
            writer.writerow(['ID', 'Name', 'Email', 'License Number', 'Status'])
            for d in Driver.objects.all():
                writer.writerow([d.id, f"{d.first_name} {d.last_name}", d.email, d.license_number, d.status])
                
        elif report_name == 'fuel':
            writer.writerow(['ID', 'Vehicle', 'Liters', 'Cost', 'Odometer', 'Date', 'Fuel Type', 'Fuel Station', 'Invoice Number'])
            for f in FuelLog.objects.all():
                writer.writerow([f.id, f.vehicle.registration_number, f.liters, f.cost, f.odometer, f.date, f.fuel_type, f.fuel_station, f.invoice_number])
                
        elif report_name == 'expenses':
            writer.writerow(['ID', 'Vehicle', 'Expense Type', 'Category', 'Amount', 'Status', 'Date', 'Invoice Number'])
            for e in Expense.objects.all():
                writer.writerow([e.id, e.vehicle.registration_number, e.expense_type, e.category, e.amount, e.status, e.date, e.invoice_number])
                
        else:
            writer.writerow(['Report Name', 'Export Date'])
            writer.writerow([report_name.capitalize(), '2026-07-12'])
            
        return response

class ExportExcelView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        report_name = request.query_params.get('reportName', 'generic').lower()
        response = HttpResponse(content_type='application/vnd.ms-excel')
        response['Content-Disposition'] = f'attachment; filename="{report_name}_report.xls"'
        
        writer = csv.writer(response, delimiter='\t')
        
        if report_name == 'fleet':
            writer.writerow(['ID', 'Registration Number', 'Vehicle Name', 'Vehicle Type', 'Status', 'Current Odometer'])
            for v in Vehicle.objects.all():
                writer.writerow([v.id, v.registration_number, v.vehicle_name, v.vehicle_type, v.status, v.current_odometer])
        elif report_name == 'trips':
            writer.writerow(['ID', 'Trip Number', 'Driver', 'Vehicle', 'Source', 'Destination', 'Status'])
            for t in Trip.objects.all():
                driver_name = f"{t.driver.first_name} {t.driver.last_name}" if t.driver else "None"
                vehicle_name = t.vehicle.registration_number if t.vehicle else "None"
                writer.writerow([t.id, t.trip_number, driver_name, vehicle_name, t.source, t.destination, t.status])
        else:
            writer.writerow(['Report Name', 'Export Date'])
            writer.writerow([report_name.capitalize(), '2026-07-12'])
            
        return response
