'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layouts/PageContainer';
import { TripHeader, TripForm } from '@/components/trips';
import { useTrip } from '@/hooks/useTrip';
import { TripSchemaInput } from '@/validation/trip.schema';
import { toast } from 'sonner';

export default function EditTripPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { trip, isLoading, error, updateTripState } = useTrip(id);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleSubmit = async (data: TripSchemaInput) => {
    setIsUpdating(true);
    try {
      await updateTripState({
        tripName: data.tripName,
        tripType: data.tripType,
        priority: data.priority,
        description: data.description,
        route: {
          source: data.source,
          destination: data.destination,
          plannedDistance: Number(data.plannedDistance),
          estimatedTime: data.estimatedTime,
        },
        vehicleId: data.vehicleId,
        driverId: data.driverId,
        cargo: {
          type: data.cargoType,
          weight: Number(data.cargoWeight),
          value: Number(data.cargoValue),
          specialInstructions: data.specialInstructions,
        },
        expectedRevenue: Number(data.expectedRevenue || 0),
        estimatedFuelCost: Number(data.estimatedFuelCost || 0),
        estimatedToll: Number(data.estimatedToll || 0),
        estimatedExpenses: Number(data.estimatedExpenses || 0),
      });

      toast.success('Trip manifest updated successfully!');
      router.push(`/trips/${id}`);
    } catch (err) {
      toast.error('Failed to update trip manifest');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <PageContainer className="space-y-6">
        <div className="h-6 w-32 bg-muted animate-pulse rounded" />
        <div className="h-10 w-64 bg-muted animate-pulse rounded" />
      </PageContainer>
    );
  }

  if (error || !trip) {
    return (
      <PageContainer className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xs font-bold text-rose-500 mb-2">{error || 'Trip manifest not found'}</p>
        </div>
      </PageContainer>
    );
  }

  // Map database model to schema inputs
  const initialValues: Partial<TripSchemaInput> = {
    tripName: trip.tripName,
    tripType: trip.tripType,
    priority: trip.priority,
    description: trip.description,
    source: trip.route.source,
    destination: trip.route.destination,
    plannedDistance: trip.route.plannedDistance,
    estimatedTime: trip.route.estimatedTime,
    vehicleId: trip.vehicleId,
    vehicleCapacity: trip.vehicleCapacity,
    vehicleOdometer: trip.vehicleOdometer,
    driverId: trip.driverId,
    driverLicenseExpiry: trip.driverLicenseExpiry,
    cargoType: trip.cargo.type,
    cargoWeight: trip.cargo.weight,
    cargoValue: trip.cargo.value,
    specialInstructions: trip.cargo.specialInstructions,
    expectedRevenue: trip.expectedRevenue,
    estimatedFuelCost: trip.estimatedFuelCost,
    estimatedToll: trip.estimatedToll,
    estimatedExpenses: trip.estimatedExpenses,
  };

  return (
    <PageContainer className="space-y-6">
      <TripHeader
        title={`Edit Trip: ${trip.tripNumber}`}
        subtitle="Modify cargo weights, priority levels, route points, and vehicle/driver assignments."
        breadcrumbs={[
          { label: 'Trips', href: '/trips' },
          { label: trip.tripNumber, href: `/trips/${id}` },
          { label: 'Edit' },
        ]}
      />

      <div className="py-4">
        <TripForm initialValues={initialValues} onSubmit={handleSubmit} isLoading={isUpdating} />
      </div>
    </PageContainer>
  );
}
