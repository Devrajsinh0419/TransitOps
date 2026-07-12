from rest_framework import serializers
from django.utils import timezone
from django.db import transaction
from .models import Trip
from vehicles.models import Vehicle
from drivers.models import Driver
from vehicles.serializers import VehicleSerializer
from drivers.serializers import DriverSerializer

class TripSerializer(serializers.ModelSerializer):
    vehicle_detail = VehicleSerializer(source='vehicle', read_only=True)
    driver_detail = DriverSerializer(source='driver', read_only=True)

    class Meta:
        model = Trip
        fields = '__all__'

    def validate(self, attrs):
        instance = self.instance
        
        vehicle = attrs.get('vehicle', instance.vehicle if instance else None)
        driver = attrs.get('driver', instance.driver if instance else None)
        cargo_weight = attrs.get('cargo_weight', instance.cargo_weight if instance else None)
        status = attrs.get('status', instance.status if instance else Trip.Status.DRAFT)
        
        if vehicle and cargo_weight is not None:
            if vehicle.max_load_capacity is not None and cargo_weight > vehicle.max_load_capacity:
                raise serializers.ValidationError({
                    "cargo_weight": f"Cargo weight ({cargo_weight}) exceeds vehicle capacity ({vehicle.max_load_capacity})."
                })

        if status == Trip.Status.DISPATCHED:
            if vehicle:
                is_current_vehicle = instance and instance.vehicle == vehicle
                if vehicle.status != Vehicle.Status.AVAILABLE and not (is_current_vehicle and instance.status == Trip.Status.DISPATCHED):
                    raise serializers.ValidationError({
                        "vehicle": f"Vehicle is not available (current status: {vehicle.status})."
                    })

            if driver:
                is_current_driver = instance and instance.driver == driver
                if driver.status != Driver.Status.AVAILABLE and not (is_current_driver and instance.status == Trip.Status.DISPATCHED):
                    raise serializers.ValidationError({
                        "driver": f"Driver is not available (current status: {driver.status})."
                    })

                today = timezone.localdate()
                if driver.license_expiry < today:
                    raise serializers.ValidationError({
                        "driver": f"Driver license is expired (expiry: {driver.license_expiry})."
                    })

        return attrs

    def create(self, validated_data):
        status = validated_data.get('status', Trip.Status.DRAFT)
        vehicle = validated_data['vehicle']
        driver = validated_data['driver']

        with transaction.atomic():
            trip = Trip.objects.create(**validated_data)
            if status == Trip.Status.DISPATCHED:
                vehicle.status = Vehicle.Status.ON_TRIP
                vehicle.save()
                driver.status = Driver.Status.ON_TRIP
                driver.save()
            return trip

    def update(self, instance, validated_data):
        old_status = instance.status
        old_vehicle = instance.vehicle
        old_driver = instance.driver

        new_status = validated_data.get('status', old_status)
        new_vehicle = validated_data.get('vehicle', old_vehicle)
        new_driver = validated_data.get('driver', old_driver)

        with transaction.atomic():
            instance = super().update(instance, validated_data)

            if old_status == Trip.Status.DISPATCHED:
                if old_vehicle != new_vehicle or new_status in [Trip.Status.COMPLETED, Trip.Status.CANCELLED, Trip.Status.DRAFT]:
                    old_vehicle.status = Vehicle.Status.AVAILABLE
                    old_vehicle.save()
                if old_driver != new_driver or new_status in [Trip.Status.COMPLETED, Trip.Status.CANCELLED, Trip.Status.DRAFT]:
                    old_driver.status = Driver.Status.AVAILABLE
                    old_driver.save()

            if new_status == Trip.Status.DISPATCHED:
                new_vehicle.status = Vehicle.Status.ON_TRIP
                new_vehicle.save()
                new_driver.status = Driver.Status.ON_TRIP
                new_driver.save()
            elif new_status in [Trip.Status.COMPLETED, Trip.Status.CANCELLED]:
                new_vehicle.status = Vehicle.Status.AVAILABLE
                new_vehicle.save()
                new_driver.status = Driver.Status.AVAILABLE
                new_driver.save()

            return instance
