import { z } from 'zod';

export const nameSchema = z
  .string()
  .min(2, { message: '2자 이상이어야 합니다.' })
  .max(10, { message: '10자 이하여야 합니다.' })
  .refine((val) => !/\s/.test(val), { message: '공백이 들어갈 수 없습니다.' });

export const validateName = (value: string) => {
  console.log(value);
  const result = nameSchema.safeParse(value);

  if (!result.success) {
    return {
      isValid: false,
      errorMessage: result.error.issues[0].message,
    };
  }

  return {
    isValid: true,
    errorMessage: null,
  };
};
