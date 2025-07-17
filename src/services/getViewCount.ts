import { clientApi } from '@/libs/api';

export async function getViewCount(eventId: string): Promise<number> {
  try {
    const response = await clientApi(`/api/events/${eventId}/views`, {
      method: 'GET',
    });

    return response.viewCount || 0;
  } catch (error) {
    console.error('Error getting view count:', error);
    return 0;
  }
}
