import { clientApi } from '@/libs/api';
import debounce from 'lodash.debounce';

export const saveStoreDebounce = debounce(async (eventId: number, isNowSaved: boolean, userId: string | undefined) => {
  try {
    if (isNowSaved) {
      await clientApi(`/api/like/${eventId}`, {
        method: 'POST',
        body: JSON.stringify({ userId }),
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      await clientApi(`/api/like/${eventId}`, {
        method: 'DELETE',
        body: JSON.stringify({ userId }),
        headers: { 'Content-Type': 'application/json' },
      });
    }
    console.log('API 호출');
  } catch (error) {
    console.error(error);
  }
}, 400);
