import { z } from 'zod';

export const fuelSchema = z.object({
  vehicleId: z.string().min(1, { message: 'Vehicle selection is required' }),
  driverId: z.string().min(1, { message: 'Driver assignment is required' }),
  tripId: z.string().optional(),
  fuelType: z.string().min(1, { message: 'Fuel type is required' }),
  quantity: z.coerce.number().positive({ message: 'Quantity must be positive' }),
  pricePerLiter: z.coerce.number().positive({ message: 'Price per liter must be positive' }),
  totalCost: z.coerce.number().positive({ message: 'Total cost must be positive' }),
  odometer: z.coerce.number().nonnegative({ message: 'Odometer must be non-negative' }),
  fuelStation: z.string().min(1, { message: 'Fuel station name is required' }),
  invoiceNumber: z.string().min(1, { message: 'Invoice / Receipt number is required' }),
  receiptImage: z.string().optional(),
  date: z.string().min(1, { message: 'Log date is required' }),
});

export type FuelSchemaInput = z.infer<typeof fuelSchema>;
