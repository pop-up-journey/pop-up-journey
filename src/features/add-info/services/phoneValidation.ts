import { z } from 'zod';

export const phoneSchema = z
  .string()
  .transform((val) => val.replace(/[^0-9]/g, ''))
  .transform((val) => (val.startsWith('010') ? val : '010' + val.replace(/^010/, '')))
  .transform((val) => {
    if (val.length > 3 && val.length <= 7) {
      return val.slice(0, 3) + '-' + val.slice(3);
    } else if (val.length > 7) {
      return val.slice(0, 3) + '-' + val.slice(3, 7) + '-' + val.slice(7, 11);
    }
    return val;
  })
  .refine((val) => /^010-\d{4}-\d{4}$/.test(val), {
    message: '올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)',
  });

export const validatePhone = (value: string) => {
  const result = phoneSchema.safeParse(value);

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

// 전화번호 검증 전처리 (rawPhoneSchema)
// export const rawPhoneSchema = z
//   .string()
//   .transform((val) => val.replace(/[^0-9]/g, ''))
//   .refine((d) => d.startsWith('010'), {
//     message: '010으로 시작해야 합니다.',
//   })
//   .refine((d) => d.length === 11, {
//     message: '숫자 11자리여야 합니다. (예: 01012345678)',
//   });

// // 포맷 적용 (phoneSchema)
// export const formattedPhoneSchema = rawPhoneSchema.transform((d) => `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`);

// export const validatePhone = (value: string) => {
//   const result = formattedPhoneSchema.safeParse(value);

//   if (!result.success) {
//     return {
//       isValid: false,
//       errorMessage: result.error.issues[0].message,
//     };
//   }
// };
