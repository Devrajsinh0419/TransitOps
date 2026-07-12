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
