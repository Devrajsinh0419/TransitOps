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
            writer.writerow(['ID', 'Source', 'Destination', 'Vehicle', 'Driver', 'Cargo Weight (kg)', 'Distance (km)', 'Revenue (₹)', 'Status', 'Dispatch Date'])
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
            writer.writerow(['Vehicle ID', 'Registration Number', 'Vehicle Name', 'Status', 'Total Trips', 'Total Distance (km)', 'Total Revenue (₹)'])
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
            writer.writerow(['ID', 'Vehicle', 'Liters (L)', 'Cost (₹)', 'Odometer (km)', 'Date'])
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
            writer.writerow(['ID', 'Vehicle', 'Expense Type', 'Category', 'Amount (₹)', 'Status', 'Date'])
            for exp in expenses:
                writer.writerow([
                    exp.id,
                    exp.vehicle.registration_number if exp.vehicle else 'N/A',
                    exp.expense_type,
                    exp.category,
                    exp.amount,
                    exp.status,
                    exp.date
                ])
            return response

        data = [{
            "id": exp.id,
            "vehicle": exp.vehicle.registration_number if exp.vehicle else 'N/A',
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
        import datetime
        from django.db.models import Sum

        # 1. Expenses by Category
        cat_mapping = {
            'Fuel': 'Fuel',
            'Toll': 'Tolls',
            'Repair': 'Maintenance',
            'Maintenance': 'Maintenance',
            'Insurance': 'Insurance',
            'Other': 'Miscellaneous',
        }
        totals = {}
        for item in Expense.objects.filter(status='Approved'):
            cat = cat_mapping.get(item.expense_type, 'Miscellaneous')
            totals[cat] = totals.get(cat, 0.0) + float(item.amount)
        
        expensesByCategory = []
        for cat in ['Fuel', 'Maintenance', 'Insurance', 'Tolls', 'Miscellaneous']:
            expensesByCategory.append({"name": cat, "value": round(totals.get(cat, 0.0), 2)})

        # 2. Monthly Expenses (last 6 months)
        months_list = []
        today = datetime.date.today()
        for i in range(5, -1, -1):
            m = today.month - i
            y = today.year
            while m <= 0:
                m += 12
                y -= 1
            month_name = datetime.date(y, m, 1).strftime('%b')
            months_list.append((y, m, month_name))
        
        monthlyExpenses = []
        for y, m, name in months_list:
            val = Expense.objects.filter(status='Approved', date__year=y, date__month=m).aggregate(total=Sum('amount'))['total'] or 0.0
            monthlyExpenses.append({"name": name, "value": round(float(val), 2)})

        # 3. Vehicle Expenses
        vehicle_totals = {}
        for item in Expense.objects.filter(status='Approved'):
            reg = item.vehicle.registration_number if item.vehicle else 'N/A'
            vehicle_totals[reg] = vehicle_totals.get(reg, 0.0) + float(item.amount)
        vehicleExpenses = [{"name": reg, "value": round(val, 2)} for reg, val in vehicle_totals.items()]

        # 4. Department Expenses (mapped from vehicle_type)
        dept_totals = {}
        for item in Expense.objects.filter(status='Approved'):
            if item.vehicle:
                vtype = item.vehicle.vehicle_type or ''
                if 'heavy' in vtype.lower():
                    dept = 'Heavy Logistics'
                elif 'van' in vtype.lower() or 'delivery' in vtype.lower():
                    dept = 'Last Mile Delivery'
                else:
                    dept = 'Support & Shuttle'
            else:
                dept = 'Support & Shuttle'
            dept_totals[dept] = dept_totals.get(dept, 0.0) + float(item.amount)
        
        departmentExpenses = [{"name": dept, "value": round(val, 2)} for dept, val in dept_totals.items()]
        for dept in ['Heavy Logistics', 'Last Mile Delivery', 'Support & Shuttle']:
            if not any(d['name'] == dept for d in departmentExpenses):
                departmentExpenses.append({"name": dept, "value": 0.0})

        # 5. Cards data
        approved_qs = Expense.objects.filter(status='Approved')
        highest = approved_qs.order_by('-amount').first()
        lowest = approved_qs.order_by('amount').first()
        
        total_approved = sum(totals.values())
        unique_months = len(set((e.date.year, e.date.month) for e in approved_qs))
        avg_monthly = total_approved / unique_months if unique_months > 0 else total_approved
        
        top_cat = max(totals.items(), key=lambda x: x[1]) if totals else ('None', 0.0)
        pct = (top_cat[1] / total_approved * 100) if total_approved > 0 else 0.0
        
        cards = {
            "highestExpense": {
                "label": "HIGHEST LOGGED COST",
                "value": f"₹{highest.amount:,.2f}" if highest else "₹0.00",
                "extra": highest.description if highest and highest.description else "No approved costs"
            },
            "lowestExpense": {
                "label": "LOWEST LOGGED COST",
                "value": f"₹{lowest.amount:,.2f}" if lowest else "₹0.00",
                "extra": lowest.description if lowest and lowest.description else "No approved costs"
            },
            "averageMonthlyExpense": {
                "label": "AVERAGE MONTHLY OUTFLOW",
                "value": f"₹{avg_monthly:,.2f}",
                "extra": "Aggregated operating costs"
            },
            "expenseDistribution": {
                "label": "TOP EXPENSE CATEGORY",
                "value": f"{top_cat[0]} ({pct:.1f}%)" if top_cat[0] != 'None' else 'None',
                "extra": f"Followed by other operating costs"
            }
        }

        return Response({
            "expensesByCategory": expensesByCategory,
            "monthlyExpenses": monthlyExpenses,
            "vehicleExpenses": vehicleExpenses,
            "departmentExpenses": departmentExpenses,
            "cards": cards
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
            writer.writerow(['ID', 'Registration Number', 'Vehicle Name', 'Vehicle Type', 'Status', 'Current Odometer (km)'])
            for v in Vehicle.objects.all():
                writer.writerow([v.id, v.registration_number, v.vehicle_name, v.vehicle_type, v.status, v.odometer])
                
        elif report_name == 'trips':
            writer.writerow(['ID', 'Trip Number', 'Driver', 'Vehicle', 'Source', 'Destination', 'Status', 'Dispatch Date'])
            for t in Trip.objects.all():
                driver_name = t.driver.name if t.driver else "None"
                vehicle_name = t.vehicle.registration_number if t.vehicle else "None"
                writer.writerow([t.id, f"TRP-{t.id}", driver_name, vehicle_name, t.source, t.destination, t.status, t.dispatch_date])
                
        elif report_name == 'drivers':
            writer.writerow(['ID', 'Name', 'Email', 'License Number', 'Status'])
            for d in Driver.objects.all():
                writer.writerow([d.id, d.name, d.email, d.license_number, d.status])
                
        elif report_name == 'fuel':
            writer.writerow(['ID', 'Vehicle', 'Liters (L)', 'Cost (₹)', 'Odometer (km)', 'Date', 'Fuel Type', 'Fuel Station', 'Invoice Number'])
            for f in FuelLog.objects.all():
                writer.writerow([f.id, f.vehicle.registration_number, f.liters, f.cost, f.odometer, f.date, f.fuel_type, f.fuel_station, f.invoice_number])
                
        elif report_name == 'expenses':
            writer.writerow(['ID', 'Vehicle', 'Expense Type', 'Category', 'Amount (₹)', 'Status', 'Date', 'Invoice Number'])
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
            writer.writerow(['ID', 'Registration Number', 'Vehicle Name', 'Vehicle Type', 'Status', 'Current Odometer (km)'])
            for v in Vehicle.objects.all():
                writer.writerow([v.id, v.registration_number, v.vehicle_name, v.vehicle_type, v.status, v.odometer])
        elif report_name == 'trips':
            writer.writerow(['ID', 'Trip Number', 'Driver', 'Vehicle', 'Source', 'Destination', 'Status'])
            for t in Trip.objects.all():
                driver_name = t.driver.name if t.driver else "None"
                vehicle_name = t.vehicle.registration_number if t.vehicle else "None"
                writer.writerow([t.id, f"TRP-{t.id}", driver_name, vehicle_name, t.source, t.destination, t.status])
        else:
            writer.writerow(['Report Name', 'Export Date'])
            writer.writerow([report_name.capitalize(), '2026-07-12'])
            
        return response
