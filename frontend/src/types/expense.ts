import { BaseEntity } from './common';

export type ExpenseCategory = 'fuel' | 'maintenance' | 'toll' | 'parking' | 'insurance' | 'salary' | 'other';
export type ExpenseStatus = 'pending' | 'approved' | 'rejected';

export interface ExpenseRecord extends BaseEntity {
  vehicleId?: string;
  driverId?: string;
  tripId?: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  description: string;
  status: ExpenseStatus;
  approvedBy?: string;
  receiptUrl?: string;
}
