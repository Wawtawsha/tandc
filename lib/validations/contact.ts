import { z } from 'zod';

// Zod validation schema for contact form
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Inferred type from schema
export type ContactFormData = z.infer<typeof contactSchema>;

// Action state type for useActionState
export type ActionState = {
  message: string;
  errors: Record<string, string[]>;
  success: boolean;
};
