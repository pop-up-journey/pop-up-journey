import { type User as DbUser } from '@/db/schema/users';

export type User = Pick<DbUser, 'id' | 'email' | 'image' | 'phone'>;
export interface UpdateUserDto {
  name?: string;
  email?: string;
  phone: string;
  role: 'admin' | 'host' | 'participant';
}
