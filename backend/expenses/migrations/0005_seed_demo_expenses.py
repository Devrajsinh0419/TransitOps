from django.db import migrations

def seed_expenses(apps, schema_editor):
    Vehicle = apps.get_model('vehicles', 'Vehicle')
    Expense = apps.get_model('expenses', 'Expense')

    # Get vehicles
    v1 = Vehicle.objects.filter(registration_number='TRK-491-A').first()
    v2 = Vehicle.objects.filter(registration_number='VAN-102-X').first()
    v3 = Vehicle.objects.filter(registration_number='TRK-108-B').first()

    # Seed expenses matching the analytics values
    Expense.objects.create(
        vehicle=v1,
        expense_type='Fuel',
        category='Fuel',
        amount=8420.00,
        description='Fuel refill at Shell station',
        date='2026-07-02',
        status='Approved',
        invoice_number='EXP-2026-0001',
        vendor='Shell Station North',
        payment_method='Credit Card'
    )

    Expense.objects.create(
        vehicle=v3,
        expense_type='Maintenance',
        category='Maintenance',
        amount=4250.00,
        description='Scheduled maintenance service',
        date='2026-07-05',
        status='Approved',
        invoice_number='EXP-2026-0002',
        vendor='Scania Service Center',
        payment_method='Bank Transfer'
    )

    Expense.objects.create(
        vehicle=v2,
        expense_type='Insurance',
        category='Insurance',
        amount=2900.00,
        description='Commercial insurance policy installment',
        date='2026-07-04',
        status='Approved',
        invoice_number='EXP-2026-0003',
        vendor='Progressive Insurance',
        payment_method='Credit Card'
    )

    Expense.objects.create(
        vehicle=v3,
        expense_type='Toll',
        category='Toll',
        amount=850.00,
        description='National highway toll tax',
        date='2026-07-06',
        status='Approved',
        invoice_number='EXP-2026-0004',
        vendor='National Highways Authority',
        payment_method='Fastag'
    )

    Expense.objects.create(
        vehicle=v2,
        expense_type='Other',
        category='Miscellaneous',
        amount=420.00,
        description='Shuttle cleaning fee',
        date='2026-07-07',
        status='Approved',
        invoice_number='EXP-2026-0005',
        vendor='Local Wash',
        payment_method='Cash'
    )

    # Highest expense (pending oil change / workshop repair)
    Expense.objects.create(
        vehicle=v1,
        expense_type='Maintenance',
        category='Maintenance',
        amount=1250.00,
        description='Workshop repair ticket #102',
        date='2026-07-16',
        status='Pending',
        invoice_number='EXP-2026-0102',
        vendor='Volvo Workshop',
        payment_method='Credit Card'
    )

    # Lowest expense
    Expense.objects.create(
        vehicle=v2,
        expense_type='Toll',
        category='Toll',
        amount=12.50,
        description='Highway toll gate transponder',
        date='2026-07-17',
        status='Approved',
        invoice_number='EXP-2026-0005',
        vendor='Highway Toll Plaza',
        payment_method='Cash'
    )

def clear_expenses(apps, schema_editor):
    Expense = apps.get_model('expenses', 'Expense')
    Expense.objects.all().delete()

class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0004_alter_expense_vehicle'),
        ('vehicles', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_expenses, reverse_code=clear_expenses),
    ]
