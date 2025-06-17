export interface UpdateUserDto {
  name?: string;
  email?: string;
  phone: string;
  role: 'admin' | 'host' | 'participant';
}
