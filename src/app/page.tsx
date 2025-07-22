import { getMainPageData } from '@/features/main/api/getMainPageData';
import WrapperMain from '@/features/main/WrapperMain';
import { getUserSession } from '@/services/getUserSession';

export default async function Page() {
  const { userId } = await getUserSession();
  const { ongoingEvents, upcomingEvents, likedEventIds } = await getMainPageData(userId ?? '');

  return <WrapperMain ongoingEvents={ongoingEvents} upcomingEvents={upcomingEvents} likedEventIds={likedEventIds} />;
}
