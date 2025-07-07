import { getEvents } from '@/features/main/services/getEvents';
import { getSavedStoreIds } from '@/features/main/services/getSavedStoreIds';

export async function getMainPageData(userId?: string) {
  const [currentEvents, upcomingEvents, likedEventIds] = await Promise.all([
    getEvents({ status: 'ongoing' }),
    getEvents({ status: 'upcoming', page: 1, pageSize: 4 }),
    userId ? getSavedStoreIds(userId) : Promise.resolve([]),
  ]);
  return { currentEvents, upcomingEvents, likedEventIds };
}
