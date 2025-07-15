import { clientApi } from '@/libs/api';
import type { Popup } from '@/types/popup';

export async function getEventById(id: string): Promise<Popup | null> {
  try {
    const data = await clientApi<Popup>(`/api/events/${id}`, { method: 'GET' });
    return data ?? null;
  } catch {
    // TODO: 에러 처리 필요
    return null;
  }
}
