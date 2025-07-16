import { clientApi } from '@/libs/api';

// TODO: 네이밍 좀 좋은걸로
export async function getSavedPopupIds(userId: string) {
  try {
    return await clientApi(`/api/users/${userId}/event-saves`, {
      method: 'GET',
    });
  } catch (error) {
    console.error('Failed to get saved popup', error);
  }
}
