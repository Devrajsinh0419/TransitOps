import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const vehicleSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Vehicle Name is required' })
    .max(100, { message: 'Vehicle Name must be under 100 characters' }),
  registrationNumber: z
    .string()
    .min(1, { message: 'Registration Number is required' })
    .regex(/^[A-Z0-9- ]+$/i, {
      message: 'Registration Number must contain only alphanumeric characters, spaces, or hyphens',
    }),
  type: z.enum(['heavy_truck', 'delivery_van', 'trailer', 'refrigerated', 'sedan', 'suv'], {
    message: 'Vehicle type is required',
  }),
  manufacturer: z.string().min(1, { message: 'Manufacturer is required' }),
  model: z.string().min(1, { message: 'Model is required' }),
  year: z
    .preprocess(
      (val) => (val === '' ? undefined : Number(val)),
      z
        .number({ message: 'Year is required' })
        .int()
        .min(1900, { message: 'Year must be at least 1900' })
        .max(currentYear + 1, { message: `Year cannot exceed ${currentYear + 1}` })
    ),
  vinNumber: z
    .string()
    .length(17, { message: 'VIN number must be exactly 17 characters' })
    .regex(/^[A-HJ-NPR-Z0-9]+$/i, {
      message: 'Invalid VIN number (cannot contain letters I, O, or Q)',
    }),
  capacity: z
    .preprocess(
      (val) => (val === '' ? undefined : Number(val)),
      z
        .number({ message: 'Capacity is required' })
        .positive({ message: 'Capacity must be greater than 0' })
    ),
  fuelType: z.enum(['diesel', 'petrol', 'electric', 'hybrid', 'cng'], {
    message: 'Fuel type is required',
  }),
  transmission: z.enum(['automatic', 'manual'], {
    message: 'Transmission type is required',
  }),
  color: z.string().min(1, { message: 'Color is required' }),
  purchaseDate: z
    .string()
    .min(1, { message: 'Purchase Date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format must be YYYY-MM-DD' }),
  purchaseCost: z
    .preprocess(
      (val) => (val === '' ? undefined : Number(val)),
      z
        .number({ message: 'Purchase Cost is required' })
        .positive({ message: 'Purchase Cost must be greater than 0' })
    ),
  insuranceExpiry: z
    .string()
    .min(1, { message: 'Insurance Expiration Date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format must be YYYY-MM-DD' }),
  registrationExpiry: z
    .string()
    .min(1, { message: 'Registration Expiration Date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format must be YYYY-MM-DD' }),
  currentOdometer: z
    .preprocess(
      (val) => (val === '' ? 0 : Number(val)),
      z
        .number({ message: 'Odometer must be a number' })
        .nonnegative({ message: 'Odometer cannot be negative' })
    ),
  status: z.enum(['available', 'on_trip', 'maintenance', 'retired', 'inactive', 'disposed']).default('available'),
  garageLocation: z.string().min(1, { message: 'Garage location is required' }),
});

export type VehicleSchemaInput = z.infer<typeof vehicleSchema>;
