import { clientApi } from '@/libs/api';

export const toggleSavedPopup = async (eventId: string, userId: string, save: boolean) => {
  try {
    clientApi(`/api/like/${eventId}`, {
      method: save ? 'POST' : 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
  } catch (error) {
    console.error(error);
  }
};
