'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useExpense } from '@/hooks/useExpense';
import { ExpenseStatusBadge } from '@/components/expenses';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Landmark, Calendar, Tag, DollarSign, User, ShieldAlert, FileText, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { formatCurrency } from '@/lib/helpers';
import { expenseService } from '@/services/expense.service';

export default function ExpenseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { expense, isLoading, error } = useExpense(id);
  const [currentStatus, setCurrentStatus] = React.useState<string | null>(null);
  const [approvedBy, setApprovedBy] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (expense) {
      setCurrentStatus(expense.status);
      setApprovedBy(expense.approvedBy || null);
    }
  }, [expense]);

  if (isLoading) {
    return (
      <div className="h-60 flex items-center justify-center text-xs font-semibold text-muted-foreground animate-pulse">
        Fetching expense audit records...
      </div>
    );
  }

  if (error || !expense) {
    return (
      <div className="p-8 border border-dashed border-border/50 rounded-2xl text-center space-y-4 max-w-md mx-auto mt-12">
        <ShieldAlert className="h-8 w-8 text-rose-500 mx-auto" />
        <h3 className="text-sm font-bold text-foreground">{error || 'Record not found'}</h3>
        <Button variant="outline" size="sm" onClick={() => router.push('/expenses')} className="h-9 rounded-lg">
          Back to Expenses
        </Button>
      </div>
    );
  }

  const handleApprove = async () => {
    try {
      await expenseService.updateExpense(id, { status: 'Approved' });
      setCurrentStatus('approved');
      setApprovedBy('Auditor Sarah');
      toast.success(`Expense ${expense.expenseId} has been APPROVED and cleared for reimbursement.`);
    } catch (err: any) {
      toast.error('Failed to approve reimbursement');
    }
  };

  const handleReject = async () => {
    try {
      await expenseService.updateExpense(id, { status: 'Rejected' });
      setCurrentStatus('rejected');
      setApprovedBy(null);
      toast.error(`Expense ${expense.expenseId} has been REJECTED.`);
    } catch (err: any) {
      toast.error('Failed to reject cost');
    }
  };

  return (
    <div className="space-y-6 select-none text-left max-w-4xl mx-auto">
      {/* Header section */}
      <div className="flex justify-between items-center pb-4 border-b border-border/40">
        <div className="flex items-center gap-2">
          <Link href="/expenses" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-lg font-black text-foreground uppercase tracking-tight flex items-center gap-1.5">
            <Landmark className="h-5 w-5 text-primary" />
            {expense.expenseId}
          </h1>
          <ExpenseStatusBadge status={(currentStatus || expense.status) as any} />
        </div>
        <div className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold">
          <Calendar className="h-3.5 w-3.5" /> Filed: {expense.date}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Transaction Details Column */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Cost details */}
          <div className="p-6 border border-border/50 bg-card rounded-2xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30">
              Audit Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Expense Category</span>
                <span className="font-extrabold text-foreground uppercase block mt-0.5">{expense.expenseType}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">GST component</span>
                <span className="font-semibold text-muted-foreground mt-0.5 block">{formatCurrency(expense.gstAmount || 0)}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Payment Method</span>
                <span className="font-bold text-foreground mt-0.5 block">{expense.paymentMethod}</span>
              </div>
              <div className="bg-muted/30 p-2.5 rounded-xl border border-border/50 text-right">
                <span className="text-[9px] font-black text-muted-foreground uppercase block">TOTAL BILLED</span>
                <span className="font-black text-foreground text-sm">{formatCurrency(expense.amount)}</span>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="p-6 border border-border/50 bg-card rounded-2xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30">
              Allocated Asset References
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Vehicle Mapping</span>
                {expense.vehicleRegistration ? (
                  <>
                    <span className="font-extrabold text-foreground block">{expense.vehicleRegistration}</span>
                    <span className="text-[10px] text-muted-foreground">{expense.vehicleName}</span>
                  </>
                ) : (
                  <span className="italic text-muted-foreground/60">Not mapped to vehicle</span>
                )}
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Trip Manifest Reference</span>
                {expense.tripNumber ? (
                  <span className="font-extrabold text-foreground block">{expense.tripNumber}</span>
                ) : (
                  <span className="italic text-muted-foreground/60">Not mapped to trip</span>
                )}
              </div>
            </div>
          </div>

          {/* Audit reasons */}
          <div className="p-6 border border-border/50 bg-card rounded-2xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30">
              Audit Context
            </h3>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Vendor / Payee</span>
                  <span className="font-bold text-foreground">{expense.vendor}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Invoice Reference</span>
                  <span className="font-extrabold text-foreground">{expense.invoiceNumber}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Reason Description</span>
                <p className="p-3 bg-muted/10 rounded-lg border border-border/30 font-medium text-foreground leading-relaxed">
                  {expense.description}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Audit Status Actions */}
        <div className="space-y-6">
          <div className="p-6 border border-border/50 bg-card rounded-2xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30">
              Auditor Decision hold
            </h3>
            
            {currentStatus === 'pending' ? (
              <div className="space-y-2">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  This transaction is awaiting auditor validation before reimbursement. Verify invoices are attached correctly.
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={handleApprove}
                    className="h-9 text-xs font-extrabold rounded-lg w-full gap-1.5"
                    leftIcon={<CheckCircle className="h-4 w-4" />}
                  >
                    Clear Reimbursement
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleReject}
                    className="h-9 text-xs font-bold rounded-lg w-full gap-1.5"
                    leftIcon={<XCircle className="h-4 w-4" />}
                  >
                    Reject Cost
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-foreground font-semibold">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Validated by: <span className="font-extrabold">{approvedBy || 'System Auditor'}</span></span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Audit has closed for this entry. No modifications allowed.
                </p>
              </div>
            )}
          </div>

          <div className="p-6 border border-border/50 bg-card rounded-2xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-primary" />
              Invoice Attachment
            </h3>
            
            <div className="border border-border/40 rounded-xl p-3 bg-muted/10 text-center space-y-3">
              <div className="h-32 border border-dashed border-border/60 bg-card rounded-lg flex items-center justify-center">
                <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
                  <FileText className="h-4 w-4 text-muted-foreground/60" /> expense_invoice.pdf
                </span>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-[10px] w-full rounded-lg font-bold">
                View PDF Invoice
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
