import React from 'react';
import { Card } from '../cards/Card';
import { TrendingUp, CreditCard, Fuel, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/lib/helpers';

interface TripFinancialCardProps {
  expectedRevenue: number;
  estimatedFuelCost: number;
  estimatedToll: number;
  estimatedExpenses: number;
  actualRevenue?: number;
  actualExpenses?: number;
}

export function TripFinancialCard({
  expectedRevenue,
  estimatedFuelCost,
  estimatedToll,
  estimatedExpenses,
  actualRevenue,
  actualExpenses,
}: TripFinancialCardProps) {
  const estTotalCosts = estimatedFuelCost + estimatedToll + estimatedExpenses;
  const estNetProfit = expectedRevenue - estTotalCosts;
  
  const actTotalCosts = actualExpenses !== undefined ? actualExpenses : estTotalCosts;
  const actRevenue = actualRevenue !== undefined ? actualRevenue : expectedRevenue;
  const actNetProfit = actRevenue - actTotalCosts;

  return (
    <Card className="p-4 border border-border/50 bg-card select-none text-left space-y-3 shadow-inner hover:shadow-sm transition-all">
      <div className="flex items-center gap-2 border-b border-border/40 pb-2">
        <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
          <TrendingUp className="h-4.5 w-4.5" />
        </div>
        <div>
          <h4 className="text-xs font-extrabold text-foreground">Financial Projections</h4>
          <p className="text-[10px] text-muted-foreground">Estimated margin analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-[10px]">
        {/* Expected/Actual Revenue */}
        <div className="space-y-0.5">
          <span className="text-muted-foreground uppercase font-semibold">Gross Revenue</span>
          <p className="text-xs font-bold text-foreground">
            {formatCurrency(actualRevenue !== undefined ? actualRevenue : expectedRevenue)}
          </p>
        </div>

        {/* Expected/Actual Profit */}
        <div className="space-y-0.5">
          <span className="text-muted-foreground uppercase font-semibold">Net Profit Margin</span>
          <p className={`text-xs font-bold ${actNetProfit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
            {formatCurrency(actNetProfit)}
          </p>
        </div>
      </div>

      <div className="pt-2.5 border-t border-border/30 grid grid-cols-3 gap-2 text-[9px] text-muted-foreground">
        <div>
          <span className="font-semibold block uppercase">Est Fuel</span>
          <span className="font-extrabold text-foreground">{formatCurrency(estimatedFuelCost)}</span>
        </div>
        <div>
          <span className="font-semibold block uppercase">Est Toll</span>
          <span className="font-extrabold text-foreground">{formatCurrency(estimatedToll)}</span>
        </div>
        <div>
          <span className="font-semibold block uppercase">Est Other</span>
          <span className="font-extrabold text-foreground">{formatCurrency(estimatedExpenses)}</span>
        </div>
      </div>
    </Card>
  );
}

export default TripFinancialCard;

