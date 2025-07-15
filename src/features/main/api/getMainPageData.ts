import { getEvents } from '@/features/main/api/getEvents';
import { getSavedPopupIds } from '@/hooks/getSavedPopupIds';

// 일단 스킵
export async function getMainPageData(userId?: string) {
  try {
    const [ongoingEvents, upcomingEvents, likedEventIds] = await Promise.all([
      getEvents({ status: 'ongoing' }),
      getEvents({ status: 'upcoming', page: 1, pageSize: 4 }),
      userId ? getSavedPopupIds(userId) : Promise.resolve([]),
    ]);
    return { ongoingEvents, upcomingEvents, likedEventIds };
  } catch (error) {
    console.error('Failed to get main page data', error);
    return { ongoingEvents: [], upcomingEvents: { events: [], totalCount: 0 }, likedEventIds: [] };
  }
}
