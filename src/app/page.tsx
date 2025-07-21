import { getMainPageData } from '@/features/main/api/getMainPageData';
import WrapperMain from '@/features/main/WrapperMain';
import { auth } from '@/libs/auth';

export default async function Page() {
  const session = await auth();
  const { ongoingEvents, upcomingEvents, likedEventIds } = await getMainPageData(session?.user?.id);
  console.log('ongoingEvents', ongoingEvents);
  console.log('upcomingEvents', upcomingEvents);
  console.log('likedEventIds', likedEventIds);
  return <WrapperMain ongoingEvents={ongoingEvents} upcomingEvents={upcomingEvents} likedEventIds={likedEventIds} />;
}
