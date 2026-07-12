'use client';

import React from 'react';
import { useSettings } from '@/hooks/useSettings';
import { Button } from '../ui/Button';
import { Truck, Plus, Trash2, Save, BadgeDollarSign, Ruler } from 'lucide-react';
import { toast } from 'sonner';

export function FleetConfiguration() {
  const { fleet, updateFleetSettings, isLoading } = useSettings();

  // Local state copy
  const [vehicleTypes, setVehicleTypes] = React.useState<string[]>([]);
  const [fuelTypes, setFuelTypes] = React.useState<string[]>([]);
  const [maintenanceCategories, setMaintenanceCategories] = React.useState<string[]>([]);
  const [expenseCategories, setExpenseCategories] = React.useState<string[]>([]);
  
  const [newVehicle, setNewVehicle] = React.useState('');
  const [newFuel, setNewFuel] = React.useState('');
  const [newMaint, setNewMaint] = React.useState('');
  const [newExp, setNewExp] = React.useState('');

  const [distUnit, setDistUnit] = React.useState<'mi' | 'km'>('km');
  const [fuelUnit, setFuelUnit] = React.useState<'gal' | 'l' | 'L'>('L');
  const [currency, setCurrency] = React.useState<'USD' | 'EUR' | 'GBP' | 'INR'>('INR');
  const [timezone, setTimezone] = React.useState('Asia/Kolkata');

  // Sync settings values
  React.useEffect(() => {
    if (fleet) {
      setVehicleTypes(fleet.vehicleTypes || []);
      setFuelTypes(fleet.fuelTypes || []);
      setMaintenanceCategories(fleet.maintenanceCategories || []);
      setExpenseCategories(fleet.expenseCategories || []);
      setDistUnit(fleet.defaultDistanceUnit || 'km');
      setFuelUnit(fleet.defaultFuelUnit || 'L');
      setCurrency(fleet.defaultCurrency || 'INR');
      setTimezone(fleet.defaultTimezone || 'Asia/Kolkata');
    }
  }, [fleet]);

  const handleAdd = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, val: string, setVal: React.Dispatch<React.SetStateAction<string>>, fieldLabel: string) => {
    if (!val.trim()) {
      toast.error(`Please specify a valid value for ${fieldLabel}`);
      return;
    }
    if (list.includes(val.trim())) {
      toast.error(`${val} already exists in ${fieldLabel}`);
      return;
    }
    setList([...list, val.trim()]);
    setVal('');
    toast.success(`Added ${val} classification`);
  };

  const handleRemove = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, idx: number) => {
    const updated = [...list];
    updated.splice(idx, 1);
    setList(updated);
    toast.info('Classification item removed');
  };

  const handleSave = async () => {
    const success = await updateFleetSettings({
      vehicleTypes,
      fuelTypes,
      maintenanceCategories,
      expenseCategories,
      defaultDistanceUnit: distUnit,
      defaultFuelUnit: fuelUnit,
      defaultCurrency: currency,
      defaultTimezone: timezone,
    });
    if (success) {
      toast.success('System configuration details updated successfully!');
    }
  };

  return (
    <div className="space-y-6 select-none text-left w-full">
      
      {/* Units & Localization */}
      <div className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30 flex items-center gap-1.5">
          <Ruler className="h-4 w-4 text-primary" />
          Localization & Standard Units
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
          {/* Distance Unit */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase">Distance Unit</label>
            <select
              value={distUnit}
              onChange={(e) => setDistUnit(e.target.value as any)}
              className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 focus:outline-none"
            >
              <option value="mi">Miles (mi)</option>
              <option value="km">Kilometers (km)</option>
            </select>
          </div>

          {/* Fuel Unit */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase">Fuel Volume Unit</label>
            <select
              value={fuelUnit}
              onChange={(e) => setFuelUnit(e.target.value as any)}
              className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 focus:outline-none"
            >
              <option value="L">Liters (L)</option>
              <option value="gal">Gallons (gal)</option>
            </select>
          </div>

          {/* Currency */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase">Reporting Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 focus:outline-none"
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
            </select>
          </div>

          {/* Timezone */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase">System Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 px-3 focus:outline-none"
            >
              <option value="Asia/Kolkata">India Standard Time (IST)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Roster classifications mapping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Vehicle Types */}
        <div className="p-5 border border-border/50 bg-card rounded-2xl space-y-3">
          <span className="text-[10px] font-black text-foreground uppercase tracking-wider block">Vehicle Classifications</span>
          <div className="flex gap-2">
            <input
              type="text"
              value={newVehicle}
              onChange={(e) => setNewVehicle(e.target.value)}
              className="h-9 flex-1 rounded-lg border border-border/60 bg-muted/10 px-3 text-xs font-semibold focus:outline-none"
              placeholder="e.g. Heavy Duty Cab"
            />
            <Button
              onClick={() => handleAdd(vehicleTypes, setVehicleTypes, newVehicle, setNewVehicle, 'Vehicle Types')}
              className="h-9 px-3 rounded-lg bg-primary hover:bg-primary/95 text-primary-foreground flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto pt-1">
            {vehicleTypes.map((t, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-2 bg-muted/20 border border-border/30 rounded-lg">
                <span className="font-semibold text-foreground">{t}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(vehicleTypes, setVehicleTypes, idx)}
                  className="text-muted-foreground hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Fuel Types */}
        <div className="p-5 border border-border/50 bg-card rounded-2xl space-y-3">
          <span className="text-[10px] font-black text-foreground uppercase tracking-wider block">Fuel Classification Types</span>
          <div className="flex gap-2">
            <input
              type="text"
              value={newFuel}
              onChange={(e) => setNewFuel(e.target.value)}
              className="h-9 flex-1 rounded-lg border border-border/60 bg-muted/10 px-3 text-xs font-semibold focus:outline-none"
              placeholder="e.g. Bio-Diesel"
            />
            <Button
              onClick={() => handleAdd(fuelTypes, setFuelTypes, newFuel, setNewFuel, 'Fuel Types')}
              className="h-9 px-3 rounded-lg bg-primary hover:bg-primary/95 text-primary-foreground flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto pt-1">
            {fuelTypes.map((t, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-2 bg-muted/20 border border-border/30 rounded-lg">
                <span className="font-semibold text-foreground">{t}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(fuelTypes, setFuelTypes, idx)}
                  className="text-muted-foreground hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Categories */}
        <div className="p-5 border border-border/50 bg-card rounded-2xl space-y-3">
          <span className="text-[10px] font-black text-foreground uppercase tracking-wider block">Maintenance Categories</span>
          <div className="flex gap-2">
            <input
              type="text"
              value={newMaint}
              onChange={(e) => setNewMaint(e.target.value)}
              className="h-9 flex-1 rounded-lg border border-border/60 bg-muted/10 px-3 text-xs font-semibold focus:outline-none"
              placeholder="e.g. Engine Diagnostic"
            />
            <Button
              onClick={() => handleAdd(maintenanceCategories, setMaintenanceCategories, newMaint, setNewMaint, 'Maintenance Categories')}
              className="h-9 px-3 rounded-lg bg-primary hover:bg-primary/95 text-primary-foreground flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto pt-1">
            {maintenanceCategories.map((t, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-2 bg-muted/20 border border-border/30 rounded-lg">
                <span className="font-semibold text-foreground">{t}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(maintenanceCategories, setMaintenanceCategories, idx)}
                  className="text-muted-foreground hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Categories */}
        <div className="p-5 border border-border/50 bg-card rounded-2xl space-y-3">
          <span className="text-[10px] font-black text-foreground uppercase tracking-wider block">Expense Ledger Categories</span>
          <div className="flex gap-2">
            <input
              type="text"
              value={newExp}
              onChange={(e) => setNewExp(e.target.value)}
              className="h-9 flex-1 rounded-lg border border-border/60 bg-muted/10 px-3 text-xs font-semibold focus:outline-none"
              placeholder="e.g. Driver Per-Diem"
            />
            <Button
              onClick={() => handleAdd(expenseCategories, setExpenseCategories, newExp, setNewExp, 'Expense Categories')}
              className="h-9 px-3 rounded-lg bg-primary hover:bg-primary/95 text-primary-foreground flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto pt-1">
            {expenseCategories.map((t, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-2 bg-muted/20 border border-border/30 rounded-lg">
                <span className="font-semibold text-foreground">{t}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(expenseCategories, setExpenseCategories, idx)}
                  className="text-muted-foreground hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t border-border/20">
        <Button
          onClick={handleSave}
          isLoading={isLoading}
          className="h-10 text-xs font-extrabold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg px-6 gap-2 shadow-sm"
          leftIcon={<Save className="h-4 w-4" />}
        >
          Save Classifications
        </Button>
      </div>

    </div>
  );
}

export default FleetConfiguration;
