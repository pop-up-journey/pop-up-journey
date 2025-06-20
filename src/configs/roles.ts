export interface Role {
  key: string;
  label: string;
}

export const roles: Role[] = [
  { key: 'participant', label: '참가자' },
  { key: 'host', label: '주최자' },
];
