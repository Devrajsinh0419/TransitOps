'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tripSchema, TripSchemaInput } from '@/validation/trip.schema';
import { TripStepper } from './TripStepper';
import { Button } from '../ui/Button';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import { TripSummaryCard } from './TripSummaryCard';
import { AlertCircle, ArrowLeft, ArrowRight, ShieldAlert, CheckCircle, Scale, Calendar, ShieldCheck } from 'lucide-react';
import { vehicleService } from '@/services/vehicle.service';
import { driverService } from '@/services/driver.service';

interface TripFormProps {
  initialValues?: Partial<TripSchemaInput>;
  onSubmit: (data: TripSchemaInput) => void;
  isLoading?: boolean;
}

// Simulated active pool data for vehicles and drivers as fallbacks
const DEFAULT_FLEET_VEHICLES = [
  { id: 'veh-1', name: 'Volvo FH16 Globetrotter', registration: 'TRK-491-A', capacity: 45000, odometer: 148900, status: 'available' },
  { id: 'veh-2', name: 'Ford Transit Cargo Van', registration: 'VAN-102-X', capacity: 3500, odometer: 42100, status: 'on_trip' },
  { id: 'veh-3', name: 'Peterbilt 579 Semi-Truck', registration: 'TRK-982-Z', capacity: 50000, odometer: 89000, status: 'available' },
  { id: 'veh-4', name: 'Freightliner Cascadia', registration: 'TRK-111-B', capacity: 48000, odometer: 110200, status: 'maintenance' },
];

const DEFAULT_ROSTER_DRIVERS = [
  { id: 'drv-1', name: 'Marcus Miller', phone: '+15550192831', licenseExpiry: '2027-02-10', safetyScore: 98, status: 'available', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { id: 'drv-2', name: 'David Richardson', phone: '+15550228391', licenseExpiry: '2026-09-12', safetyScore: 94, status: 'on_trip', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { id: 'drv-3', name: 'Amanda Sterling', phone: '+15550482910', licenseExpiry: '2026-07-30', safetyScore: 91, status: 'available', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
  { id: 'drv-4', name: 'Robert Vance', phone: '+15550992831', licenseExpiry: '2026-06-10', safetyScore: 84, status: 'suspended', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
];

// Mappers to convert backend models to TripForm compatible options
const mapBackendVehicle = (v: any) => {
  let status = 'available';
  const backendStatus = v.status?.toLowerCase();
  if (backendStatus === 'available') {
    status = 'available';
  } else if (backendStatus === 'on trip' || backendStatus === 'on_trip') {
    status = 'on_trip';
  } else if (backendStatus === 'in shop' || backendStatus === 'maintenance' || backendStatus === 'in_shop' || backendStatus === 'in-shop') {
    status = 'maintenance';
  }

  return {
    id: String(v.id),
    name: v.vehicle_name || `${v.make} ${v.model}`,
    registration: v.registration_number,
    capacity: parseFloat(v.max_load_capacity) || 0,
    odometer: parseInt(v.odometer) || 0,
    status: status
  };
};

const mapBackendDriver = (d: any) => {
  let status = 'available';
  const backendStatus = d.status?.toLowerCase();
  if (backendStatus === 'available') {
    status = 'available';
  } else if (backendStatus === 'on trip' || backendStatus === 'on_trip') {
    status = 'on_trip';
  } else if (backendStatus === 'suspended') {
    status = 'suspended';
  }

  return {
    id: String(d.id),
    name: d.name,
    phone: d.contact_number || '',
    licenseExpiry: d.license_expiry || '',
    safetyScore: parseFloat(d.safety_score) || 0,
    status: status,
    avatarUrl: d.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&background=random`
  };
};

export function TripForm({ initialValues, onSubmit, isLoading = false }: TripFormProps) {
  const [step, setStep] = React.useState(0);
  const [fleetVehicles, setFleetVehicles] = React.useState<any[]>(DEFAULT_FLEET_VEHICLES);
  const [rosterDrivers, setRosterDrivers] = React.useState<any[]>(DEFAULT_ROSTER_DRIVERS);

  React.useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        const [vehiclesRes, driversRes] = await Promise.all([
          vehicleService.getVehicles(),
          driverService.getDrivers(),
        ]);
        
        if (!active) return;
        
        const rawVehicles = Array.isArray(vehiclesRes) ? vehiclesRes : (vehiclesRes as any).results || [];
        const rawDrivers = Array.isArray(driversRes) ? driversRes : (driversRes as any).results || [];
        
        const backendVehicles = rawVehicles.map(mapBackendVehicle);
        const backendDrivers = rawDrivers.map(mapBackendDriver);
        
        // Merge backend data with default mock data, ensuring no duplicates by registration/name
        const mergedVehicles = [
          ...backendVehicles,
          ...DEFAULT_FLEET_VEHICLES.filter(
            (mv) => !backendVehicles.some((bv: any) => bv.registration.toLowerCase() === mv.registration.toLowerCase())
          ),
        ];
        
        const mergedDrivers = [
          ...backendDrivers,
          ...DEFAULT_ROSTER_DRIVERS.filter(
            (md) => !backendDrivers.some((bd: any) => bd.name.toLowerCase() === md.name.toLowerCase())
          ),
        ];
        
        setFleetVehicles(mergedVehicles);
        setRosterDrivers(mergedDrivers);
      } catch (error) {
        console.error('Failed to load vehicles or drivers', error);
      }
    };
    loadData();
    return () => { active = false; };
  }, []);

  const steps = [
    'Trip Info',
    'Route Info',
    'Vehicle',
    'Driver',
    'Cargo Spec',
    'Financials',
    'Final Review',
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<TripSchemaInput>({
    resolver: zodResolver(tripSchema) as any,
    defaultValues: {
      tripType: 'one_way',
      priority: 'medium',
      expectedRevenue: 0,
      estimatedFuelCost: 0,
      estimatedToll: 0,
      estimatedExpenses: 0,
      ...initialValues,
    },
    mode: 'all',
  });

  const selectedVehicleId = watch('vehicleId');
  const selectedDriverId = watch('driverId');
  const cargoWeight = watch('cargoWeight') || 0;

  const currentVehicle = fleetVehicles.find((v) => v.id === selectedVehicleId);
  const currentDriver = rosterDrivers.find((d) => d.id === selectedDriverId);

  // Sync capacity and odometer when vehicle is selected
  React.useEffect(() => {
    if (currentVehicle) {
      setValue('vehicleCapacity', currentVehicle.capacity);
      setValue('vehicleOdometer', currentVehicle.odometer);
    }
  }, [selectedVehicleId, currentVehicle, setValue]);

  // Sync license expiry date when driver is selected
  React.useEffect(() => {
    if (currentDriver) {
      setValue('driverLicenseExpiry', currentDriver.licenseExpiry);
    }
  }, [selectedDriverId, currentDriver, setValue]);

  const handleNext = async () => {
    // Validate current step fields before proceeding
    let fieldsToValidate: any[] = [];
    if (step === 0) {
      fieldsToValidate = ['tripName', 'tripType', 'priority'];
    } else if (step === 1) {
      fieldsToValidate = ['source', 'destination', 'plannedDistance', 'estimatedTime'];
    } else if (step === 2) {
      fieldsToValidate = ['vehicleId'];
    } else if (step === 3) {
      fieldsToValidate = ['driverId'];
    } else if (step === 4) {
      fieldsToValidate = ['cargoType', 'cargoWeight', 'cargoValue'];
    } else if (step === 5) {
      fieldsToValidate = ['expectedRevenue', 'estimatedFuelCost', 'estimatedToll', 'estimatedExpenses'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      // Check additional custom business rules
      if (step === 2 && currentVehicle && currentVehicle.status !== 'available') {
        return; // Prevent progression if vehicle is not available
      }
      if (step === 3 && currentDriver) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const expiryDate = new Date(currentDriver.licenseExpiry);
        if (currentDriver.status !== 'available' || expiryDate < today) {
          return; // Prevent progression if driver unavailable or expired license
        }
      }
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const onSubmitForm = (data: TripSchemaInput) => {
    onSubmit(data);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto select-none text-left">
      <TripStepper steps={steps} currentStep={step} />

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <div className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-4">
          {/* STEP 1: Trip Info */}
          {step === 0 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-extrabold text-foreground border-b border-border/40 pb-2 uppercase tracking-wide">
                Step 1: Trip General Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Trip Name</label>
                  <Input
                    className="h-9 text-xs rounded-lg border-border/60"
                    placeholder="e.g. Houston-Austin Delivery Link"
                    {...register('tripName')}
                    error={!!errors.tripName}
                  />
                  {errors.tripName?.message && (
                    <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.tripName.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Trip Manifest ID</label>
                  <Input
                    className="h-9 text-xs rounded-lg border-border/60 bg-muted/30 text-muted-foreground"
                    placeholder="TRP-2026-XXXX (Auto-assigned)"
                    disabled
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Trip Type</label>
                  <Select
                    className="h-9 text-xs border-border/60 rounded-lg"
                    value={watch('tripType') || 'one_way'}
                    onChange={(e) => setValue('tripType', e.target.value as any)}
                    options={[
                      { value: 'one_way', label: 'One Way Delivery' },
                      { value: 'round_trip', label: 'Round Trip Restocking' },
                      { value: 'multi_stop', label: 'Multi-Stop Dispatch' },
                    ]}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Priority</label>
                  <Select
                    className="h-9 text-xs border-border/60 rounded-lg"
                    value={watch('priority') || 'medium'}
                    onChange={(e) => setValue('priority', e.target.value as any)}
                    options={[
                      { value: 'low', label: 'Low priority' },
                      { value: 'medium', label: 'Standard priority' },
                      { value: 'high', label: 'High priority' },
                      { value: 'critical', label: 'Critical priority' },
                    ]}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Description Remarks</label>
                <textarea
                  rows={3}
                  className="w-full text-xs p-3 rounded-lg border border-border/60 bg-background focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                  placeholder="Detail shipping remarks, specific route warnings, etc..."
                  {...register('description')}
                />
              </div>
            </div>
          )}

          {/* STEP 2: Route Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-extrabold text-foreground border-b border-border/40 pb-2 uppercase tracking-wide">
                Step 2: Route & Mapping Coordinates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Source Location</label>
                  <Input
                    className="h-9 text-xs rounded-lg border-border/60"
                    placeholder="e.g. Houston Port Terminal A, TX"
                    {...register('source')}
                    error={!!errors.source}
                  />
                  {errors.source?.message && (
                    <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.source.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Destination Location</label>
                  <Input
                    className="h-9 text-xs rounded-lg border-border/60"
                    placeholder="e.g. Dallas Distribution Depot, TX"
                    {...register('destination')}
                    error={!!errors.destination}
                  />
                  {errors.destination?.message && (
                    <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.destination.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Planned Distance (mi)</label>
                  <Input
                    type="number"
                    className="h-9 text-xs rounded-lg border-border/60"
                    placeholder="e.g. 240"
                    {...register('plannedDistance')}
                    error={!!errors.plannedDistance}
                  />
                  {errors.plannedDistance?.message && (
                    <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.plannedDistance.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Estimated Duration</label>
                  <Input
                    className="h-9 text-xs rounded-lg border-border/60"
                    placeholder="e.g. 4.5 Hours"
                    {...register('estimatedTime')}
                    error={!!errors.estimatedTime}
                  />
                  {errors.estimatedTime?.message && (
                    <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.estimatedTime.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Vehicle Assignment */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-extrabold text-foreground border-b border-border/40 pb-2 uppercase tracking-wide">
                Step 3: Vehicle Allocation
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Select Vehicle</label>
                    <Select
                      className="h-9 text-xs border-border/60 rounded-lg"
                      value={selectedVehicleId || ''}
                      onChange={(e) => setValue('vehicleId', e.target.value)}
                      options={[
                        { value: '', label: 'Select assigned vehicle...' },
                        ...fleetVehicles.map((v) => ({
                          value: v.id,
                          label: `${v.registration} - ${v.name} (${v.status.toUpperCase()})`,
                        })),
                      ]}
                    />
                    {errors.vehicleId && (
                      <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.vehicleId.message}</p>
                    )}
                  </div>

                  {currentVehicle && currentVehicle.status !== 'available' && (
                    <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl flex items-start gap-2 text-rose-600 font-semibold">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <p className="text-[10px] leading-normal">
                        Compliance Hold: Selected vehicle status is "{currentVehicle.status}". Allocation only allowed for Available vehicles.
                      </p>
                    </div>
                  )}
                </div>

                {/* Preview Card */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Vehicle Preview Card</label>
                  <div className="p-4 border border-border/50 bg-muted/20 rounded-xl space-y-3">
                    {currentVehicle ? (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold text-foreground">
                          <span>{currentVehicle.registration}</span>
                          <span className={currentVehicle.status === 'available' ? 'text-emerald-500' : 'text-rose-500'}>
                            {currentVehicle.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-[10px] text-muted-foreground">{currentVehicle.name}</div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-border/20">
                          <div>
                            <span className="block font-semibold text-muted-foreground">MAX LOAD</span>
                            <span className="font-bold text-foreground">{currentVehicle.capacity.toLocaleString('en-IN')} kg</span>
                          </div>
                          <div>
                            <span className="block font-semibold text-muted-foreground">ODOMETER</span>
                            <span className="font-bold text-foreground">{currentVehicle.odometer.toLocaleString('en-IN')} km</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-[10px] text-muted-foreground">No vehicle preview available.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Driver Assignment */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-extrabold text-foreground border-b border-border/40 pb-2 uppercase tracking-wide">
                Step 4: Driver Assignment
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Select Driver</label>
                    <Select
                      className="h-9 text-xs border-border/60 rounded-lg"
                      value={selectedDriverId || ''}
                      onChange={(e) => setValue('driverId', e.target.value)}
                      options={[
                        { value: '', label: 'Select assigned driver...' },
                        ...rosterDrivers.map((d) => {
                          const today = new Date();
                          const isExpired = new Date(d.licenseExpiry) < today;
                          const labelSuffix = isExpired ? 'EXPIRED CDL' : d.status.toUpperCase();
                          return {
                            value: d.id,
                            label: `${d.name} (${labelSuffix})`,
                          };
                        }),
                      ]}
                    />
                    {errors.driverId && (
                      <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.driverId.message}</p>
                    )}
                  </div>

                  {currentDriver && (currentDriver.status !== 'available' || new Date(currentDriver.licenseExpiry) < new Date()) && (
                    <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl flex items-start gap-2 text-rose-600 font-semibold">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <p className="text-[10px] leading-normal">
                        Compliance Hold: Selected driver cannot be assigned. Driver must be Available and CDL license must not be expired.
                      </p>
                    </div>
                  )}
                </div>

                {/* Preview Card */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Driver Preview Card</label>
                  <div className="p-4 border border-border/50 bg-muted/20 rounded-xl">
                    {currentDriver ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={currentDriver.avatarUrl}
                            alt={currentDriver.name}
                            className="h-10 w-10 rounded-full object-cover border border-border"
                          />
                          <div>
                            <div className="text-xs font-bold text-foreground">{currentDriver.name}</div>
                            <div className="text-[10px] text-muted-foreground">{currentDriver.phone}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-border/20">
                          <div>
                            <span className="block font-semibold text-muted-foreground">CDL EXPIRY</span>
                            <span className="font-bold text-foreground">{currentDriver.licenseExpiry}</span>
                          </div>
                          <div>
                            <span className="block font-semibold text-muted-foreground">SAFETY SCORE</span>
                            <span className="font-bold text-foreground">{currentDriver.safetyScore} pts</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-[10px] text-muted-foreground">No driver preview available.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Cargo Spec */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-extrabold text-foreground border-b border-border/40 pb-2 uppercase tracking-wide">
                Step 5: Cargo Manifest Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Cargo Type</label>
                  <Input
                    className="h-9 text-xs rounded-lg border-border/60"
                    placeholder="e.g. Industrial Gears"
                    {...register('cargoType')}
                    error={!!errors.cargoType}
                  />
                  {errors.cargoType?.message && (
                    <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.cargoType.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Cargo Weight (kg)</label>
                  <Input
                    type="number"
                    className="h-9 text-xs rounded-lg border-border/60"
                    placeholder="e.g. 18000"
                    {...register('cargoWeight')}
                    error={!!errors.cargoWeight}
                  />
                  {errors.cargoWeight?.message && (
                    <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.cargoWeight.message}</p>
                  )}
                  {currentVehicle && cargoWeight > currentVehicle.capacity && (
                    <p className="text-[9px] text-rose-500 font-semibold mt-1">
                      Exceeds vehicle capacity ({currentVehicle.capacity.toLocaleString('en-IN')} kg)
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Declared Cargo Value (₹)</label>
                  <Input
                    type="number"
                    className="h-9 text-xs rounded-lg border-border/60"
                    placeholder="e.g. 75000"
                    {...register('cargoValue')}
                    error={!!errors.cargoValue}
                  />
                  {errors.cargoValue?.message && (
                    <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.cargoValue.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Special Instructions</label>
                <textarea
                  rows={3}
                  className="w-full text-xs p-3 rounded-lg border border-border/60 bg-background focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                  placeholder="e.g. Handle with care, secure straps every 100 km, etc..."
                  {...register('specialInstructions')}
                />
              </div>
            </div>
          )}

          {/* STEP 6: Financials */}
          {step === 5 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-extrabold text-foreground border-b border-border/40 pb-2 uppercase tracking-wide">
                Step 6: Financial Auditing & Expenses
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expected Revenue (₹)</label>
                  <Input
                    type="number"
                    className="h-9 text-xs rounded-lg border-border/60"
                    placeholder="e.g. 2400"
                    {...register('expectedRevenue')}
                    error={!!errors.expectedRevenue}
                  />
                  {errors.expectedRevenue?.message && (
                    <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.expectedRevenue.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Estimated Fuel Cost (₹)</label>
                  <Input
                    type="number"
                    className="h-9 text-xs rounded-lg border-border/60"
                    placeholder="e.g. 350"
                    {...register('estimatedFuelCost')}
                    error={!!errors.estimatedFuelCost}
                  />
                  {errors.estimatedFuelCost?.message && (
                    <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.estimatedFuelCost.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Estimated Toll Fees (₹)</label>
                  <Input
                    type="number"
                    className="h-9 text-xs rounded-lg border-border/60"
                    placeholder="e.g. 35"
                    {...register('estimatedToll')}
                    error={!!errors.estimatedToll}
                  />
                  {errors.estimatedToll?.message && (
                    <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.estimatedToll.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Est. Other Expenses (₹)</label>
                  <Input
                    type="number"
                    className="h-9 text-xs rounded-lg border-border/60"
                    placeholder="e.g. 50"
                    {...register('estimatedExpenses')}
                    error={!!errors.estimatedExpenses}
                  />
                  {errors.estimatedExpenses?.message && (
                    <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.estimatedExpenses.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Review & Validation Banners */}
          {step === 6 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-extrabold text-foreground border-b border-border/40 pb-2 uppercase tracking-wide">
                Step 7: Final Review & Policy Verification
              </h3>

              {/* Validation Banners */}
              <div className="space-y-2">
                {currentVehicle && cargoWeight > currentVehicle.capacity && (
                  <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl flex items-start gap-2.5 text-rose-600 font-semibold">
                    <ShieldAlert className="h-4.5 w-4.5 flex-shrink-0 mt-0.5 text-rose-500" />
                    <div className="text-[10px] leading-relaxed">
                      <span className="font-extrabold">OVERWEIGHT BLOCK:</span> Selected cargo weight ({cargoWeight.toLocaleString('en-IN')} kg) exceeds max vehicle capacity ({currentVehicle.capacity.toLocaleString('en-IN')} kg). Please adjust cargo weight or choose a vehicle with greater capacity.
                    </div>
                  </div>
                )}

                {currentVehicle && currentVehicle.status !== 'available' && (
                  <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl flex items-start gap-2.5 text-rose-600 font-semibold">
                    <ShieldAlert className="h-4.5 w-4.5 flex-shrink-0 mt-0.5 text-rose-500" />
                    <div className="text-[10px] leading-relaxed">
                      <span className="font-extrabold">VEHICLE COMPLIANCE BLOCK:</span> Vehicle {currentVehicle.registration} is currently "{currentVehicle.status}". Vehicle must be Available before dispatch.
                    </div>
                  </div>
                )}

                {currentDriver && currentDriver.status !== 'available' && (
                  <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl flex items-start gap-2.5 text-rose-600 font-semibold">
                    <ShieldAlert className="h-4.5 w-4.5 flex-shrink-0 mt-0.5 text-rose-500" />
                    <div className="text-[10px] leading-relaxed">
                      <span className="font-extrabold">DRIVER COMPLIANCE BLOCK:</span> Driver {currentDriver.name} is currently "{currentDriver.status}". Driver must be Available before dispatch.
                    </div>
                  </div>
                )}

                {currentDriver && new Date(currentDriver.licenseExpiry) < new Date() && (
                  <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl flex items-start gap-2.5 text-rose-600 font-semibold">
                    <ShieldAlert className="h-4.5 w-4.5 flex-shrink-0 mt-0.5 text-rose-500" />
                    <div className="text-[10px] leading-relaxed">
                      <span className="font-extrabold">DRIVER LICENSE EXPIRED:</span> Driver {currentDriver.name} CDL expired on {currentDriver.licenseExpiry}. Driving prohibited.
                    </div>
                  </div>
                )}

                {/* If all checks pass */}
                {currentVehicle && currentDriver && cargoWeight <= currentVehicle.capacity && currentVehicle.status === 'available' && currentDriver.status === 'available' && new Date(currentDriver.licenseExpiry) >= new Date() && (
                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-start gap-2.5 text-emerald-600 font-semibold">
                    <CheckCircle className="h-4.5 w-4.5 flex-shrink-0 mt-0.5 text-emerald-500" />
                    <div className="text-[10px] leading-relaxed">
                      <span className="font-extrabold">VALIDATION COMPLIANCE PASSED:</span> All active fleet policies and commercial license verifications have successfully cleared. Trip is ready for creation in Draft.
                    </div>
                  </div>
                )}
              </div>

              {/* Trip Summary Card */}
              <TripSummaryCard
                trip={{
                  tripName: watch('tripName'),
                  tripType: watch('tripType'),
                  priority: watch('priority'),
                  description: watch('description'),
                  route: {
                    source: watch('source'),
                    destination: watch('destination'),
                    plannedDistance: watch('plannedDistance'),
                    estimatedTime: watch('estimatedTime'),
                  },
                  vehicleId: watch('vehicleId'),
                  vehicleName: currentVehicle?.name,
                  vehicleRegistration: currentVehicle?.registration,
                  vehicleCapacity: currentVehicle?.capacity,
                  vehicleOdometer: currentVehicle?.odometer,
                  driverId: watch('driverId'),
                  driverName: currentDriver?.name,
                  driverPhone: currentDriver?.phone,
                  driverAvatarUrl: currentDriver?.avatarUrl,
                  driverLicenseExpiry: currentDriver?.licenseExpiry,
                  driverSafetyScore: currentDriver?.safetyScore,
                  cargo: {
                    type: watch('cargoType'),
                    weight: cargoWeight,
                    value: watch('cargoValue'),
                    specialInstructions: watch('specialInstructions'),
                  },
                  expectedRevenue: watch('expectedRevenue'),
                  estimatedFuelCost: watch('estimatedFuelCost'),
                  estimatedToll: watch('estimatedToll'),
                  estimatedExpenses: watch('estimatedExpenses'),
                }}
              />
            </div>
          )}
        </div>

        {/* Buttons footer */}
        <div className="flex justify-between items-center pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={step === 0 || isLoading}
            className="h-9 text-xs rounded-lg border-border/60 text-muted-foreground hover:text-foreground"
            leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}
          >
            Back
          </Button>

          {step < steps.length - 1 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="h-9 text-xs font-bold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg gap-1.5"
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Next Step
            </Button>
          ) : (
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={
                isLoading ||
                (currentVehicle && cargoWeight > currentVehicle.capacity) ||
                (currentVehicle && currentVehicle.status !== 'available') ||
                (currentDriver && currentDriver.status !== 'available') ||
                (currentDriver && new Date(currentDriver.licenseExpiry) < new Date())
              }
              className="h-9 text-xs font-extrabold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg"
            >
              Save Trip Manifest
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TripForm;
