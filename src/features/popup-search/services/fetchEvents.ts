import { clientApi } from '@/libs/api';
import type { EventData } from '@/types/event';

export interface EventsResponse {
  events: EventData[];
  totalCount: number;
}

/**
 * zone, page, pageSize 만 넘기면
 * 백엔드에서 받아온 { events, totalCount } 그대로 리턴
 */
// TODO:네이밍 getEvents로 변경
// api pages에도 쓰임 후에 따로 빼야될 듯?
export async function fetchEvents(params: {
  zone?: string | null;
  page?: number;
  pageSize?: number;
}): Promise<EventsResponse> {
  const { zone, page = 1, pageSize = 6 } = params;
  const queryString = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    ...(zone ? { zone } : {}),
  });
  return clientApi(`/api/events?${queryString.toString()}`, { method: 'GET' }) as Promise<EventsResponse>;
}
