'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { Trip } from '@/types/trip';
import { TripRouteCard } from './TripRouteCard';
import { TripVehicleCard } from './TripVehicleCard';
import { TripDriverCard } from './TripDriverCard';
import { TripFinancialCard } from './TripFinancialCard';
import { TripCargoCard } from './TripCargoCard';

interface TripSummaryCardProps {
  trip: Partial<Trip>;
}

export function TripSummaryCard({ trip }: TripSummaryCardProps) {
  const route = trip.route
    ? {
        source: trip.route.source,
        destination: trip.route.destination,
        plannedDistance: trip.route.plannedDistance || 0,
        estimatedTime: trip.route.estimatedTime || 'N/A',
      }
    : null;

  const vehicle = trip.vehicleId
    ? {
        name: trip.vehicleName || 'N/A',
        registration: trip.vehicleRegistration || 'N/A',
        capacity: trip.vehicleCapacity || 0,
        odometer: trip.vehicleOdometer || 0,
        status: 'assigned',
      }
    : null;

  const driver = trip.driverId
    ? {
        name: trip.driverName || 'N/A',
        avatarUrl: trip.driverAvatarUrl,
        phone: trip.driverPhone || 'N/A',
        licenseExpiry: trip.driverLicenseExpiry || 'N/A',
        safetyScore: trip.driverSafetyScore || 100,
        status: 'assigned',
      }
    : null;

  const cargo = trip.cargo
    ? {
        type: trip.cargo.type || 'N/A',
        weight: trip.cargo.weight || 0,
        value: trip.cargo.value || 0,
        specialInstructions: trip.cargo.specialInstructions,
      }
    : null;

  return (
    <div className="space-y-4 select-none text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Route Card */}
        <TripRouteCard route={route} />

        {/* Cargo Card */}
        <TripCargoCard cargo={cargo} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Vehicle Card */}
        <TripVehicleCard vehicle={vehicle} cargoWeight={trip.cargo?.weight} />

        {/* Driver Card */}
        <TripDriverCard driver={driver} />

        {/* Financial projections */}
        <TripFinancialCard
          expectedRevenue={trip.expectedRevenue || 0}
          estimatedFuelCost={trip.estimatedFuelCost || 0}
          estimatedToll={trip.estimatedToll || 0}
          estimatedExpenses={trip.estimatedExpenses || 0}
          actualRevenue={trip.actualRevenue}
          actualExpenses={trip.actualExpenses}
        />
      </div>
    </div>
  );
}

export default TripSummaryCard;
