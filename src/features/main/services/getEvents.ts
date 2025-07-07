import { clientApi } from '@/libs/api';

export async function getEvents({ status }: { status: string }) {
  try {
    return await clientApi(`/api/events?status=${status}`, {
      method: 'GET',
    });
  } catch (error) {
    console.error('Failed to get events', error);
  }
}
