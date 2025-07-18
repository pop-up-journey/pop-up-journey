import { clientApi } from '@/libs/api';

export async function deleteParticipation(eventId: string) {
  try {
    return await clientApi(`/api/events/${eventId}/participate`, { method: 'DELETE' });
  } catch (error) {
    console.error('Failed to delete participation', error);
    return { error };
  }
}
