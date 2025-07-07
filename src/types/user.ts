import { type User as DbUser } from '@/db/schema/users';

export type User = DbUser;

export interface UpdateUserDto {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: 'admin' | 'host' | 'participant';
}
