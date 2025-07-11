import { z } from 'zod';

// export const ticketsSchema = z.string().refine(
//   (val) => {
//     const num = Number(val);
//     return Number.isInteger(num) && num >= 1 && num <= 4;
//   },
//   {
//     message: '티켓 수는 1~4 사이의 정수만 입력할 수 있습니다.',
//   }
// );

// export function validateTickets(value: string) {
//   const result = ticketsSchema.safeParse(value);
//   console.log('result', result);
//   if (!result.success) {
//     return { isValid: false, errorMessage: result.error.errors[0].message };
//   }
//   return { isValid: true, errorMessage: null };
// }

export const ticketsSchema = z.number().int().min(1).max(4);

export function validateTickets(value: string | number) {
  const num = typeof value === 'string' ? Number(value) : value;
  const result = ticketsSchema.safeParse(num);
  if (!result.success) {
    return { isValid: false, errorMessage: result.error.errors[0].message };
  }
  return { isValid: true, errorMessage: null };
}
