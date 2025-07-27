import { clientApi } from '@/libs/api';

export async function getSavedPopupIds(userId: string) {
  try {
    return await clientApi(`/api/users/${userId}/event-saves`, {
      method: 'GET',
    });
  } catch (error) {
    console.error('Failed to get saved popup', error);
  }
}
