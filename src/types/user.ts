import { type User as DbUser } from '@/db/schema/users';

// TODO:user type 수정 필요
export type User = Pick<DbUser, 'id' | 'email' | 'image' | 'phone' | 'name' | 'role'>;
export interface UpdateUserDto {
  name?: string;
  email?: string;
  phone: string;
  role: 'admin' | 'host' | 'participant';
}
