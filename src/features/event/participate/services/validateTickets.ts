import { z } from 'zod';

export const ticketsSchema = z.string().refine(
  (val) => {
    const num = Number(val);
    return Number.isInteger(num) && num >= 1 && num <= 4;
  },
  {
    message: '티켓 수는 1~4 사이의 정수만 입력할 수 있습니다.',
  }
);

export function validateTickets(value: string) {
  const result = ticketsSchema.safeParse(value);
  if (!result.success) {
    return { isValid: false, errorMessage: result.error.errors[0].message };
  }
  return { isValid: true, errorMessage: null };
}
