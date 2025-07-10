import { clientApi } from '@/libs/api';
import type { User } from '@/types/user';

export async function getHostByEventId(id: string): Promise<User | null> {
  try {
    const [host] = await clientApi<User[]>(`/api/users/${id}`, { method: 'GET' });
    return host ?? null;
  } catch {
    return null;
  }
}
