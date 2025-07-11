import { clientApi } from '@/libs/api';

export async function getEvents({ status, page, pageSize }: { status: string; page?: number; pageSize?: number }) {
  try {
    let url = `/api/events?status=${status}`;
    if (page && pageSize) url += `&page=${page}&pageSize=${pageSize}`;
    return await clientApi(url, { method: 'GET' });
  } catch (error) {
    console.error('Failed to get events', error);
  }
}
