import { clientApi } from '@/libs/api';
import type { UpdateUserDTO } from '../types/updateUserDTO';

export const updateUserInfo = async ({ name, email, phone, role }: UpdateUserDTO, userId: string) => {
  const url = `/api/users/${userId}`;

  try {
    const res = await clientApi(url, {
      method: 'POST',
      body: {
        name,
        email,
        phone,
        role,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      console.log('User info updated successfully');
    }
  } catch (error) {
    console.error('Failed to update user info', error);
  }
};
