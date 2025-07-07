import { clientApi } from '@/libs/api';

export async function getUserInfo(userId: string) {
  if (!userId) return null;
  try {
    const res = await clientApi(`/api/users/${userId}`, { method: 'GET' });
    return res;
  } catch (error) {
    console.error('Failed to get user info', error);
    return null;
  }
}
