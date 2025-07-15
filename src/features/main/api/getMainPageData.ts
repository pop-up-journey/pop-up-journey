import { getEvents } from '@/features/main/api/getEvents';
import { getSavedStoreIds } from '@/hooks/getSavedStoreIds';

// 일단 스킵
export async function getMainPageData(userId?: string) {
  const [ongoingEvents, upcomingEvents, likedEventIds] = await Promise.all([
    getEvents({ status: 'ongoing' }),
    getEvents({ status: 'upcoming', page: 1, pageSize: 4 }),
    userId ? getSavedStoreIds(userId) : Promise.resolve([]),
  ]);
  return { ongoingEvents, upcomingEvents, likedEventIds };
}
