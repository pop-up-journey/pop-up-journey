export const LABELS = {
  EMAIL: '이메일',
  PHONE: '전화번호',
  NAME: '이름',
  TEXT: '텍스트',
  NUMBER: '숫자',
  TITLE: '제목',
  PEOPLE: '인원',
  LOCATION: '위치',
  TICKETS: '티켓수',
} as const;

export type Label = (typeof LABELS)[keyof typeof LABELS];
