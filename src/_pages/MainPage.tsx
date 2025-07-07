import CurrentPopupList from '@/features/main/components/CurrentPopupList';
import MainBanner from '@/features/main/components/MainBanner';
import UpcomingPopupList from '@/features/main/components/UpcomingPopupList';
import { getMainPageData } from '@/features/main/services/getMainPageData';
import { auth } from '@/libs/auth';

export default async function MainPage() {
  const session = await auth();
  const { currentEvents, upcomingEvents, likedEventIds } = await getMainPageData(session?.user?.id);

  return (
    <main className="w-100vw space-y-24 overflow-hidden">
      <MainBanner />
      <CurrentPopupList
        sectionTitle="지금! 서울 인기 팝업"
        events={currentEvents.events}
        likeEventIds={likedEventIds}
      />
      <UpcomingPopupList
        sectionTitle="오픈 예정 팝업"
        initialEvents={upcomingEvents.events}
        initialCount={upcomingEvents.totalCount}
      />
    </main>
  );
}
