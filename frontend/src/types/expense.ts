import { BaseEntity } from './common';

export type ExpenseType = 'fuel' | 'maintenance' | 'insurance' | 'toll' | 'parking' | 'repairs' | 'registration' | 'miscellaneous';
export type ExpenseStatus = 'pending' | 'approved' | 'rejected';

export interface ExpenseRecord extends BaseEntity {
  expenseId: string; // e.g. EXP-2026-0001
  vehicleId?: string;
  vehicleRegistration?: string;
  vehicleName?: string;
  tripId?: string;
  tripNumber?: string;
  expenseType: ExpenseType;
  amount: number;
  gstAmount?: number; // GST placeholder
  status: ExpenseStatus;
  paymentMethod: string;
  vendor: string;
  invoiceNumber: string;
  description: string;
  attachmentUrl?: string; // attachment upload placeholder
  date: string;
  approvedBy?: string;
}

export interface ExpenseSummary {
  monthlyExpenses: number;
  todayExpenses: number;
  topExpenseCategory: string;
  averageDailyCost: number;
}

export interface ExpenseFilters {
  search?: string;
  vehicleId?: string;
  expenseType?: string;
  status?: string;
  dateRange?: string;
  page: number;
  limit: number;
}
