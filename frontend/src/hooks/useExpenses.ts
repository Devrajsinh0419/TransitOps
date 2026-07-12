'use client';

import { useState, useEffect } from 'react';
import { ExpenseRecord, ExpenseSummary, ExpenseFilters } from '@/types/expense';
import { toast } from 'sonner';

const initialMockExpenses: ExpenseRecord[] = [
  {
    id: 'exp-1',
    expenseId: 'EXP-2026-0001',
    vehicleId: 'veh-3',
    vehicleRegistration: 'TRK-108-B',
    vehicleName: 'Scania R500 V8',
    expenseType: 'maintenance',
    amount: 1250.00,
    gstAmount: 100.00,
    status: 'approved',
    paymentMethod: 'Fleet Card',
    vendor: 'Dallas Fleet Hub',
    invoiceNumber: 'INV-MNT-99120',
    description: 'Brake pad replacement & caliper overhaul maintenance order.',
    attachmentUrl: '/receipts/brake_invoice.pdf',
    date: '2026-07-12',
    approvedBy: 'Fleet Manager Sarah',
    createdBy: 'System Auditor',
    createdAt: '2026-07-12T12:00:00Z',
    updatedAt: '2026-07-12T12:00:00Z',
  },
  {
    id: 'exp-2',
    expenseId: 'EXP-2026-0002',
    vehicleId: 'veh-1',
    vehicleRegistration: 'TRK-491-A',
    vehicleName: 'Volvo FH16 Globetrotter',
    tripId: 'trp-1',
    tripNumber: 'TRP-2026-0001',
    expenseType: 'fuel',
    amount: 186.00,
    gstAmount: 15.00,
    status: 'approved',
    paymentMethod: 'Fleet Card',
    vendor: 'Shell Highway 10 North',
    invoiceNumber: 'INV-F-99881',
    description: 'Refuel log at Shell highway station during trip.',
    date: '2026-07-02',
    approvedBy: 'Operations Lead Robert',
    createdBy: 'Marcus Miller',
    createdAt: '2026-07-02T10:15:00Z',
    updatedAt: '2026-07-02T10:15:00Z',
  },
  {
    id: 'exp-3',
    expenseId: 'EXP-2026-0003',
    vehicleId: 'veh-2',
    vehicleRegistration: 'VAN-102-X',
    tripId: 'trp-2',
    tripNumber: 'TRP-2026-0002',
    expenseType: 'toll',
    amount: 35.00,
    status: 'approved',
    paymentMethod: 'EZ-Pass Transponder',
    vendor: 'Texas Tollway Authority',
    invoiceNumber: 'TOL-992011',
    description: 'Electronic road toll fees.',
    date: '2026-07-05',
    approvedBy: 'System Auto-Approve',
    createdBy: 'David Richardson',
    createdAt: '2026-07-05T14:30:00Z',
    updatedAt: '2026-07-05T14:30:00Z',
  },
  {
    id: 'exp-4',
    expenseId: 'EXP-2026-0004',
    vehicleId: 'veh-1',
    vehicleRegistration: 'TRK-491-A',
    vehicleName: 'Volvo FH16 Globetrotter',
    expenseType: 'insurance',
    amount: 420.00,
    gstAmount: 0.00,
    status: 'pending',
    paymentMethod: 'Bank Transfer',
    vendor: 'Progressive Commercial Corp',
    invoiceNumber: 'INS-8812902',
    description: 'Monthly commercial fleet vehicle insurance premium.',
    date: '2026-07-10',
    createdBy: 'System Scheduler',
    createdAt: '2026-07-10T00:00:00Z',
    updatedAt: '2026-07-10T00:00:00Z',
  },
  {
    id: 'exp-5',
    expenseId: 'EXP-2026-0005',
    vehicleId: 'veh-1',
    vehicleRegistration: 'TRK-491-A',
    expenseType: 'parking',
    amount: 80.00,
    status: 'approved',
    paymentMethod: 'Corporate Visa Card',
    vendor: 'Houston Port Authority',
    invoiceNumber: 'PRK-88102',
    description: 'Overnight heavy vehicle port storage and security clearance fee.',
    date: '2026-07-09',
    approvedBy: 'Fleet Manager Sarah',
    createdBy: 'Marcus Miller',
    createdAt: '2026-07-09T20:30:00Z',
    updatedAt: '2026-07-09T20:30:00Z',
  },
];

// Share state at module scope
let activeExpenses = [...initialMockExpenses];

export function useExpenses() {
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [filters, setFilters] = useState<ExpenseFilters>({
    search: '',
    vehicleId: '',
    expenseType: '',
    status: '',
    page: 1,
    limit: 10,
  });
  const [summary, setSummary] = useState<ExpenseSummary>({
    monthlyExpenses: 0,
    todayExpenses: 0,
    topExpenseCategory: 'Fuel',
    averageDailyCost: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      let result = [...activeExpenses];

      // Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(
          (exp) =>
            exp.expenseId.toLowerCase().includes(query) ||
            exp.expenseType.toLowerCase().includes(query) ||
            exp.vendor.toLowerCase().includes(query) ||
            (exp.vehicleRegistration && exp.vehicleRegistration.toLowerCase().includes(query)) ||
            exp.description.toLowerCase().includes(query)
        );
      }

      // Filter by Vehicle
      if (filters.vehicleId) {
        result = result.filter((exp) => exp.vehicleId === filters.vehicleId);
      }

      // Filter by Type
      if (filters.expenseType) {
        result = result.filter((exp) => exp.expenseType === filters.expenseType);
      }

      // Filter by Status
      if (filters.status) {
        result = result.filter((exp) => exp.status === filters.status);
      }

      // Sort newest first
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      // Calculations for Summary
      const monthlyTotal = result
        .filter((e) => e.status === 'approved')
        .reduce((sum, item) => sum + item.amount, 0);

      const todayTotal = result
        .filter((e) => e.date === new Date().toISOString().split('T')[0] && e.status === 'approved')
        .reduce((sum, item) => sum + item.amount, 0);

      // Top Expense Category calculation
      const categoryCounts: Record<string, number> = {};
      result.forEach((item) => {
        if (item.status === 'approved') {
          categoryCounts[item.expenseType] = (categoryCounts[item.expenseType] || 0) + item.amount;
        }
      });
      let topCategory = 'Miscellaneous';
      let maxAmount = 0;
      Object.entries(categoryCounts).forEach(([cat, amt]) => {
        if (amt > maxAmount) {
          maxAmount = amt;
          topCategory = cat.charAt(0).toUpperCase() + cat.slice(1);
        }
      });

      const averageDaily = result.length > 0 ? parseFloat((monthlyTotal / 30).toFixed(2)) : 0;

      setSummary({
        monthlyExpenses: parseFloat(monthlyTotal.toFixed(2)),
        todayExpenses: parseFloat(todayTotal.toFixed(2)),
        topExpenseCategory: topCategory,
        averageDailyCost: averageDaily,
      });

      setExpenses(result);
      setIsLoading(false);
    }, 400);
  };

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  const addLocalExpense = (exp: ExpenseRecord) => {
    activeExpenses = [exp, ...activeExpenses];
    fetchExpenses();
  };

  const deleteLocalExpense = (id: string) => {
    activeExpenses = activeExpenses.filter((e) => e.id !== id);
    toast.success('Expense record deleted successfully');
    fetchExpenses();
  };

  return {
    expenses,
    filters,
    setFilters,
    summary,
    isLoading,
    error,
    addLocalExpense,
    deleteLocalExpense,
    refetch: fetchExpenses,
  };
}

export { activeExpenses };
export default useExpenses;
