import { z } from "zod";

export const createCustomerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  address1: z.string().min(1),
  address2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(4),
  notes: z.string().optional(),
  active: z.boolean().optional(),
});

export type CreateCustomer = z.infer<typeof createCustomerSchema>;
