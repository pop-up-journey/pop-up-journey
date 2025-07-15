import { clientApi } from '@/libs/api';
import { Popup } from '@/types/popup';

export async function getHostPopup(hostId: string): Promise<Popup[]> {
  if (!hostId) return [];
  try {
    const res = await clientApi(`/api/host/${hostId}`, { method: 'GET' });
    return res ?? [];
  } catch (error) {
    console.error('Failed to get host events', error);
    return [];
  }
}
