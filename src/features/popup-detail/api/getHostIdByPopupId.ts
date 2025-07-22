import { clientApi } from '@/libs/api';
import type { User } from '@/types/user';

export async function getHostIdByPopupId(id: string): Promise<User | null> {
  try {
    const host = await clientApi<User[]>(`/api/users/${id}`, { method: 'GET' });
    return host ?? null;
  } catch (error) {
    console.error('getHostIdByPopupId error', error);
    return null;
  }
}
