import { z } from 'zod';

export const tripSchema = z.object({
  tripName: z
    .string()
    .min(1, { message: 'Trip Name is required' })
    .max(100, { message: 'Trip Name must be under 100 characters' }),
  tripType: z.enum(['one_way', 'round_trip', 'multi_stop']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  description: z.string().optional(),

  // Route
  source: z.string().min(1, { message: 'Source location is required' }),
  destination: z.string().min(1, { message: 'Destination location is required' }),
  plannedDistance: z.coerce
    .number({ message: 'Distance must be a number' })
    .positive({ message: 'Distance must be positive' }),
  estimatedTime: z.string().min(1, { message: 'Estimated Time is required' }),

  // Vehicle
  vehicleId: z.string().min(1, { message: 'Vehicle assignment is required' }),
  vehicleCapacity: z.coerce
    .number()
    .positive({ message: 'Capacity must be positive' }),
  vehicleOdometer: z.coerce
    .number()
    .nonnegative(),

  // Driver
  driverId: z.string().min(1, { message: 'Driver assignment is required' }),
  driverLicenseExpiry: z.string().min(1, { message: 'License expiration date is required' }),

  // Cargo
  cargoType: z.string().min(1, { message: 'Cargo Type is required' }),
  cargoWeight: z.coerce
    .number({ message: 'Weight must be a number' })
    .positive({ message: 'Weight must be positive' }),
  cargoValue: z.coerce
    .number({ message: 'Value must be a number' })
    .positive({ message: 'Value must be positive' }),
  specialInstructions: z.string().optional(),

  // Financial
  expectedRevenue: z.coerce
    .number()
    .nonnegative({ message: 'Expected revenue must be positive' }),
  estimatedFuelCost: z.coerce
    .number()
    .nonnegative({ message: 'Estimated fuel cost must be positive' }),
  estimatedToll: z.coerce
    .number()
    .nonnegative({ message: 'Estimated toll must be positive' }),
  estimatedExpenses: z.coerce
    .number()
    .nonnegative({ message: 'Estimated expenses must be positive' }),
}).refine(
  (data) => data.cargoWeight <= data.vehicleCapacity,
  {
    message: 'Cargo weight exceeds the max capacity limit of the selected vehicle',
    path: ['cargoWeight'],
  }
);

export type TripSchemaInput = z.infer<typeof tripSchema>;

export const tripCompletionSchema = z.object({
  finalOdometer: z.coerce
    .number({ message: 'Odometer must be a number' })
    .positive({ message: 'Odometer must be positive' }),
  actualDistance: z.coerce
    .number({ message: 'Distance must be a number' })
    .positive({ message: 'Distance must be positive' }),
  fuelConsumed: z.coerce
    .number({ message: 'Fuel consumed must be a number' })
    .positive({ message: 'Fuel consumed must be positive' }),
  actualRevenue: z.coerce
    .number({ message: 'Actual revenue must be a number' })
    .positive({ message: 'Actual revenue must be positive' }),
  notes: z.string().optional(),
});

export type TripCompletionSchemaInput = z.infer<typeof tripCompletionSchema>;

export const tripCancellationSchema = z.object({
  cancellationReason: z.string().min(1, { message: 'Cancellation reason is required' }),
  cancellationNotes: z.string().optional(),
});

export type TripCancellationSchemaInput = z.infer<typeof tripCancellationSchema>;
