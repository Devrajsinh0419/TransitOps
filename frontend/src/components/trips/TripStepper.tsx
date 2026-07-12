'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface TripStepperProps {
  steps: string[];
  currentStep: number;
}

export function TripStepper({ steps, currentStep }: TripStepperProps) {
  return (
    <div className="w-full py-4 select-none">
      <div className="flex items-center justify-between w-full max-w-5xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center relative z-10">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: isCompleted
                      ? 'var(--color-primary, #4f46e5)'
                      : isActive
                      ? 'rgba(79, 70, 229, 0.1)'
                      : 'var(--color-muted, #f4f4f5)',
                    borderColor: isCompleted || isActive ? 'var(--color-primary, #4f46e5)' : 'rgba(0, 0, 0, 0.08)',
                    color: isCompleted
                      ? '#ffffff'
                      : isActive
                      ? 'var(--color-primary, #4f46e5)'
                      : 'var(--color-muted-foreground, #71717a)',
                  }}
                  className={`flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-bold shadow-sm`}
                >
                  {isCompleted ? <Check className="h-3.5 w-3.5" /> : index + 1}
                </motion.div>
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider mt-1.5 absolute -bottom-5 whitespace-nowrap ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {step}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 relative bg-muted/60 overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: isCompleted ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 left-0 h-full bg-primary"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="h-4" /> {/* spacer for absolute labels */}
    </div>
  );
}

export default TripStepper;
