import { clientApi } from '@/libs/api';
import type { EventData } from '@/types/event';

export async function getEventById(id: string): Promise<EventData | null> {
  try {
    const data = await clientApi<EventData>(`/api/events/${id}`, { method: 'GET' });
    return data ?? null;
  } catch {
    // TODO: 에러 처리 필요
    return null;
  }
}
