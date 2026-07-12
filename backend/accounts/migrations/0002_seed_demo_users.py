from django.db import migrations

def seed_users(apps, schema_editor):
    User = apps.get_model('accounts', 'User')
    # Create admin@transitops.com
    if not User.objects.filter(email='admin@transitops.com').exists():
        User.objects.create_superuser(
            username='admin',
            email='admin@transitops.com',
            password='Admin@123',
            first_name='System',
            last_name='Administrator',
            role='admin'
        )
    # Create fleet@transitops.com
    if not User.objects.filter(email='fleet@transitops.com').exists():
        User.objects.create_user(
            username='fleet',
            email='fleet@transitops.com',
            password='Fleet@123',
            first_name='Fleet Manager',
            last_name='User',
            role='fleet_manager'
        )
    # Create safety@transitops.com
    if not User.objects.filter(email='safety@transitops.com').exists():
        User.objects.create_user(
            username='safety',
            email='safety@transitops.com',
            password='Safety@123',
            first_name='Safety Officer',
            last_name='User',
            role='safety_officer'
        )
    # Create finance@transitops.com
    if not User.objects.filter(email='finance@transitops.com').exists():
        User.objects.create_user(
            username='finance',
            email='finance@transitops.com',
            password='Finance@123',
            first_name='Financial Analyst',
            last_name='User',
            role='financial_analyst'
        )

class Migration(migrations.Migration):
    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_users),
    ]
