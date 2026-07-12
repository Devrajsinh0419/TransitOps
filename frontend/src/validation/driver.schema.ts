import { z } from 'zod';

export const driverSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Full Name is required' })
    .max(100, { message: 'Full Name must be under 100 characters' }),
  employeeId: z
    .string()
    .min(1, { message: 'Employee ID is required' })
    .regex(/^[A-Z0-9-]+$/i, { message: 'Employee ID must contain only alphanumeric characters or hyphens' }),
  gender: z.enum(['male', 'female', 'other'], {
    message: 'Gender is required',
  }),
  dob: z
    .string()
    .min(1, { message: 'Date of Birth is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format must be YYYY-MM-DD' })
    .refine((val) => {
      const birthDate = new Date(val);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    }, { message: 'Driver must be at least 18 years old' }),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid international phone number format (e.g. +1234567890)' }),
  email: z
    .string()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Invalid email address' }),
  address: z.string().min(1, { message: 'Physical Address is required' }),
  emergencyContact: z.string().min(1, { message: 'Emergency contact name is required' }),
  emergencyPhone: z
    .string()
    .min(1, { message: 'Emergency phone number is required' })
    .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid international phone number format' }),

  // License Information
  licenseNumber: z.string().min(1, { message: 'License Number is required' }),
  licenseCategory: z.enum(['Class A CDL', 'Class B CDL', 'Class C CDL', 'Class D', 'Class M'], {
    message: 'License category is required',
  }),
  licenseIssueDate: z
    .string()
    .min(1, { message: 'License Issue Date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format must be YYYY-MM-DD' }),
  licenseExpiry: z
    .string()
    .min(1, { message: 'License Expiration Date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format must be YYYY-MM-DD' })
    .refine((val) => {
      const expiry = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return expiry > today;
    }, { message: 'License expiry date must be in the future' }),
  issuingAuthority: z.string().min(1, { message: 'Issuing authority (e.g. DMV) is required' }),

  // Employment
  joiningDate: z
    .string()
    .min(1, { message: 'Joining Date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format must be YYYY-MM-DD' }),
  department: z.string().min(1, { message: 'Department is required' }),
  experienceYears: z
    .preprocess(
      (val) => (val === '' ? undefined : Number(val)),
      z
        .number({ message: 'Experience must be a number' })
        .nonnegative({ message: 'Experience years cannot be negative' })
    ),
  status: z.enum(['available', 'on_trip', 'off_duty', 'suspended', 'leave', 'inactive']).default('available'),
  salaryPlaceholder: z
    .preprocess(
      (val) => (val === '' ? undefined : Number(val)),
      z
        .number({ message: 'Salary must be a number' })
        .positive({ message: 'Salary must be greater than 0' })
        .optional()
    ),

  // Health
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
    message: 'Blood group is required',
  }),
  healthStatus: z.enum(['fit', 'monitoring', 'unfit'], {
    message: 'Health status is required',
  }),

  // Performance
  safetyScore: z
    .preprocess(
      (val) => (val === '' ? 100 : Number(val)),
      z
        .number({ message: 'Safety score must be a number' })
        .min(0, { message: 'Score cannot be under 0' })
        .max(100, { message: 'Score cannot exceed 100' })
    ),
  notes: z.string().optional(),
});

export type DriverSchemaInput = z.infer<typeof driverSchema>;
