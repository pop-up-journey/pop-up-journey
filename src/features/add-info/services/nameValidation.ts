import { z } from 'zod';

export const nameSchema = z
  .string()
  .min(2, { message: '2자 이상이어야 합니다.' })
  .max(10, { message: '10자 이하여야 합니다.' })
  .regex(/^\S+$/, { message: '공백을 포함할 수 없습니다.' });

export const validateName = (value: string) => {
  const result = nameSchema.safeParse(value);

  console.log(result);

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
