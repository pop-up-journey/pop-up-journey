import { clientApi } from '@/libs/api';
import type { Popup } from '@/types/popup';

export async function getPopupById(id: string): Promise<Popup | null> {
  try {
    const data = await clientApi<Popup>(`/api/events/${id}`, { method: 'GET' });
    return data ?? null;
  } catch (error) {
    console.error('getPopupById error', error);
    return null;
  }
}
