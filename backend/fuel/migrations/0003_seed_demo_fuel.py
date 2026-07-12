from django.db import migrations

def seed_fuel_data(apps, schema_editor):
    Vehicle = apps.get_model('vehicles', 'Vehicle')
    FuelLog = apps.get_model('fuel', 'FuelLog')

    # Seed vehicles if they don't exist
    v1, _ = Vehicle.objects.get_or_create(
        registration_number='TRK-491-A',
        defaults={
            'vehicle_name': 'Volvo FH16 Globetrotter',
            'make': 'Volvo Trucks',
            'model': 'FH16',
            'year': 2024,
            'vehicle_type': 'heavy_truck',
            'max_load_capacity': 22000,
            'odometer': 14200,
            'status': 'Available'
        }
    )

    v2, _ = Vehicle.objects.get_or_create(
        registration_number='VAN-102-X',
        defaults={
            'vehicle_name': 'Ford Transit Cargo Van',
            'make': 'Ford Motor Company',
            'model': 'Transit 350',
            'year': 2023,
            'vehicle_type': 'delivery_van',
            'max_load_capacity': 4500,
            'odometer': 38200,
            'status': 'On Trip'
        }
    )

    v3, _ = Vehicle.objects.get_or_create(
        registration_number='TRK-108-B',
        defaults={
            'vehicle_name': 'Scania R500 V8',
            'make': 'Scania AB',
            'model': 'R500',
            'year': 2022,
            'vehicle_type': 'heavy_truck',
            'max_load_capacity': 24000,
            'odometer': 98400,
            'status': 'In Shop'
        }
    )

    # Seed fuel logs
    FuelLog.objects.get_or_create(
        invoice_number='FUL-2026-0001',
        defaults={
            'vehicle': v1,
            'liters': 120.00,
            'cost': 186.00,
            'odometer': 14200,
            'date': '2026-07-02',
            'fuel_type': 'Diesel',
            'fuel_station': 'Shell Station North'
        }
    )

    FuelLog.objects.get_or_create(
        invoice_number='FUL-2026-0002',
        defaults={
            'vehicle': v2,
            'liters': 50.00,
            'cost': 74.00,
            'odometer': 38200,
            'date': '2026-07-04',
            'fuel_type': 'Gasoline',
            'fuel_station': 'Chevron Highway 5'
        }
    )

    FuelLog.objects.get_or_create(
        invoice_number='FUL-2026-0003',
        defaults={
            'vehicle': v3,
            'liters': 210.00,
            'cost': 314.00,
            'odometer': 98400,
            'date': '2026-07-05',
            'fuel_type': 'Diesel',
            'fuel_station': 'BP Auto Plaza'
        }
    )

def clear_fuel_data(apps, schema_editor):
    FuelLog = apps.get_model('fuel', 'FuelLog')
    FuelLog.objects.all().delete()

class Migration(migrations.Migration):

    dependencies = [
        ('fuel', '0002_fuellog_fuel_station_fuellog_fuel_type_and_more'),
        ('vehicles', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_fuel_data, reverse_code=clear_fuel_data),
    ]
