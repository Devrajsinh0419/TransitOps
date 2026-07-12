import { z } from 'zod';

export const maintenanceSchema = z.object({
  vehicleId: z.string().min(1, { message: 'Vehicle selection is required' }),
  vehicleRegistration: z.string().min(1, { message: 'Vehicle registration is required' }),
  vehicleOdometer: z.coerce.number().nonnegative({ message: 'Odometer must be non-negative' }),
  vehicleStatus: z.string().min(1, { message: 'Vehicle status is required' }),
  
  type: z.enum(['routine', 'repair', 'inspection', 'breakdown']),
  issueTitle: z.string().min(1, { message: 'Issue Title is required' }).max(100),
  description: z.string().min(1, { message: 'Description is required' }),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  estimatedDuration: z.string().min(1, { message: 'Estimated duration is required' }),

  technicianName: z.string().min(1, { message: 'Technician name is required' }),
  workshop: z.string().min(1, { message: 'Workshop is required' }),
  scheduledDate: z.string().min(1, { message: 'Expected start date is required' }),
  completionDate: z.string().min(1, { message: 'Expected completion date is required' }),

  estimatedCost: z.coerce.number().nonnegative({ message: 'Estimated cost must be positive or zero' }),
  labourCost: z.coerce.number().nonnegative({ message: 'Labour cost must be positive or zero' }),
  partsCost: z.coerce.number().nonnegative({ message: 'Parts cost must be positive or zero' }),
  tax: z.coerce.number().nonnegative({ message: 'Tax must be positive or zero' }),
});

export type MaintenanceSchemaInput = z.infer<typeof maintenanceSchema>;
