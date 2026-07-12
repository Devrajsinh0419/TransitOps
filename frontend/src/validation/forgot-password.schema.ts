import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Invalid email address format' }),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
