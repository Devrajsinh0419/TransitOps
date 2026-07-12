'use client';

import { useState } from 'react';
import { CustomReport, CustomReportConfig } from '@/types/reports';
import { toast } from 'sonner';

export function useCustomReport() {
  const [report, setReport] = useState<CustomReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateReport = async (config: CustomReportConfig) => {
    setIsLoading(true);
    
    // Simulate API query call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate mock rows depending on module query
    let mockResults: Record<string, any>[] = [];
    if (config.module === 'fleet') {
      mockResults = [
        { vehicleRegistration: 'TRK-491-A', vehicleName: 'Volvo FH16', type: 'Heavy Truck', utilization: '88%', cost: '$1,200', odometer: '142,000 mi' },
        { vehicleRegistration: 'VAN-102-X', vehicleName: 'Ford Transit', type: 'Delivery Van', utilization: '92%', cost: '$420', odometer: '38,100 mi' },
        { vehicleRegistration: 'TRK-108-B', vehicleName: 'Scania R500', type: 'Heavy Truck', utilization: '76%', cost: '$1,750', odometer: '98,400 mi' },
      ];
    } else if (config.module === 'trips') {
      mockResults = [
        { tripNumber: 'TRP-001', route: 'Houston - Dallas', driver: 'Marcus Miller', revenue: '$1,200', status: 'Completed', date: '2026-07-08' },
        { tripNumber: 'TRP-002', route: 'Chicago - Detroit', driver: 'David Richardson', revenue: '$1,850', status: 'Completed', date: '2026-07-09' },
        { tripNumber: 'TRP-003', route: 'Austin - Houston', driver: 'Amanda Sterling', revenue: '$850', status: 'In Progress', date: '2026-07-12' },
      ];
    } else if (config.module === 'drivers') {
      mockResults = [
        { name: 'Marcus Miller', safetyScore: 98, licenseCategory: 'Class A CDL', status: 'Available', joiningDate: '2021-03-01' },
        { name: 'David Richardson', safetyScore: 94, licenseCategory: 'Class B CDL', status: 'On Trip', joiningDate: '2023-05-15' },
        { name: 'Amanda Sterling', safetyScore: 91, licenseCategory: 'Class A CDL', status: 'Off Duty', joiningDate: '2022-09-20' },
      ];
    } else if (config.module === 'maintenance') {
      mockResults = [
        { maintenanceId: 'MNT-001', vehicle: 'TRK-108-B', type: 'repairs', totalCost: '$1,250', status: 'completed', date: '2026-07-02' },
        { maintenanceId: 'MNT-002', vehicle: 'VAN-102-X', type: 'routine', totalCost: '$100', status: 'completed', date: '2026-07-04' },
      ];
    } else if (config.module === 'fuel') {
      mockResults = [
        { fuelLogId: 'FUL-001', vehicle: 'TRK-491-A', fuelType: 'Diesel', quantity: '120L', totalCost: '$186', date: '2026-07-02' },
        { fuelLogId: 'FUL-002', vehicle: 'VAN-102-X', fuelType: 'Gasoline', quantity: '50L', totalCost: '$74', date: '2026-07-04' },
      ];
    } else {
      mockResults = [
        { expenseId: 'EXP-001', type: 'Insurance', amount: '$2,900', vendor: 'Progressive', status: 'approved', date: '2026-07-01' },
        { expenseId: 'EXP-002', type: 'Toll fee', amount: '$12.50', vendor: 'EZ-Pass', status: 'approved', date: '2026-07-05' },
      ];
    }

    // Filter results according to requested columns
    const filteredResults = mockResults.map((row) => {
      const newRow: Record<string, any> = {};
      config.columns.forEach((col) => {
        if (col in row) {
          newRow[col] = row[col];
        }
      });
      return newRow;
    });

    setReport({
      id: `rep-${Date.now()}`,
      name: `Custom ${config.module.toUpperCase()} Report`,
      config,
      queryResults: filteredResults,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    setIsLoading(false);
    toast.success('Custom query compiled successfully!');
  };

  return {
    report,
    isLoading,
    generateReport,
  };
}

export default useCustomReport;
