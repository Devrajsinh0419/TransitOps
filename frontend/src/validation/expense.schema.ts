import { z } from 'zod';

export const expenseSchema = z.object({
  expenseType: z.enum([
    'fuel',
    'maintenance',
    'insurance',
    'toll',
    'parking',
    'repairs',
    'registration',
    'miscellaneous',
  ]),
  vehicleId: z.string().optional(),
  tripId: z.string().optional(),
  amount: z.coerce.number().positive({ message: 'Amount must be a positive number' }),
  gstAmount: z.coerce.number().nonnegative().optional(),
  paymentMethod: z.string().min(1, { message: 'Payment method is required' }),
  vendor: z.string().min(1, { message: 'Vendor name is required' }),
  invoiceNumber: z.string().min(1, { message: 'Invoice number is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  attachmentUrl: z.string().optional(),
  date: z.string().min(1, { message: 'Date is required' }),
});

export type ExpenseSchemaInput = z.infer<typeof expenseSchema>;
