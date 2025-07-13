import { z } from 'zod';

export const ticketsSchema = z.number().int().min(1).max(4);

export function validateTickets(value: string | number) {
  const num = typeof value === 'string' ? Number(value) : value;
  const result = ticketsSchema.safeParse(num);
  if (!result.success) {
    return { isValid: false, errorMessage: result.error.errors[0].message };
  }
  return { isValid: true, errorMessage: null };
}
