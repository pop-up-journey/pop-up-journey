export const LABELS = {
  EMAIL: 'Email',
  PHONE: 'Phone',
  NAME: 'Name',
  TEXT: 'Text',
  NUMBER: 'Number',
} as const;

export type Label = (typeof LABELS)[keyof typeof LABELS];
