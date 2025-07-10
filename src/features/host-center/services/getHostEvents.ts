import { clientApi } from '@/libs/api';
import { EventData } from '@/types/event';

export async function getHostEvents(hostId: string): Promise<EventData[]> {
  if (!hostId) return [];
  try {
    const res = await clientApi(`/api/host/${hostId}`, { method: 'GET' });
    return res ?? [];
  } catch (error) {
    console.error('Failed to get host events', error);
    return [];
  }
}
