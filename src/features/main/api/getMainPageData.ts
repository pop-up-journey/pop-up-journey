import { PAGE_SIZE_FOUR } from '@/configs/pageSize';
import { getPopups } from '@/services/getPopups';
import { getSavedPopupIds } from '@/services/getSavedPopupIds';

// 일단 스킵
export async function getMainPageData(userId?: string) {
  try {
    const [ongoingEvents, upcomingEvents, likedEventIds] = await Promise.all([
      getPopups({ status: 'ongoing' }),
      getPopups({ status: 'upcoming', page: 1, pageSize: PAGE_SIZE_FOUR }),
      userId ? getSavedPopupIds(userId) : Promise.resolve([]),
    ]);
    return { ongoingEvents, upcomingEvents, likedEventIds };
  } catch (error) {
    console.error('Failed to get main page data', error);
    return {
      ongoingEvents: { events: [], totalCount: 0 },
      upcomingEvents: { events: [], totalCount: 0 },
      likedEventIds: [],
    };
  }
}
